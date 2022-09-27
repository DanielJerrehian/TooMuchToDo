from flask import Blueprint, request, make_response
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from ..decorators.verify_firebase_id_token import verify_firebase_id_token
from ..logic.user import UpdateUserProfile, DeleteUserProfile
from ..auth.firebase_auth import DeleteFirebaseAuthUser
from ..utils.azure.blob_storage import UploadBlob, DeleteBlob
from ..models.models import User
from ..models.marshmallow.schemas.ma_schemas import UserSchema


user = Blueprint("user", __name__)

@user.put("/update-profile/<string:user_firebase_uid>")
@verify_firebase_id_token
def update_profile(user_firebase_uid):
    if request.user["uid"] == user_firebase_uid:
        updated_profile_data = request.form.to_dict()
        new_profile_picture = request.files.get("profilePicture", None)
        if new_profile_picture:
            user = User.query.filter_by(firebase_uid = user_firebase_uid).first()
            if user.profile_picture_blob_name:
                delete = DeleteBlob(storage_container_name="pictures/profilePictures", blob_name=user.profile_picture_blob_name)
                delete.get_blob_client()
                delete.check_if_blob_exists()
                if delete.blob_exists:
                    delete.get_blob_service_client()
                    delete.get_storage_container_client()
                    delete.delete_blob()
                    delete.close_connection()
            blob = UploadBlob(
                storage_container_name="pictures/profilePictures", 
                upload_data=new_profile_picture,
                blob_name=f"{user_firebase_uid}-{datetime.utcnow()}"
            )
            blob.get_blob_client()
            blob.get_blob_service_client()
            blob.get_storage_container_client()
            blob.upload_data_to_container()
            blob.get_blob_file_link()
            blob.close_connection()
            updated_profile_data["profilePicture"] = blob.blob_file_link
            updated_profile_data["profilePictureBlobName"] = blob.blob_name
        update_user = UpdateUserProfile(user_firebase_id=user_firebase_uid, updated_profile_data=updated_profile_data)
        update_user.map_dict_fields_to_column_names()
        if update_user.update_attributes:
            try:
                update_user.update_profile(update_attributes=update_user.update_attributes)
            except IntegrityError:
                return {"message": "That E-Mail is already taken by another user"}, 409
            update_user.commit()
            return {"message": "Profile updated successfully"}, 200
        else:
            return {"message": "Nothing to update"}, 200
    else:
        return {"message": "Forbidden"}, 403

@user.get("/user/<string:user_firebase_uid>")
@verify_firebase_id_token
def get_user(user_firebase_uid):
    if request.user["uid"] == user_firebase_uid:
        user = User.query.filter(User.firebase_uid == user_firebase_uid).first()
        return {"user": UserSchema(exclude=["todos"]).dump(user)}, 200
    else:
        return {"message": "Forbidden"}, 403
    
@user.delete("/delete-user/<string:user_firebase_uid>")
@verify_firebase_id_token
def delete_user(user_firebase_uid):
    if request.user["uid"] == user_firebase_uid:
        delete_firebase = DeleteFirebaseAuthUser(user_id_token=request.headers["Authorization"])
        delete_firebase.run_request()
        delete_firebase.convert_response_to_json()
        delete_user = DeleteUserProfile(user_firebase_id=user_firebase_uid)
        delete_user.fetch_user()
        delete_user.delete_user()
        delete_user.commit()
        response = make_response({"message": "User deleted"})
        response.set_cookie(key="refreshToken", value="", expires=0)
        return response, 200
    else:
        return {"message": "Forbidden"}, 403