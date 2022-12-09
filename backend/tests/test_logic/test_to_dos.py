import unittest

from ..client import ApiClient
from src.models.models import db, ToDo
from src.logic.to_dos import PostToDo
from src.logic.to_dos import UpdateToDo


class TestPostToDo(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.user_firebase_uid = "123456789"

    def tearDown(self):
        with self.api.app.app_context():
            to_dos = ToDo.query.filter_by(user_firebase_uid = self.user_firebase_uid).all()
            for to_do in to_dos:
                db.session.delete(to_do)
            db.session.commit()

    def test_class_object_exists(self):
        self.assertTrue(PostToDo)

    def test_class_inheritance(self):
        self.assertTrue(PostToDo().commit)

    def test_add_to_do(self):
        with self.api.app.app_context():
            PostToDo().add(user_firebase_uid=self.user_firebase_uid, task="Unit Test")
            inserted_to_do = ToDo.query.filter_by(user_firebase_uid = self.user_firebase_uid, task="Unit Test").first()
            self.assertEqual(inserted_to_do.task, "Unit Test")
            self.assertEqual(inserted_to_do.completed, False)


class TestUpdateToDo(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.user_firebase_uid = "123456789"
        with self.api.app.app_context():
            PostToDo().add(user_firebase_uid=self.user_firebase_uid, task="Unit Test")
            self.inserted_to_do = ToDo.query.filter_by(user_firebase_uid = self.user_firebase_uid, task="Unit Test").first()

    def tearDown(self):
        with self.api.app.app_context():
            to_dos = ToDo.query.filter_by(user_firebase_uid = self.user_firebase_uid).all()
            for to_do in to_dos:
                db.session.delete(to_do)
            db.session.commit()

    def test_class_object_exists(self):
        self.assertTrue(UpdateToDo)

    def test_class_inheritance(self):
        update = UpdateToDo()
        self.assertTrue(update.commit)

    def test_update(self):
        with self.api.app.app_context():
            UpdateToDo().update(to_do_id=self.inserted_to_do.id, update_attributes={"completed": True})
            updated_to_do = ToDo.query.filter_by(user_firebase_uid = self.user_firebase_uid, task="Unit Test").first()
            self.assertEqual(updated_to_do.task, "Unit Test")
            self.assertEqual(updated_to_do.completed, True)
