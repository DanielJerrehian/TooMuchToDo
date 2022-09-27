import unittest

from ...client import ApiClient
from src.utils.sql.insert_update import InsertUpdate

class TestInsertUpdate(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()

    def tearDown(self):
        pass

    def test_class_exists(self):
        self.assertTrue(InsertUpdate)

    def test_commit(self):
        with self.api.app.app_context():
            insert = InsertUpdate()
            insert.commit()
            self.assertTrue(InsertUpdate)