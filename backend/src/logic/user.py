from ..models.models import db, User


class UserProfile:
    def __init__(self, user_firebase_id:str=None):
        self.user_firebase_id = user_firebase_id
        
    def commit(self):
        db.session.commit()
        
        
class UpdateUserProfile(UserProfile):
    def __init__(self, user_firebase_id:str=None, updated_profile_data:dict={}):
        super().__init__(user_firebase_id=user_firebase_id)
        self.updated_profile_data = updated_profile_data
        self.update_attributes = {}
        self.field_column_mapper = {
            "email": "email",
            "firstName": "first_name",
            "lastName": "last_name",
            "profilePicture": "profile_picture",
            "profilePictureBlobName": "profile_picture_blob_name"
        }
        
    def map_dict_fields_to_column_names(self):
        for key, value in self.updated_profile_data.items():
            if key in self.field_column_mapper.keys():
                self.update_attributes[self.field_column_mapper[key]] = value
            else:
                self.update_attributes.pop(key, None)
        
    def update_profile(self, update_attributes):
        db.session.query(User).filter(User.firebase_uid == self.user_firebase_id).update(update_attributes)
        

class DeleteUserProfile(UserProfile):
    def __init__(self, user_firebase_id:str=None):
        super().__init__(user_firebase_id=user_firebase_id)
        self.user = None
    
    def fetch_user(self):
        self.user = User.query.filter(User.firebase_uid == self.user_firebase_id).first()
        
    def delete_user(self):
        db.session.delete(self.user) 