from marshmallow import fields

from ..ma import ma
from ...models import User, ToDo


class UserSchema(ma.SQLAlchemyAutoSchema):
    firebaseUid = fields.String(attribute="firebase_uid")
    firstName = fields.String(attribute="first_name")
    lastName = fields.String(attribute="last_name")
    profilePicture = fields.String(attribute="profile_picture")
    profilePictureBlobName = fields.String(attribute="profile_picture_blob_name")
    todos = ma.Nested("ToDoSchema", many=True)
    
    class Meta:
        model = User
        exclude = ["firebase_uid", "first_name", "last_name", "profile_picture", "profile_picture_blob_name"]
        load_instance = True
        

class ToDoSchema(ma.SQLAlchemyAutoSchema):
    user = ma.Nested("UserSchema", exclude=("todos",))
    
    class Meta:
        model = ToDo
        load_instance = True
