from ..models.models import db, User, ToDo
from .to_dos import GetToDos


class SiteStatistics:
    def __init__(self):
        self.total_users = None
        self.total_to_dos = None
        self.total_completed_to_dos = None

    def get_total_users(self):
        self.total_users = User.query.count()
        
    def get_total_to_dos(self):
        count_total = GetToDos()
        count_total.count()
        self.total_to_dos = count_total.result
        
    def get_total_completed_to_dos(self):
        count_completed = GetToDos(filters={"completed": True})
        count_completed.count()
        self.total_completed_to_dos = count_completed.result


        
