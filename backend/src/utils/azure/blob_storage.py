from azure.storage.blob import BlobServiceClient, BlobClient
import os


class BlobStorage:
    def __init__(self, blob_name: str = None, storage_container_name: str = "pictures/profilePictures"):
        self.blob_name = blob_name
        self.blob_service_client = BlobServiceClient(account_url=os.environ.get("BLOB_STORAGE_URL"), credential=os.environ.get("BLOB_STORAGE_KEY"))
        self.storage_container_client = self.blob_service_client.get_container_client(storage_container_name)          
        if self.blob_name:
            self.blob_client = BlobClient.from_connection_string(conn_str=os.environ.get("BLOB_CONNECTION_STRING"), blob_name=self.blob_name, container_name=storage_container_name)

    def close_connection(self, client: object) -> None:
        client.close()
        

class DeleteBlob(BlobStorage):
    def __init__(self, blob_name: str, storage_container_name: str = "pictures/profilePictures"):
        super().__init__(blob_name=blob_name, storage_container_name=storage_container_name)
                
    def delete_blob(self) -> None:
        if self.blob_client.exists():
            self.storage_container_client.delete_blob(blob=self.blob_name, delete_snapshots="include")


class UploadBlob(BlobStorage):
    def __init__(self):
        super().__init__()
  
    def upload_blob(self, blob_name: str, data: object, storage_container_name: str = "pictures/profilePictures") -> str:
        self.storage_container_client.upload_blob(name=blob_name, data=data, overwrite=True)
        return  f"{self.blob_service_client.url}{storage_container_name}/{blob_name}"



