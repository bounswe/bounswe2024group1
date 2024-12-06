## Importing JSON Collections into Postman

To import the given JSON collections under the `postman_collections` folder into Postman and use them effectively, follow these steps:

### Importing JSON Collections into Postman

1. **Open Postman**: Launch the Postman application on your computer.
2. **Import Collection**:
    - Click on the `Import` button located at the top left corner of the Postman interface.
    - In the Import dialog, select the `Upload Files` tab.
    - Navigate to the `postman_collections` folder in your project directory.
    - Select the JSON file(s) you want to import (e.g., `CMPE451-Backend.postman_collection.json`).
    - Click `Open` to import the selected file(s).

### Usage of Imported Collections

1. **Accessing the Collection**:
    - After importing, the collection will appear in the `Collections` tab on the left sidebar of Postman.
    - Expand the collection to see the list of requests organized by folders and subfolders.

2. **Running Requests**:
    - Click on any request to open it in the main workspace.
    - Ensure that the necessary environment variables (e.g., `{{host}}`, `{{token}}`) are set up in Postman.
    - Click the `Send` button to execute the request and view the response.

3. **Using Environments**:
    - Create or select an environment in Postman to manage variables like `{{host}}` and `{{token}}`.

### Updating Collections with New Endpoints

1. **Adding New Requests**:
    - Right-click on the collection or folder where you want to add a new request.
    - Select `Add Request` and configure the request details (method, URL, headers, body, etc.).
    - Save the request with a meaningful name.

2. **Modifying Existing Requests**:
    - Click on the request you want to modify.
    - Update the request details as needed.
    - Save the changes.

3. **Exporting Updated Collections**:
    - After making changes, you can export the updated collection to share with your team or for version control.
    - Click on the three dots (`...`) next to the collection name.
    - Select `Export` and choose the format (e.g., JSON).
    - Save the exported file back to the `postman_collections` folder in your project directory.
