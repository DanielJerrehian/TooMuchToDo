from ..models.models import db, ToDo
from ..utils.sql.database_crud import DatabaseCrud


class PostToDo(DatabaseCrud):
    def __init__(self):
        super().__init__()

    def add(self, user_firebase_uid: str = None, task: str = None, completed: bool = False, deleted: bool = False) -> None:
        to_do = ToDo(user_firebase_uid=user_firebase_uid, task=task, completed=completed, deleted=deleted)
        print(to_do)
        db.session.add(to_do)
        self.commit()


class UpdateToDo(DatabaseCrud):
    def __init__(self):
        super().__init__()

    def update(self, to_do_id: int, update_attributes: dict = {}) -> None:
        db.session.query(ToDo).filter(ToDo.id == to_do_id).update(update_attributes)
        self.commit()
