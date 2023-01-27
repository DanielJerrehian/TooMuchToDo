from ...models.models import db


class DatabaseCrud:
    def __init__(self):
        self.db = db

    def commit(self):
        self.db.session.commit()

    def fetch_first(self, query: object) -> object:
        return query.first()
    
    def fetch_all(self, query: object) -> object:
        return query.all()
    
    def fetch_count(self, query: object) -> int:
        return query.count()

    def fetch_paginate(self, query: object, page: int = 1, per_page: int = 10):
        result = query.paginate(page=page, per_page=per_page)
        return result.items