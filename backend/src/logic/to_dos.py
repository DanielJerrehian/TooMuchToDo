import json

from ..models.models import db, ToDo
from ..utils.sql.insert_update import InsertUpdate


class GetToDos:
    def __init__(self, filters:dict={}, order_by:dict={}):
        self.filters = filters
        self.query = ToDo.query.filter_by(**self.filters)
        self.columns = ToDo.__table__.columns.keys()
        self.order_by = order_by
        self.order_by_list = []
        self.result = None
        
    def order_query(self):
        if self.order_by:
            self.order_by = json.loads(self.order_by)
            for column in ToDo.__table__.columns:
                for key in self.order_by:
                    if key == column.name:
                        self.order_by_list.append(getattr(column, self.order_by[key])())
                    
            for order_by in self.order_by_list:
                self.query = self.query.order_by(order_by)
        
    def fetch_first(self):
        self.result = self.query.first()
    
    def fetch_all(self):
        self.result = self.query.all()
    
    def count(self):
        self.result = self.query.count()


class PostToDo(InsertUpdate):
    def __init__(self, user_firebase_uid:str=None, task:str=None, completed:bool=False, deleted:bool=False):
        super().__init__()
        self.to_do = ToDo(user_firebase_uid=user_firebase_uid, task=task, completed=completed, deleted=deleted)
        
    def add_to_do(self):
        db.session.add(self.to_do)
        

class UpdateToDo(InsertUpdate):
    def __init__(self, to_do_id:int=None, update_attributes:dict={}):
        super().__init__()
        self.to_do_id = to_do_id
        self.update_attributes = update_attributes
        
    def update_to_do(self):
        db.session.query(ToDo).filter(ToDo.id == self.to_do_id).update(self.update_attributes)
        