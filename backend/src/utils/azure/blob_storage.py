from azure.storage.blob import BlobServiceClient, BlobClient
import os


class BlobStorage:
    def __init__(self, storage_container_name:str=None, blob_name:str=None):
        self.storage_container_name = storage_container_name
        self.blob_name = blob_name
        self.blob_service_client = None
        self.blob_client = None
        self.storage_url = os.environ.get("BLOB_STORAGE_URL")
        self.storage_key = os.environ.get("BLOB_STORAGE_KEY")
        self.connection_string = os.environ.get("BLOB_CONNECTION_STRING")
        self.storage_container = None
            
    def get_blob_client(self):
        self.blob_client = BlobClient.from_connection_string(conn_str=self.connection_string, container_name=self.storage_container_name, blob_name=self.blob_name)        
            
    def get_blob_service_client(self):
        self.blob_service_client = BlobServiceClient(account_url=self.storage_url, credential=self.storage_key)
                
    def get_storage_container_client(self):
        self.storage_container = self.blob_service_client.get_container_client(self.storage_container_name)

    def close_connection(self):
        self.storage_container.close()
        self.blob_service_client.close()
        self.blob_client.close()


class DeleteBlob(BlobStorage):
    def __init__(self, storage_container_name:str=None, blob_name:str=None):
        super().__init__(storage_container_name=storage_container_name, blob_name=blob_name)
        self.blob_exists = None
            
    def check_if_blob_exists(self):
        self.blob_exists = self.blob_client.exists()
                
    def delete_blob(self):
        self.storage_container.delete_blob(blob=self.blob_name, delete_snapshots="include")


class UploadBlob(BlobStorage):
    def __init__(self, storage_container_name:str=None, upload_data:object=None, blob_name:str=None):
        super().__init__(storage_container_name=storage_container_name, blob_name=blob_name)
        self.upload_data = upload_data
        self.blob_name = blob_name
        self.blob_file_link = None
            
    def upload_data_to_container(self):
        self.storage_container.upload_blob(name=self.blob_name, data=self.upload_data, overwrite=True)
        
    def get_blob_file_link(self):
        self.blob_file_link = f"{self.blob_service_client.url}{self.storage_container_name}/{self.blob_name}"



