import unittest

from ..client import ApiClient
from src.models.models import db, User, ToDo


class TestPostNewToDo(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.user = {"email": "test@user.com", "password": "Password"}
        with self.api.app.app_context():
            self.user = User.query.filter(User.email == self.user["email"]).first()
            self.api = ApiClient(user=self.user)
            self.body = {"firebaseUid": self.user.firebase_uid, "task": "Unit Test"}

    def tearDown(self):
        with self.api.app.app_context():
            to_do = ToDo.query.filter_by(user_firebase_uid = self.user.firebase_uid, task = self.body["task"]).first()
            if to_do:
                db.session.delete(to_do)
                db.session.commit()

    def test_post_new_to_do_201(self):
        with self.api.app.app_context():
            self.api.add_firebase_token()
            response = self.api.post("/to-dos/new", json=self.body)
            new_to_do = ToDo.query.filter(ToDo.user_firebase_uid == self.user.firebase_uid, ToDo.task == self.body["task"]).first()
            self.assertEqual(new_to_do.task, "Unit Test")
            self.assertTrue(new_to_do.id)
            self.assertEqual(response.json["message"], "To-Do created")
            self.assertEqual(response.status_code, 201)

    def test_post_new_to_do_500(self):
        with self.api.app.app_context():
            self.api.add_firebase_token()
            try:    
                self.api.post("/to-dos/new", json={"firebaseUid": self.user.firebase_uid})
            except:
                self.assertRaises(KeyError)
                new_to_do = ToDo.query.filter(ToDo.user_firebase_uid == self.user.firebase_uid, ToDo.task == self.body["task"]).first()
                self.assertEqual(new_to_do, None)


class TestGetToDos(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.user = {"email": "test@user.com", "password": "Password"}
        with self.api.app.app_context():
            self.user = User.query.filter(User.email == self.user["email"]).first()
            self.api = ApiClient(user=self.user)
            with self.api.app.app_context():
                self.user_firebase_uid = User.query.filter(User.email == self.user.email).first().firebase_uid
                self.api.add_firebase_token()
                self.api.post("/to-dos/new", json={"firebaseUid": self.user_firebase_uid, "task": "Unit Test 1"})
                self.api.post("/to-dos/new", json={"firebaseUid": self.user_firebase_uid, "task": "Unit Test 2"})
                self.to_do_id = ToDo.query.filter(ToDo.user_firebase_uid == self.user_firebase_uid, ToDo.task == "Unit Test 1").first().id

    def tearDown(self):
        with self.api.app.app_context():
            to_dos = ToDo.query.filter_by(user_firebase_uid = self.user_firebase_uid).all()
            if to_dos:
                for to_do in to_dos:
                    db.session.delete(to_do)
                db.session.commit()
            
    def test_get_to_dos_200_filter_by_deleted_false_order_by_asc(self):
        with self.api.app.app_context():
            response = self.api.get(f"/to-dos/{self.user_firebase_uid}?filterBy=%7B%22deleted%22%3A%20false%7D&orderBy=%7B%20%22timestamp%22%3A%20%22asc%22%20%7D")
            self.assertEqual(response.json["toDos"][0]["task"], "Unit Test 1")
            self.assertEqual(response.json["toDos"][1]["task"], "Unit Test 2")
            self.assertEqual(response.status_code, 200)

    def test_get_to_dos_200_filter_by_deleted_false_order_by_desc(self):
        with self.api.app.app_context():
            response = self.api.get(f"/to-dos/{self.user_firebase_uid}?filterBy=%7B%22deleted%22%3A%20false%7D&orderBy=%7B%20%22timestamp%22%3A%20%22desc%22%20%7D")
            self.assertEqual(response.json["toDos"][0]["task"], "Unit Test 2")
            self.assertEqual(response.json["toDos"][1]["task"], "Unit Test 1")
            self.assertEqual(response.status_code, 200)

    def test_get_to_dos_200_filter_by_deleted_false_completed_true_order_by_desc(self):
        with self.api.app.app_context():
            self.api.put(f"/to-dos/update", json={"firebaseUid": self.user_firebase_uid, "toDoId": self.to_do_id, "updateAttributes": {"completed": True}})
            response = self.api.get(f"/to-dos/{self.user_firebase_uid}?filterBy=%7B%22deleted%22%3A%20false%2C%20%22completed%22%3A%20true%7D&orderBy=%7B%20%22timestamp%22%3A%20%22desc%22%20%7D")
            self.assertEqual(response.json["toDos"][0]["task"], "Unit Test 1")
            self.assertEqual(response.status_code, 200)
    
    def test_get_to_dos_403(self):
        with self.api.app.app_context():
            response = self.api.get("/to-dos/123456789")
            self.assertEqual(response.json["message"], "Forbidden")
            self.assertEqual(response.status_code, 403)


class TestUpdateToDo(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.user = {"email": "test@user.com", "password": "Password"}
        with self.api.app.app_context():
            self.user = User.query.filter(User.email == self.user["email"]).first()
            self.api = ApiClient(user=self.user)
            with self.api.app.app_context():
                self.user_firebase_uid = self.user.firebase_uid
                self.api.add_firebase_token()
                self.api.post("/to-dos/new", json={"firebaseUid": self.user_firebase_uid, "task": "Unit Test 1"})
                self.api.post("/to-dos/new", json={"firebaseUid": self.user_firebase_uid, "task": "Unit Test 2"})
                self.to_do_id = ToDo.query.filter(ToDo.user_firebase_uid == self.user_firebase_uid, ToDo.task == "Unit Test 1").first().id

    def tearDown(self):
        with self.api.app.app_context():
            to_dos = ToDo.query.filter_by(user_firebase_uid = self.user_firebase_uid).all()
            if to_dos:
                for to_do in to_dos:
                    db.session.delete(to_do)
                db.session.commit()

    def test_update_to_do_200(self):
        with self.api.app.app_context():
            response = self.api.put(f"/to-dos/update", json={"firebaseUid": self.user_firebase_uid, "toDoId": self.to_do_id, "updateAttributes": {"completed": True}})
            updated_to_do = ToDo.query.filter(ToDo.user_firebase_uid == self.user_firebase_uid, ToDo.task == "Unit Test 1").first()
            self.assertEqual(updated_to_do.completed, True)
            self.assertEqual(response.json["message"], "To-Do updated")
            self.assertEqual(response.status_code, 200)

    def test_update_to_do_key_error(self):
        try:
            self.api.put(f"/to-dos/update", json={"firebaseUid": self.user_firebase_uid, "toDoId": self.to_do_id})
        except:
            self.assertRaises(KeyError)