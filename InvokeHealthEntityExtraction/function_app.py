import azure.functions as func
import logging

import json

import logging
import os
import pickle
import sys
import time
import requests

from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient, HealthcareEntityRelation


import re
from collections import defaultdict

# Global configuration
max_sentences = 15
ta_credentials = ""
ta_endPoint = ""

ta_url = os.environ["text_analytics_container_url"]
logging.info(f'text_analytics_url:{ta_url}')

cognitive_services_enpoint = os.environ["cognitive_services_enpoint"]
logging.info(f'cognitive_services_enpoint:{cognitive_services_enpoint}')

cognitive_services_key = os.environ["cognitive_services_key"]
logging.info(f'cognitive_services_key:{cognitive_services_key}')

azure_storage_connection_string = ""

text_analytics_client = TextAnalyticsClient(endpoint=cognitive_services_enpoint, credential=AzureKeyCredential(cognitive_services_key))

#use only if you are saving the output to blob storage
#azure_storage_connection_string = os.environ["AZURE_STORAGE_CONNECTION_STRING"]
#logging.info(f'AZURE_STORAGE_CONNECTION_STRING:{azure_storage_connection_string}')
 

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

@app.route(route="InvokeHealthEntityExtraction")
def InvokeHealthEntityExtraction(req: func.HttpRequest,context: func.Context) -> func.HttpResponse:
    logging.info("Python InvokeHealthEntityExtraction function processed a request.")

    try:
        body = json.dumps(req.get_json())
        logging.info("Body: " + body)
    except ValueError:
        return func.HttpResponse(
             "Invalid body",
             status_code=400
        )
    
    if body:
        result = compose_response(body, context)
        return func.HttpResponse(body=result, mimetype="application/json")
    else:
        return func.HttpResponse(
             "Invalid body",
             status_code=400
        )



def process_AI_retrievals(noteText):

    try:
        #documents = [noteText] 
        documents  = noteText['documents'] 
        response = text_analytics_client.detect_language(documents)
        result = [doc for doc in response if not doc.is_error]
        language = result[0].primary_language.iso6391_name   

        PII = call_cognitive_services(documents,language,"PII")
        Entities = call_cognitive_services(documents,language,"Entities")
        keyPhrases = call_cognitive_services(documents,language,"KeyPhrases")
        Language = {"languageCode" : language}
        result = {"PII": PII, "Entities": Entities, "KeyPhrases": keyPhrases, "Language": Language}
        return result

    
    except Exception as e:
        message = f"process_AI_retrievals e: {str(e)}"
        logging.error(str(message))
        return (
            {            
            "errors": [ { message}   ]
            })

def call_cognitive_services(noteText,language,option):  

    try:
        documents = noteText
        

        if option == "PII":
            response = text_analytics_client.recognize_pii_entities(documents, language=language)
            result = [doc for doc in response if not doc.is_error]
            masked_text = result[0].redacted_text
            return  {"maskedtext": masked_text}   
        elif option == "Entities":
            response = text_analytics_client.recognize_entities(documents, language=language)
            result = [doc for doc in response if not doc.is_error]
            if not result:
                return {"entities": []}  
            ########
            # Assuming 'response' is the result from the recognize_entities method            
            person  = []
            location = []
            organization = []
            for doc in response:
                if not doc.is_error:
                    for entity in doc.entities:
                        if entity.category in ['Location', 'Person', 'Organization']:
                            if entity.category == 'Location':
                                location.append({
                                    'text': entity.text                                    
                                })
                            elif entity.category == 'Person':
                                person.append({
                                    'text': entity.text
                                })
                            elif entity.category == 'Organization':
                                organization.append({
                                    'text': entity.text
                                })
            #######  
            return {"person": person, "location": location, "organization": organization}   
        elif option == "KeyPhrases":
            response = text_analytics_client.extract_key_phrases(documents, language=language)
            result = [doc for doc in response if not doc.is_error]
            key_phrases = result[0].key_phrases
            return {"keyphrases": key_phrases}
        elif option == "Sentiment":
            response = text_analytics_client.analyze_sentiment(documents, language=language)
            result = [doc for doc in response if not doc.is_error]
            sentiment = result[0].sentiment
            return {"sentiment": sentiment}
    
    except Exception as e:
        message = f"call_cognitive_services e: {str(e)}"
        logging.error(str(message))
        return (
            {            
            "errors": [ { message}   ]
            })


def compose_response(json_data, context):
    values = json.loads(json_data)["values"]
    
    try: 
        # Load UMLS dictionary
        logging.info("Function directory is " + context.function_directory)
        if os.path.isfile(os.path.join(context.function_directory, "umls_concept_dict.pickle")):
            logging.info("The umls_concept_dict.pickle file was found.")
        else:
            logging.info("The umls_concept_dict.pickle file was not found.")
        logging.info("about to load UMLS dictionary")
        with open(os.path.join(context.function_directory, "umls_concept_dict.pickle"), "rb") as handle:
            umls_concept_dict = pickle.load(handle)
        logging.info("UMLS dictionary loaded")

        # Prepare the output before the loop
        results = {}
        results["values"] = []
    except Exception as e:
        logging.info(str(e))
        return (
            {
            "errors": [ { "message": "Failure during compose_response e: " + str(e)}   ]
            })      
    
    for value in values:
            output_record = transform_value(value, umls_concept_dict,ta_url= os.environ["text_analytics_container_url"] )
            if output_record != None:
                results["values"].append(output_record)
    return json.dumps(results, ensure_ascii=False)
    
  

##split note-text in case it is longer than allowed
def chunkstring(string, length):
    return (string[0+i:length+i] for i in range(0, len(string), length))

## Perform an operation on a record
def transform_value(value, umls_concept_dict,ta_url):
    try:
        recordId = value["recordId"]
    except AssertionError  as error:
        return (
            {
            "noteId": 0,
            "errors": [ { "message": "You must provide a recordId in your input. " + error.args[0] }   ]       
            })

    # Validate the inputs
    try:         
        assert ('data' in value), "'data' field is required."
        data = value['data']        
        assert ('noteText' in data), "'noteText' field is required in 'data' object."       
    except AssertionError  as error:
        return (
            {
            "noteId": recordId,
            "errors": [ { "message": "Error:" + error.args[0] }   ]       
            })

    # Call TA Health API
    try:       

        ai_documents = {
            "documents": []
        }

        documents = {
            "documents": []
        }
        id_counter = 1

        if len(data["noteText"]) <= 5120:
            documents["documents"].append({
                      "language": "en",
                      "id": str(id_counter),
                      "text": data["noteText"]
                    })
            ai_documents["documents"].append(data["noteText"])
            id_counter += 1
        else:
           splitnoteText = chunkstring(data["noteText"],5120)
           for note in splitnoteText:               
             documents["documents"].append({
                        "language": "en",
                        "id": str(id_counter),
                        "text": note
                        })
             ai_documents["documents"].append(note)
             id_counter += 1
        
        logging.info("Documents: " + json.dumps(documents, indent = 4))
        ai_skills= process_AI_retrievals(ai_documents)

        if not ta_url.endswith("/"):
            ta_url += "/"

        url_to_call = ta_url + "text/analytics/v3.1/entities/health"  
        
        docs = requests.post(url = url_to_call, json = documents).json()  
        HTML_CONTENT=  get_final_json_content(docs,recordId)
        #save_json_to_db(HTML_CONTENT,recordId)       

    
    except Exception as e:
        message = f"transform_value e: {str(e)}"
        logging.error(str(message))
        return (
            {
            "recordId": recordId,
            "errors": [ { message}   ]
            })

    # Process output into format to be accepted by a custom skill
    try:

        # Initialize AI Entities
        persons = []
        organizations = []
        locations = []        
        
        maskedText = ""
        languageCode = ""
        keyphrases = []
        

        if not ai_skills["Entities"]["person"]:
            ia_persons = []
        else:
            ia_persons= ai_skills["Entities"]["person"]
        if not ai_skills["Entities"]["organization"]:
            ia_organizations  = []
        else:
            ia_organizations= ai_skills["Entities"]["organization"]

        if not ai_skills["Entities"]["location"]:
            ia_locations = []
        else:
            ia_locations= ai_skills["Entities"]["location"]
        
        if ai_skills["KeyPhrases"]:
            keyphrases = ai_skills["KeyPhrases"]
       
        languageCode = ai_skills["Language"]["languageCode"]
        maskedText = ai_skills["PII"]["maskedtext"]
        
        #converting ai_persons to a list
        for person in ia_persons:
            persons.append(person["text"])  

        #converting ia_organizations to a list  
        for organization in ia_organizations:
            organizations.append(organization["text"])

        #converting ia_locations to a list  
        for location in ia_locations:
            locations.append(location["text"])


        # Initialize health entities       
      
        BODY_STRUCTURE = []
        CONDITION_QUALIFIER = []
        DIAGNOSIS = []
        DIRECTION = []
        EXAMINATION_NAME = []
        EXAMINATION_RELATION = []
        FAMILY_RELATION = []
        GENDER = []
        GENE = []
        MEDICATION_CLASS = []
        MEDICATION_NAME = []
        ROUTE_OR_MODE = []
        SYMPTOM_OR_SIGN = []
        TREATMENT_NAME = []
        VARIANT = []
        DOSAGE = []
        HEALTHCARE_PROFESSION = []
        AGE = []   
        CARE_ENVIROMENT = []        

        
        logging.info("Initialized health entities")        
       

        #if "documents" not in json_response:
        #    logging.warn("No documents: " + json_object)

        # Put the output of the Text Analytics Entity Extraction in the interface for a custom skill output
       # for doc in json_response["documents"]:
       #'ConditionQualifier'
        for doc in docs["documents"]:            
            for ent in doc["entities"]:
                category = ent['category']
                if "links" in ent:
                    for link in ent["links"]:
                        if link["dataSource"] == "UMLS":
                            if link["id"] in umls_concept_dict:                               
                                if category == 'BodyStructure':
                                    BODY_STRUCTURE.append(umls_concept_dict[link['id']])
                                elif category == 'ConditionQualifier':
                                    CONDITION_QUALIFIER.append(umls_concept_dict[link['id']])
                                elif category== 'Diagnosis':
                                    DIAGNOSIS.append(umls_concept_dict[link['id']])
                                elif category == 'Direction':
                                    DIRECTION.append(umls_concept_dict[link['id']])
                                elif category == 'ExaminationName':
                                    EXAMINATION_NAME.append(umls_concept_dict[link['id']])
                                elif category == 'ExaminationRelataion':
                                    EXAMINATION_RELATION.append(umls_concept_dict[link['id']])
                                elif category == 'FamilyRelation':
                                    FAMILY_RELATION.append(umls_concept_dict[link['id']])
                                elif category == 'Gender':
                                    GENDER.append(umls_concept_dict[link['id']])
                                elif category == 'Gene':
                                    GENE.append(umls_concept_dict[link['id']])
                                elif category == 'MedicationClass':
                                    MEDICATION_CLASS.append(umls_concept_dict[link['id']])
                                elif category == 'MedicationName':
                                    MEDICATION_NAME.append(umls_concept_dict[link['id']])
                                elif category == 'MedicationRoute':
                                    ROUTE_OR_MODE.append(umls_concept_dict[link['id']])
                                elif category == 'SymptomOrSign':
                                    SYMPTOM_OR_SIGN.append(umls_concept_dict[link['id']])
                                elif category == 'TreatmentName':
                                    TREATMENT_NAME.append(umls_concept_dict[link['id']])
                                elif category == 'Variant':
                                    VARIANT.append(umls_concept_dict[link['id']])                                                                
                                break  # Once we've found the UMLS link, we don't need to go through the rest.
                                # TODO: remove this break, as per Liam
                            else:
                                logging.info("Not found in umls_concept_dict: " + link['id'])

                else:
                    if category == 'Dosage':
                       DOSAGE.append(ent["text"] )
                    elif category == 'HealthcareProfession':
                           HEALTHCARE_PROFESSION.append(ent["text"] )
                    elif category == 'Direction':
                           DIRECTION.append(ent["text"] )
                    elif category == 'Age':
                           AGE.append(ent["text"] )   
                    elif category == 'CareEnvironment':
                           CARE_ENVIROMENT.append(ent["text"] )      
                    elif category == 'ConditionQualifier':
                           CONDITION_QUALIFIER.append(ent["text"] )                                                       
                    else:
                       logging.info("No links for " + ent["text"])
       
        # Unique terms and back to list
        BODY_STRUCTURE = list(set(BODY_STRUCTURE))
        CONDITION_QUALIFIER = list(set(CONDITION_QUALIFIER))
        DIAGNOSIS = list(set(DIAGNOSIS))
        DIRECTION = list(set(DIRECTION))
        EXAMINATION_NAME = list(set(EXAMINATION_NAME))
        EXAMINATION_RELATION = list(set(EXAMINATION_RELATION))
        FAMILY_RELATION = list(set(FAMILY_RELATION))
        GENDER = list(set(GENDER))
        GENE = list(set(GENE))
        MEDICATION_CLASS = list(set(MEDICATION_CLASS))
        MEDICATION_NAME = list(set(MEDICATION_NAME))
        ROUTE_OR_MODE = list(set(ROUTE_OR_MODE))
        SYMPTOM_OR_SIGN = list(set(SYMPTOM_OR_SIGN))
        TREATMENT_NAME = list(set(TREATMENT_NAME))
        VARIANT = list(set(VARIANT))

        entities = {"health_entities": []}
        entities["health_entities"].append({"treatmentName":TREATMENT_NAME, "examinationName": EXAMINATION_NAME, 
                                   "bodyStructure": BODY_STRUCTURE, "diagnosis": DIAGNOSIS, "conditionQualifier": CONDITION_QUALIFIER, "direction": DIRECTION,
                                   "examinationRelation": EXAMINATION_RELATION, "familyRelation": FAMILY_RELATION, "gender": GENDER, "gene": GENE,
                                   "medicationClass": MEDICATION_CLASS, "medicationName": MEDICATION_NAME, "routeOrMode": ROUTE_OR_MODE, "symptomOrSign": SYMPTOM_OR_SIGN,
                                   "variant": VARIANT, "TextAnalyticsForDisplay":HTML_CONTENT})



        json_str = json.dumps(entities, indent = 4) 
        logging.info("Entities output: " + json_str)
        
        return ({
            "recordId": recordId,
            "data": {                    
                "treatmentName": TREATMENT_NAME, 
                "examinationName": EXAMINATION_NAME,
                "bodyStructure": BODY_STRUCTURE, 
                "diagnosis": DIAGNOSIS, 
                "conditionQualifier": CONDITION_QUALIFIER, 
                "direction": DIRECTION,
                "examinationRelation": EXAMINATION_RELATION, 
                "familyRelation": FAMILY_RELATION, 
                "gender": GENDER, 
                "gene": GENE,
                "medicationClass": MEDICATION_CLASS, 
                "medicationName": MEDICATION_NAME, 
                "routeOrMode": ROUTE_OR_MODE, 
                "symptomOrSign": SYMPTOM_OR_SIGN,
                "variant": VARIANT,
                "TextAnalyticsForDisplay":HTML_CONTENT,
                "maskedText": maskedText,
                "persons": persons,
                "organizations": organizations,
                "locations": locations,
                "keyphrases": keyphrases,
                "languageCode": languageCode
                 }
            })

    except:
        exc_tuple = sys.exc_info()
        logging.error(str(exc_tuple))
        return (
            {
            "recordId": recordId,
            "errors": [ { "message": "Failure while processing output for record " + recordId + ".  e: " + str(exc_tuple) }  ]
            })

   
    
def save_json_content(json_content,recordId):
    
        import uuid
        # Instantiate a new BlobServiceClient using a connection string _ set chunk size to 1MB
        from azure.storage.blob import BlobServiceClient, BlobBlock
        blob_service_client = BlobServiceClient.from_connection_string(azure_storage_connection_string)

        # Instantiate a new ContainerClient
        container_client = blob_service_client.get_container_client("note_analytics")
        # Generate 4MB of data
        data = str(json_content)

        try:
            
            file_name = recordId + "_text_analytics.json"
            # Instantiate a new source blob client
            source_blob_client = container_client.get_blob_client(file_name)
            # Upload content to block blob
            source_blob_client.upload_blob(data, blob_type="BlockBlob",overwrite=True)
       
        except Exception as err:       
            logging.error(str(err))
            return (
                {
                "recordId": recordId,
                "errors": [ { "message": "Failure while saving text analytics output for record " + recordId + ".  e: " + {err} }  ]
                })
        
def get_final_json_content(json_content,recordId):
    relations = []
    entities = []
    
    documents = json_content['documents']
    for doc in documents:
        for e in doc['entities']:          
            entities.append(e) 
        for r in doc['relations']:                   
            relations.append(r)
        
    parsed_content = {
            "id": recordId,
            "entities": entities,
            "relations": relations            
        }
    
    final_content = json.dumps(parsed_content)
    return final_content
       
