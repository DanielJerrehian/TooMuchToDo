import unittest
import json


from ..client import ApiClient
from src.models.models import db, User, ToDo
from src.auth.firebase_auth import DeleteFirebaseAuthUser
from src.utils.google.firebase import firebase_auth
from src.logic.to_dos import GetToDos
from src.logic.to_dos import PostToDo
from src.logic.to_dos import UpdateToDo


class TestGetToDos(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.filters = {"user_firebase_uid": "123456789", "deleted": False}
        self.order_by = {"timestamp": "asc"}
        self.columns = ["id", "user_firebase_uid", "task", "completed", "timestamp", "deleted"]
        self.user = {"email": "test@user.com", "password": "Password"}

    def tearDown(self):
        pass

    def test_class_object_exists(self):
        self.assertTrue(GetToDos)

    def test_pass_args(self):
        with self.api.app.app_context():
            class_object = GetToDos(filters=self.filters)
            self.assertEqual(class_object.filters, self.filters)
            self.assertEqual(class_object.columns, self.columns)
            self.assertTrue(class_object.query)
            self.assertEqual(class_object.order_by, {})
            self.assertEqual(class_object.order_by_list, [])
            self.assertEqual(class_object.result, None)

    def test_pass_args_with_order_by(self):
        with self.api.app.app_context():
            class_object = GetToDos(filters=self.filters, order_by=self.order_by)
            self.assertEqual(class_object.filters, self.filters)
            self.assertEqual(class_object.columns, self.columns)
            self.assertTrue(class_object.query)
            self.assertEqual(class_object.order_by, self.order_by)
            self.assertEqual(class_object.order_by_list, [])
            self.assertEqual(class_object.result, None)

    def test_order_query_no_order_by_attribute(self):
        with self.api.app.app_context():
            class_object = GetToDos(filters=self.filters)
            class_object.order_query()
            self.assertTrue(class_object.query)
            self.assertEqual(class_object.order_by_list, [])

    def test_order_query(self):
        with self.api.app.app_context():
            class_object = GetToDos(filters=self.filters, order_by=json.dumps(self.order_by))
            class_object.order_query()
            self.assertEqual(class_object.order_by, self.order_by)
            self.assertEqual(len(class_object.order_by_list), 1)
            self.assertTrue("ORDER BY" in str(class_object.query))

    def test_order_query_multiple_order_bys(self):
        with self.api.app.app_context():
            class_object = GetToDos(filters=self.filters, order_by=json.dumps({"timestamp": "asc", "completed": "desc"}))
            class_object.order_query()
            self.assertEqual(class_object.order_by, {"timestamp": "asc", "completed": "desc"})
            self.assertEqual(len(class_object.order_by_list), 2)
            self.assertTrue("ORDER BY" in str(class_object.query))

    def test_fetch_first(self):
        with self.api.app.app_context():
            user = User.query.filter(User.email == self.user["email"]).first()
            user_firebase_uid = user.firebase_uid
            self.api = ApiClient(user=user)
            self.api.add_firebase_token()
            self.api.post("/to-dos/new", json={"firebaseUid": user_firebase_uid, "task": "Unit Test"})
            class_object = GetToDos()
            class_object.order_query()
            class_object.fetch_first()
            self.assertEqual(class_object.result.task, "Unit Test")
            self.assertTrue(class_object.result)

    def test_fetch_all(self):
        with self.api.app.app_context():
            user = User.query.filter(User.email == self.user["email"]).first()
            user_firebase_uid = user.firebase_uid
            self.api = ApiClient(user=user)
            self.api.add_firebase_token()
            self.api.post("/to-dos/new", json={"firebaseUid": user_firebase_uid, "task": "Unit Test"})
            class_object = GetToDos(filters={"user_firebase_uid": user_firebase_uid})
            class_object.order_query()
            class_object.fetch_all()
            self.assertEqual(len(class_object.result), 1)
            self.assertEqual(class_object.result[0].task, "Unit Test")


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

    def test_pass_args(self):
        class_object = PostToDo(user_firebase_uid=self.user_firebase_uid, task="Unit Test")
        self.assertTrue(class_object.to_do)

    def test_add_to_do(self):
        with self.api.app.app_context():
            class_object = PostToDo(user_firebase_uid=self.user_firebase_uid, task="Unit Test")
            class_object.add_to_do()
            class_object.commit()
            inserted_to_do = ToDo.query.filter_by(user_firebase_uid = self.user_firebase_uid, task="Unit Test").first()
            self.assertEqual(inserted_to_do.task, "Unit Test")
            self.assertEqual(inserted_to_do.completed, False)


class TestUpdateToDo(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.user_firebase_uid = "123456789"
        with self.api.app.app_context():
            class_object = PostToDo(user_firebase_uid=self.user_firebase_uid, task="Unit Test")
            class_object.add_to_do()
            class_object.commit()
            self.inserted_to_do = ToDo.query.filter_by(user_firebase_uid = self.user_firebase_uid, task="Unit Test").first()

    def tearDown(self):
        with self.api.app.app_context():
            to_dos = ToDo.query.filter_by(user_firebase_uid = self.user_firebase_uid).all()
            for to_do in to_dos:
                db.session.delete(to_do)
            db.session.commit()

    def test_class_object_exists(self):
        self.assertTrue(UpdateToDo)

    def test_pass_args(self):
        class_object = UpdateToDo(to_do_id=self.inserted_to_do.id, update_attributes={"test": True})
        self.assertEqual(class_object.to_do_id, self.inserted_to_do.id)
        self.assertEqual(class_object.update_attributes, {"test": True})

    def test_update_to_do(self):
        with self.api.app.app_context():
            class_object = UpdateToDo(to_do_id=self.inserted_to_do.id, update_attributes={"completed": True})
            class_object.update_to_do()
            class_object.commit()
            updated_to_do = ToDo.query.filter_by(user_firebase_uid = self.user_firebase_uid, task="Unit Test").first()
            self.assertEqual(updated_to_do.task, "Unit Test")
            self.assertEqual(updated_to_do.completed, True)
