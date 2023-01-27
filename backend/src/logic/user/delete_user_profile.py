from ...utils.sql.database_crud import DatabaseCrud
from ...models.models import User


class DeleteUserProfile(DatabaseCrud):
    def __init__(self):
        super().__init__()
    
    def fetch_user(self, user_firebase_id : str) -> object:
        return User.query.filter(User.firebase_uid == user_firebase_id).first()
        
    def delete_user(self, user: object) -> None:
        self.db.session.delete(user) 
        self.commit()