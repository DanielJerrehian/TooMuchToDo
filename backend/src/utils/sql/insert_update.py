from ...models.models import db


class InsertUpdate:
    def __init__(self):
        pass

    def commit(self):
        db.session.commit()