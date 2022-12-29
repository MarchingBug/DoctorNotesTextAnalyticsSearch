
from __future__ import annotations
import json
import jsons
import logging
import os
import pickle
import sys

import azure.functions as func
import requests

from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient, HealthcareEntityRelation


import re
from collections import defaultdict
import pyodbc

# Global configuration
max_sentences = 15
ta_credentials = ""
ta_endPoint = ""

# ta_credentials = os.environ["text_analytics_key"]
# logging.info(f'text_analytics_key:{ta_credentials}')
# ta_endPoint =  os.environ["text_analytics_endpoint"]
# logging.info(f'text_analytics_endpoint:{ta_endPoint}')

ta_url = os.environ["text_analytics_container_url"]
logging.info(f'text_analytics_key:{ta_url}')

azure_storage_connection_string = os.environ["AZURE_STORAGE_CONNECTION_STRING"]
logging.info(f'AZURE_STORAGE_CONNECTION_STRING:{azure_storage_connection_string}')
 
server = os.environ["sql_server_name"]
logging.info(f'sql_server_name:{server}')
 
database = os.environ["sql_server_db_name"]
logging.info(f'sql_server_db_name:{database}')

username = os.environ["sql_user_name"]
logging.info(f'sql_user_name:{username}')  

password = os.environ["sql_user_password"]
logging.info(f'sql_user_name:{password}')  


"""
This function accepts json_formatted data with separate fields for a research paper's title, abstract, and body.  
It reformats the data into the format that the Text Analytics for Health container needs, by taking chunks of text
first from the title, then abstract, and then the body until we have reached a maximum of <max_sentences> chunks.
Then the Text Analytics for Health is called with this text, and its output is reformatted into lists of entities.
The inputs and outputs of this function adhere to the Cognitive Search custom skill interface defined at 
https://docs.microsoft.com/azure/search/cognitive_search_custom_skill_interface.  
"""
def main(req: func.HttpRequest, context: func.Context) -> func.HttpResponse:
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


def compose_response(json_data, context):
    values = json.loads(json_data)["values"]
    
    # Load UMLS dictionary
    logging.info("Function directory is " + context.function_directory)
    if os.path.isfile(os.path.join(context.function_directory, "umls_concept_dict.pickle")):
        logging.info("The umls_concept_dict.pickle file was found.")
    else:
        logging.warn("The umls_concept_dict.pickle file was not found.")
    with open(os.path.join(context.function_directory, "umls_concept_dict.pickle"), "rb") as handle:
        umls_concept_dict = pickle.load(handle)
    logging.info("UMLS dictionary loaded")

    # Prepare the output before the loop
    results = {}
    results["values"] = []
    
    for value in values:
        output_record = transform_value(value, umls_concept_dict)
        if output_record != None:
            results["values"].append(output_record)
    return json.dumps(results, ensure_ascii=False)

   
 
## Call Text Analytics for Health  
def call_text_analytics(documents):
  
   credential = AzureKeyCredential(ta_credentials)
   text_analytics_client = TextAnalyticsClient(endpoint=ta_endPoint, credential=credential)   
   values = json.loads(documents)["documents"]
   try:
      poller = text_analytics_client.begin_analyze_healthcare_entities(values)
      result = poller.result()

      docs = [doc for doc in result if not doc.is_error]        
    
  
   except:
        exc_tuple = sys.exc_info()
        logging.error(str(exc_tuple))
        return (
            {           
            "errors": [ { "message": "Failure during call_text_analytics e: " + str(exc_tuple)}   ]
            })  
        
   return docs

##split note-text in case it is longer than allowed
def chunkstring(string, length):
    return (string[0+i:length+i] for i in range(0, len(string), length))

## Perform an operation on a record
def transform_value(value, umls_concept_dict):
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
            id_counter += 1
        else:
           splitnoteText = chunkstring(data["noteText"],5120)
           for note in splitnoteText:               
             documents["documents"].append({
                        "language": "en",
                        "id": str(id_counter),
                        "text": note
                        })
             id_counter += 1
        
        logging.info("Documents: " + json.dumps(documents, indent = 4))
        docs = requests.post(url = ta_url, json = documents).json()  
        HTML_CONTENT=  save_json_to_db(docs,recordId)       

    except:
        exc_tuple = sys.exc_info()
        logging.error(str(exc_tuple))
        return (
            {
            "recordId": recordId,
            "errors": [ { "message": "Failure during health entity extraction for record " + recordId + ".  e: " + str(exc_tuple)}   ]
            })

    # Process output into format to be accepted by a custom skill
    try:
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
                "TextAnalyticsForDisplay":HTML_CONTENT
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
       
def save_json_to_db (json_content,recordId):
    
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
    
    try:    
          
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
        cnxn.setdecoding(pyodbc.SQL_CHAR, encoding='latin1')
        cnxn.setencoding('latin1')
        cursor = cnxn.cursor()
        
        sql = "{CALL UpdateTextAnalyticsJson (?,?)}"
        params = (int(recordId), final_content)
        cursor.execute(sql, params)     
        
        cursor.commit()
        cursor.close()
        cnxn.close()
        return final_content
    except:
        exc_tuple = sys.exc_info()
        logging.error(str(exc_tuple))    
        
           
    