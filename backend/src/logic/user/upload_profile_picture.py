from ...utils.azure.blob_storage import UploadBlob


class UploadProfilePicture:
    def __init__(self):
        pass

    def upload(self, blob_name: str, upload_data: object) -> dict:
        upload = UploadBlob()
        blob_file_link = upload.upload_blob(blob_name=blob_name, data=upload_data)
        for client in [upload.storage_container_client, upload.blob_service_client]:
            upload.close_connection(client=client)
        return blob_file_link
