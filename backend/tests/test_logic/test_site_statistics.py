import unittest

from ..client import ApiClient
from src.models.models import db, User, ToDo
from src.logic.site_statistics.site_statistics import SiteStatistics


class TestSiteStatistics(unittest.TestCase):
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

    def test_class_object_exists(self):
        self.assertTrue(SiteStatistics)

    def test_get_total_users(self):
        with self.api.app.app_context():
            total_users = SiteStatistics().get_total_users()
            self.assertTrue(total_users)

    def test_get_total_to_dos(self):
        with self.api.app.app_context():
            total_to_dos = SiteStatistics().get_total_to_dos()
            self.assertTrue(total_to_dos)

    def test_get_total_completed_todos(self):
        with self.api.app.app_context():
            total_completed_to_dos = SiteStatistics().get_total_completed_to_dos()
            self.assertTrue(total_completed_to_dos)