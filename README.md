# Doctor Notes Text Analytics- Code Repository

![Doctor Notes - Text Analytics Search App](images/search-application.png)

## Overview

Source Code Repository for the Cognitive Search based [Doctor Notes with Text Analytics Search App](https://doctornotessearchpoc.azurewebsites.net/)

If you simply want to show this code in a running instance, feel free to use <https://doctornotessearchpoc.azurewebsites.net/>.  Otherwise, you can follow the [setup instructions](#setup-steps) below to recreate your own instance in your Azure subscription.  

## Purpose

Give doctors the ability to extract and find meaningful patient data from their notes, to either have a larger view for a patient, to find patterns or for research.  How can we use AI to better understand to achieve this goal?  In this code, we take a sample set of fake doctor notes and apply several machine learning techniques (name entity recognition of medical terms, finding semantically similar words, and knowledge graphs) medical professionals better find and make sense of the research they need.  

## Assets

This repository containes to following assets and code:

* InvokeHealthEntityExtraction: An Azure Function to call the Text Analytics for Health container which is invoked as a custom skill in Azure Cognitive Services Skill-Sets
* Azure SQL Database
* AzureCognitiveSearchService: Jupyter notebook that will create data source, index, skillsets and indexer used by Azure Cognitive Search
* Web Application
* Github actions configuration to deploy the web application

## What you will learn

If you are new or new-ish to Azure, at the end of this project you will have a better understanding of the following concepts:

* Azure Storage Accounts
* Azure Cognitive Services
* Azure SQL Server
* Azure Functions
* Azure App Services
* Advanced Azure Cognitive Search
* Azure Container Instances
* Jupiter Notebooks
* Github Actions

## Architecture

Data is pulled from an Azure SQL Database. The main indexer runs data in json format through a skillset which reshapes the data and extracts medical entities, and puts the enriched data in the search index, it also saves Azure Text for Analytics json to the database render marked-up text.

![Doctor Notes/Text Analytics Search Architecture](images/TextAnalyticsDemoDocumentation.jpg)

## Services used for this solution

Listed below are the services needed for this solution, if you don't have an azure subscription, you can create a free one. If you already have an subscription, please make sure that your administration has granted access to the services below:

* Azure Subscription
* [Azure SQL Serverless](https://learn.microsoft.com/en-us/azure/azure-sql/database/serverless-tier-overview?view=azuresql)
* [Cognitive Services](https://learn.microsoft.com/en-us/azure/cognitive-services/what-are-cognitive-services)
* [Azure Container Instances](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-overview)
* [Text Analytics for Health](https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/text-analytics-for-health/overview?tabs=ner)
* [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview)
* [Storage Account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview)
* [Azure Cognitive Search](https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search)
* [Azure App Services](https://learn.microsoft.com/en-us/azure/app-service/overview)

Programming Tools needed:

* VS Code to edit Azure Functions
* Visual Studio to edit web-app (this is only if you want to customize the application)

## Expected time to completion

This project should take about 4 hours to complete

## Setup Steps

> Before you begin, fork this repository to your own github account then download it to your local drive

1. [Azure account - login or create one](#task-1---azure-account)
2. [Create a resource group](#task-2---create-a-resource-group)
3. [Import database package](#task-3---import-database-package)
4. [Implement Text Analytics For Health](#task-4---implement-text-analytics-for-health)
5. [Deploy InvokeHealthEntityExtraction Azure function](#task-5---deploy-invokehealthentityextraction-azure-function)
6. [Create a Storage Account](#task-6---create-a-storage-account)
7. [Create Azure search service](#task-7---create-azure-search-service)
8. [Run Notebook to configure Indexes and Data for Azure Search](#task-8---run-notebooks-to-create-indexes-on-azure-search)
9. [Deploy Website](#task-9---deploy-web-application)

### Task 1 - Azure Account

First, you will need an Azure account.  If you don't already have one, you can start a free trial of Azure [here](https://azure.microsoft.com/free/).  

___

### Task 2 - Create a resource group

If you are new to Azure,a resource group is a container that holds related resources for an Azure solution. The resource group can include all the resources for the solution, or only those resources that you want to manage as a group, click [here](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal#create-resource-groups) to learn how to create a group

___

### Task 3 - Import database package
 Upload the file doctor-note-poc-bacpac located under the folder data-files to a storage account in your subscription.
  Import the database package to a serverless database, for more information on how to do this click [here](https://learn.microsoft.com/en-us/azure/azure-sql/database/database-import?view=azuresql&tabs=azure-powershell).
<details>
  <summary>   If you have never done this expand this section for detailed steps  </summary>

Click on create new resource and search for SQL Server (logical server) and select that option

![Create a SQL Server](images/sql-1.png)

Click the create button

![Create a SQL Database resourse](images/sql-2.png)

Select the resource group you previously created

Enter a name for the server and a location that matches the location of your resource group. Select use both SQL and Azure AD authentication, add yourself as Azure AD admin. Enter a not easy to guess user name and password for the server. Click Networking

![Create a SQL Database resourse](images/sql-3.png)

Under firewall rules select Allow Azure Services and resources to access this server. Click Review + create

![Create a SQL Database resourse](images/sql-4.png)

Verify all information is correct, click on "Create"

![Create a SQL Database resourse](images/sql-5.png)

Once your database is created, navigate to your new SQL Server and click on Import Database

![Create a SQL Database resourse](images/sql-6.png)

Once on the Import dabase select backup

![Create a SQL Database resourse](images/sql-7.png)

Select the storage account where you uploaded the database file and navigate to the file. Click Select

![Create a SQL Database resourse](images/sql-8.png)

Next click configure database

![Create a SQL Database resourse](images/sql-9.png)

Under computer tier, select serverless, click ok

![Create a SQL Database resourse](images/sql-10.png)

Enter a data base name, select SQL server authentication and enter the user name & password you defined for the SQL Server, click ok

![Create a SQL Database resourse](images/sql-11.png)

Navigate to your SQL server, and select import/export history to see the progress of your import, once completed, navigate to databases to look at your new imported database

![Create a SQL Database resourse](images/sql-12.png)

Once on your imported database, select Query editor and enter your user credentials. Loging will fail as you need to grant access to your IP address. Click on Allow IP server and then login

![Create a SQL Database resourse](images/sql-13.png)

Once on the query screen copy and paste this sql statement and click Run to verify data was imported

```sql
Select * from DoctorNotes
 
```

![Create a SQL Database resourse](images/sql-14.png)

</details>

___

### Task 4 - Implement Text Analytics For Health Container

Our implementation uses the [Text Analytics for Health](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-for-health?tabs=ner) container for medical entity extraction.  Once you have received access, you will need to set up the container as instructed in their README.

___

### Task 5 - Deploy InvokeHealthEntityExtraction Azure function

Then, you will need to update the InvokeHealthEntityExtraction Azure function with the location of your running container.  You will also need to download a file umls_concept_dict.pickle that is too big to host on GitHub, which will allow lookup of [UMLS](https://www.nlm.nih.gov/research/umls/index.html) entities.  

Specifically, in the InvokeHealthEntityExtraction\InvokeHealthEntityExtraction folder:

* Download the [umls_concept_dict.pickle file](https://cspocdatalake.blob.core.windows.net/doctor-notes-poc/umls_concept_dict.pickle?sv=2021-10-04&st=2022-12-30T16%3A13%3A51Z&se=2030-12-31T16%3A13%3A00Z&sr=b&sp=r&sig=wMGVvwqvKfdn01DxJ%2FlsdmGYSCxEiH6retRjzMaIbTo%3D) and save to this directory InvokeHealthEntityExtraction\InvokeHealthEntityExtraction (the same directory as __init__.py) so it will deploy with the Azure function.  

*After* this action is complete, you can deploy the InvokeHealthEntityExtraction Azure function.  One easy way to deploy an Azure function is using Visual Studio Code.  You can [install VS Code](https://code.visualstudio.com/Download) and then follow some of the instructions at [this link](https://docs.microsoft.com/azure/azure-functions/functions-develop-vs-code?tabs=csharp):

1. Install the [Azure Functions extension](https://docs.microsoft.com/azure/azure-functions/functions-develop-vs-code?tabs=csharp#install-the-azure-functions-extension) for Visual Studio Code

2. [Sign in](https://docs.microsoft.com/azure/azure-functions/functions-develop-vs-code?tabs=csharp#sign-in-to-azure) to Azure

3. [Publish the function](https://docs.microsoft.com/azure/azure-functions/functions-develop-vs-code?tabs=csharp#publish-to-azure) to Azure

After the function is deployed you need to update the function configuration parameters and get the value for the function Url follow these steps:

To update function's configuration parameters, in the Azure portal navigate to your Azure function app, under settings click "configuration", then under "Application settings" click "New application setting" (see image below)

![Azure function Configuration](images/azure-function-configuration.png)

> __Add the following parameters and their corresponding values:__

```text
    text_analytics_container_url: YOUR_CONTAINER_URL

    AZURE_STORAGE_CONNECTION_STRING: YOUR_STORAGE_ACCOUNT_CONNECTION_STRING

    text_analytics_container_url: YOUR_CONTAINER_URL

    text_analytics_container_url: YOUR_CONTAINER_URL

    AZURE_STORAGE_CONNECTION_STRING: YOUR_STORAGE_ACCOUNT_CONNECTION_STRING
    
    sql_server_name:  YOUR_SQL_SERVER_NAME

    sql_server_db_name

    sql_user_name

    sql_user_password

```

Next Click "Functions" in the left-hand sidebar.  Then click on each function name,  click "Get Function Url" at the top of the page.  Copy that value to a text editor for each function; you will need it later.  

### Task 6 - Create a Storage Account

Create a storage account and get the connection string, you will need this connection string for the next steps. If you have never done that, [here](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal) is the documentation to do it.

> __Once your storage account is created, navigate to the storage account and create a container named doctor-notes-search__

___

### Task 7 - Create Azure search service

Create a new Azure search service using the Azure portal at <https://portal.azure.com/#create/Microsoft.Search>.  Select your Azure subscription.  Use the previously created resource group. You will need a globally-unique URL as the name of your search service (try something like "doctonotes-search-" plus your name, organization, or numbers).  Finally, choose a nearby location to host your search service - please remember the location that you chose, as your Cognitive Services instance will need to be based in the same location.  Click "Review + create" and then (after validation) click "Create" to instantiate and deploy the service.

___

### Task 8 - Run Notebooks to create indexes on Azure Search

After deployment of Azure Search service is complete, click "Go to resource" to navigate to your new search service. We will need some information about your search service to fill in the "Azure Search variables" section in the SetupAzureCognitiveSearchService.ipynb notebook, which is in the AzureCognitiveSearchService directory.  Open the notebook for details on how to do this and copy those values into the first code cell, but don't run the notebook yet (you will need to update skillset.json first).  

Before running the notebook, you will also need to change the 4 TODOs in the skillset.json (which is also located in the AzureCognitiveSearchService folder).  Open skillset.json, search for "TODO", and replace each instance with the following:

1. __Invoke TA Health Extraction custom skill URI:__ this value should be "https://" plus the value from the "Get Function Url" for the InvokeHealthEntityExtraction function that you noted down earlier
2. __Cognitive Services key:__ create a new Cognitive Services key in the [Azure portal](https://portal.azure.com/#create/Microsoft.CognitiveServicesAllInOne) using the same subscription, location, and resource group that you did for your Azure search service.  Click "Create" and after the resource is ready, click it.  Click "Keys and Endpoint" in the left-hand sidebar.  Copy the Key 1 value into this TODO.  
3. __Knowledge Store connection string:__ use the value that you noted down earlier of the connection string to the knowledgeStore container in your Azure blob storage.  It should be of the format "DefaultEndpointsProtocol=https;AccountName=YourValueHere;AccountKey=YourValueHere;EndpointSuffix=core.windows.net".  

Finally, you are all set to go into the SetupAzureCognitiveSearchService.ipynb notebook and run it.  This notebook will call REST endpoints on the search service that you have deployed in Azure to setup the search data sources, index, indexers, and skillset.  


___

### Task 9 - Deploy Web Application

To deploy the web application you will need the following steps:

* [Create an Azure App Service](#step-1---create-an-app-services)
* [Update Web App Settings file](#step-2---update-web-app-settings-file)
* [Create Github Secret and Update Github Actions File](#step-3---create-github-secret-and-update-github-actions-file)
* [Commit changes to your repository](#)

#### Step 1 - Create an App Services

This repository includes a workflow to publish the web application. But first you need to [create an App Service](https://learn.microsoft.com/en-us/azure/app-service/environment/using#create-an-app) with the following configuration:

* Unique name for your application like DoctorNotesApp
* Publish: Code
* Runtime stack: .Net 6(LTS)
* Operating System: windows
* Region: the same region you selected for your resource group
* Create a new Windows plan if you dont have one

> You can change the default size of your sizing plan to a development plan if you want to, but performance would be slower

![Application Configuration](images/AppServiceConfiguration.png)

Once the App service is provisioned, navigate to the App and download the publish profile

![Get App Profile](images/get-publish-profile.png)

Open the file and copy the content to a text file

#### Step 2 - Update Web App Settings file

Navigate to the web-app/Cognitive.UI folder and open the appsettings.json file and change the following parameters:

```json
  "SearchServiceName": "YOUR_COGNITIVE_SEARCH_SERVICE_NAME",
  "SearchApiKey": "YOUR_COGNITIVE_SEARCH_SERVICE_NAME",
  "SearchIndexName": "azuresql-index",
  "SearchIndexerName": "azure-sql-indexer",
  "StorageAccountName": "YOUR_STORAGE_ACCOUNT_NAME",
  "StorageAccountKey": "YOUR_STORAGE_ACCOUNT_NAME",
  "StorageContainerAddress": "https://YOUR_STORAGE_ACCOUNT_NAME.blob.core.windows.net/doctor-notes-search" 
```

> Please make sure the index and indexer names match those created on your Cognitive Search Service

#### Step 3 - Create Github Secret and update Github Actions File

Next nagivate to your [Github repository secrets](https://docs.github.com/en/codespaces/managing-codespaces-for-your-organization/managing-encrypted-secrets-for-your-repository-and-organization-for-github-codespaces) change the value for the secret named *__DoctorNotesSearchPoc_A28D__* copy and paste the content of the publish profile you just downloaded to the value box.

If the secret does not exist, please create it.

Next navigate to the workflow file located at .github/workflows/DoctorNotesSearchPoc.yml and replace the value for the variable *__AZURE_WEBAPP_NAME__* to match the name of the Azure Service App you just created.

#### Step 4 - Commit changes to Github

Commit your changes to the main branch of the forked Github repository, then navigate to Actions to confirm the Application has been published.

## Credits

This project was enhanced and changed from the [Covid-19 Search](https://github.com/liamca/covid19search) repository by [Liam Cavanagh](https://github.com/liamca).

Markup text for healthcare analytics code was provided by [Oren Barnea](https://github.com/barneaoren)

[Sign in]:<https://portal.azure.com/>
[60 day trial]:https://signup.microsoft.com/signup?sku=a403ebcc-fae0-4ca2-8c8c-7a907fd6c235&email&ru=https%3A%2F%2Fapp.powerbi.com%3Fpbi_source%3Dweb%26redirectedFromSignup%3D1%26noSignUpCheck%3D1


