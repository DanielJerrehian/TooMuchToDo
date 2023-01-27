from flask import Blueprint, request, make_response
from sqlalchemy.exc import IntegrityError

from ..decorators.verify_firebase_token_path_parameter import verify_firebase_token_path_parameter
from ..logic.user.update_user_profile import UpdateUserProfile
from ..logic.user.delete_user_profile import DeleteUserProfile
from ..auth.firebase_auth import DeleteFirebaseAuthUser
from ..models.models import User
from ..utils.sql.database_crud import DatabaseCrud
from ..models.marshmallow.schemas.ma_schemas import UserSchema
from ..logic.user.update_profile_picture_manager import UpdateProfilePictureManager


user = Blueprint("user", __name__)

@user.put("/update-profile/<string:user_firebase_uid>")
@verify_firebase_token_path_parameter
def update_profile(user_firebase_uid):
    update_profile_data = request.form.to_dict()
    new_profile_picture = request.files.get("profilePicture", None)
    if new_profile_picture:
        blob_data = UpdateProfilePictureManager().update_profile_picture(user_firebase_uid=user_firebase_uid, new_profile_picture=new_profile_picture)
        update_profile_data["profilePicture"] = blob_data["blob_file_link"]
        update_profile_data["profilePictureBlobName"] = blob_data["blob_name"]
    update_user = UpdateUserProfile()
    mapped_data = update_user.map_fields_to_column_names(data=update_profile_data)
    try:
        update_user.update_profile(user_firebase_id=user_firebase_uid, mapped_data=mapped_data)
        return {"message": "Profile updated successfully"}, 200
    except IntegrityError:
        return {"message": "That E-Mail is already taken by another user"}, 409


@user.get("/user/<string:user_firebase_uid>")
@verify_firebase_token_path_parameter
def get_user(user_firebase_uid):
    user = User.query.filter(User.firebase_uid == user_firebase_uid).first()
    return {"user": UserSchema(exclude=["todos"]).dump(user)}, 200

    
@user.delete("/delete-user/<string:user_firebase_uid>")
@verify_firebase_token_path_parameter
def delete_user(user_firebase_uid):
    DeleteFirebaseAuthUser().delete(user_id_token=request.headers["Authorization"])
    delete = DeleteUserProfile()
    user = DatabaseCrud().fetch_first(query=User.query.filter_by(**{"firebase_uid": user_firebase_uid}))
    delete.delete_user(user=user)
    response = make_response({"message": "User deleted"})
    response.set_cookie(key="refreshToken", value="", expires=0)
    return response, 200