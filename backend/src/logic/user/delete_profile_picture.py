from ...utils.azure.blob_storage import DeleteBlob

class DeleteProfilePicture:
    def __init__(self):
        pass

    def delete_old_profile_picture(self, user: object) -> None:
        if user.profile_picture_blob_name:
            delete = DeleteBlob(blob_name=user.profile_picture_blob_name)
            delete.delete_blob()
            for client in [delete.blob_client, delete.blob_service_client, delete.storage_container_client]:
                delete.close_connection(client=client)