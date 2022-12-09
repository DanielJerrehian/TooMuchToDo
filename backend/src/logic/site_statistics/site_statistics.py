from ...models.models import User
from ...utils.sql.database_crud import DatabaseCrud
from ...models.models import ToDo


class SiteStatistics:
    def __init__(self):
        pass

    def get_total_users(self):
        count = DatabaseCrud().fetch_count(query=User.query)
        return count
        
    def get_total_to_dos(self):
        count = DatabaseCrud().fetch_count(query=ToDo.query)
        return count
        
    def get_total_completed_to_dos(self):
        count = DatabaseCrud().fetch_count(query=ToDo.query.filter_by(**{"completed": True}))
        return count


        
