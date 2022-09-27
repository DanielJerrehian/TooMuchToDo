import unittest
from src.models.models import db, User, ToDo

from ..client import ApiClient


class TestPublic(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.user = {"email": "test@user.com", "password": "Password"}
        with self.api.app.app_context():
            self.user = User.query.filter(User.email == self.user["email"]).first()
            self.user_firebase_uid = self.user.firebase_uid
            self.api = ApiClient(user=self.user)
            db.session.add(ToDo(user_firebase_uid=self.user.firebase_uid, task="Unit Test 1", completed=True, deleted=False))
            db.session.add(ToDo(user_firebase_uid=self.user.firebase_uid, task="Unit Test 2", completed=False, deleted=False))
            db.session.commit()

    def tearDown(self):
        with self.api.app.app_context():
            to_dos = ToDo.query.filter_by(user_firebase_uid = self.user_firebase_uid).all()
            if to_dos:
                for to_do in to_dos:
                    db.session.delete(to_do)
                db.session.commit()
            
    def test_get_index(self):
        with self.api.app.app_context():
            response = self.api.get(url="/")
            self.assertEqual(response.json["message"], "Thanks for visiting the Too Much To Do API! Documentation coming soon...")

    def test_get_site_statistics(self):
        with self.api.app.app_context():
            response = self.api.get(url="/site-statistics")
            self.assertTrue(response.json["stats"]["totalUsers"])
            self.assertTrue(response.json["stats"]["totalToDos"])
            self.assertTrue(response.json["stats"]["totalCompletedToDos"])
            self.assertEqual(response.status_code, 200)