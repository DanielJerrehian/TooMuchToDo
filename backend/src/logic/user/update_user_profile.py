from ...utils.sql.database_crud import DatabaseCrud
from ...models.models import User
from ...utils.mappers.user_mapper import user_mapper

       
        
class UpdateUserProfile(DatabaseCrud):
    def __init__(self):
        super().__init__()
        
    def map_fields_to_column_names(self, data: dict) -> dict:
        mapped_data = {}
        for key, value in data.items():
            if key in user_mapper.keys():
                mapped_data[user_mapper[key]] = value
        return mapped_data
        
    def update_profile(self, user_firebase_id: str, mapped_data: dict) -> None:
        if mapped_data:
            self.db.session.query(User).filter(User.firebase_uid == user_firebase_id).update(mapped_data)
            self.commit()
        