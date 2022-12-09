import unittest

from ..client import ApiClient
from src.models.models import User


class TestVerifyFirebaseIdToken(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        with self.api.app.app_context():
            self.user = User.query.filter(User.email == "test@user.com").first()
            self.api = ApiClient(user=self.user)

    def tearDown(self):
        pass

    # def test_expired_id_token_error(self):
    #     self.api.add_expired_firebase_token()
    #     response = self.api.get(f"/to-dos/{self.user.firebase_uid}")
    #     self.assertEqual(response.json["message"], "Token expired")
    #     self.assertEqual(response.status_code, 403)

    def test_invalid_id_token_error(self):
        self.api.add_fake_firebase_token()
        response = self.api.get(f"/to-dos/{self.user.firebase_uid}")
        self.assertEqual(response.json["message"], "Invalid token")
        self.assertEqual(response.status_code, 400)
    
    def test_valid_id_token(self):
        with self.api.app.app_context():
            self.user_firebase_uid = User.query.filter(User.email == self.user.email).first().firebase_uid
            self.api.add_firebase_token()
            response = self.api.get(f"/to-dos/{self.user.firebase_uid}")
            self.assertEqual(response.status_code, 200)