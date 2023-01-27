import json
from ...models.models import ToDo

class OrderByToDos:
    def __init__(self):
        pass

    def order_query(self, order_by: dict, query: object):
        order_by_array = []
        if order_by:
            order_by = json.loads(order_by)
            for column in ToDo.__table__.columns:
                for key in order_by:
                    if key == column.name:
                        order_by_array.append(getattr(column, order_by[key])()) 
            for order_by in order_by_array:
                query = query.order_by(order_by)
        return query