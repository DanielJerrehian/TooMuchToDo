from datetime import datetime

from ...utils.sql.database_crud import DatabaseCrud
from ...models.models import User
from .upload_profile_picture import UploadProfilePicture
from .delete_profile_picture import DeleteProfilePicture


class UpdateProfilePictureManager:
    def __init__(self):
        pass

    def update_profile_picture(self, user_firebase_uid: str, new_profile_picture: object) -> dict:
        query = User.query.filter_by(**{"firebase_uid": user_firebase_uid})
        user = DatabaseCrud().fetch_first(query=query)
        DeleteProfilePicture().delete_old_profile_picture(user=user)
        blob_name = f"{user_firebase_uid}-{datetime.utcnow()}"
        blob_file_link = UploadProfilePicture().upload(blob_name=blob_name, upload_data=new_profile_picture)
        return {"blob_name": blob_name, "blob_file_link": blob_file_link}
