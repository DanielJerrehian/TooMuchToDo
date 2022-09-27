import unittest
import os

from ..client import ApiClient
from src.models.models import db, User
from src.auth.firebase_auth import DeleteFirebaseAuthUser
from src.utils.google.firebase import firebase_auth


class TestRegister(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.new_user = {"email": "new@user.com", "password": "Password"}

    def tearDown(self):
        with self.api.app.app_context():
            auth = firebase_auth.sign_in_with_email_and_password(email=self.new_user["email"], password=self.new_user["password"])
            delete = DeleteFirebaseAuthUser(user_id_token=auth["idToken"])
            delete.run_request()
            delete.convert_response_to_json()
            user = User.query.filter(User.email == self.new_user["email"]).first()
            if user:
                db.session.delete(user)
                db.session.commit()

    def test_register_201(self):
        with self.api.app.app_context():
            response = self.api.post("/register", json=self.new_user)
            self.assertEqual(response.json["message"], "User successfully created")
            self.assertEqual(response.status_code, 201)

    def test_register_409(self):
        """"Create user with test E-Mail, then try to create them again"""
        with self.api.app.app_context():
            self.api.post("/register", json=self.new_user)
            response = self.api.post("/register", json=self.new_user)
            self.assertEqual(response.json["message"], "A user with that E-Mail already exists")
            self.assertEqual(response.status_code, 409)


class TestLogin(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.user = {"email": "test@user.com", "password": "Password"}

    def tearDown(self):
        pass

    def test_login_400(self):
        with self.api.app.app_context():
            response = self.api.post("/login", json={"email": "this-user-doesn't-exist"})
            self.assertEqual(response.json["message"], "No user found with that E-Mail")
            self.assertEqual(response.status_code, 400)

    def test_login_401_passwords_match_false(self):
        with self.api.app.app_context():
            response = self.api.post("/login", json={"email": self.user["email"], "password": "not-the-password"})
            self.assertEqual(response.json["message"], "Password incorrect")
            self.assertEqual(response.status_code, 401)

    def test_login_200(self):
        with self.api.app.app_context():
            response = self.api.post("/login", json={"email": os.environ["VERIFIED_USER_EMAIL"], "password": os.environ["VERIFIED_USER_PASSWORD"]})
            self.assertEqual(response.json["user"]["email"], os.environ["VERIFIED_USER_EMAIL"])
            self.assertTrue(response.json["user"]["firebaseUid"])
            self.assertEqual(response.json["user"]["firstName"], "Daniel")
            self.assertEqual(response.json["user"]["lastName"], "Jerrehian")
            self.assertEqual(response.json["user"]["profilePicture"], None)
            self.assertEqual(response.json["user"]["profilePictureBlobName"], None)
            self.assertEqual(response.headers["Set-Cookie"].split("=")[0], "refreshToken")
            self.assertEqual(response.status_code, 200)

    def test_login_verify_email_401(self):
        with self.api.app.app_context():
            response = self.api.post("/login", json=self.user)
            self.assertEqual(response.json["message"], "Please verify your E-Mail via the link sent to your inbox before logging in (it may have landed in your spam folder)")
            self.assertEqual(response.status_code, 401)

    def test_login_200_email_verified_on_firebase_not_db(self):
        with self.api.app.app_context():
            user = User.query.filter_by(email = os.environ["VERIFIED_USER_EMAIL"]).first()
            user.email_verified = False
            db.session.commit()
            response = self.api.post("/login", json=self.user)
            response = self.api.post("/login", json={"email": os.environ["VERIFIED_USER_EMAIL"], "password": os.environ["VERIFIED_USER_PASSWORD"]})
            self.assertEqual(response.json["user"]["email"], os.environ["VERIFIED_USER_EMAIL"])
            self.assertTrue(response.json["user"]["firebaseUid"])
            self.assertEqual(response.json["user"]["firstName"], "Daniel")
            self.assertEqual(response.json["user"]["lastName"], "Jerrehian")
            self.assertEqual(response.json["user"]["profilePicture"], None)
            self.assertEqual(response.json["user"]["profilePictureBlobName"], None)
            self.assertEqual(response.headers["Set-Cookie"].split("=")[0], "refreshToken")
            self.assertEqual(response.status_code, 200)


class TestLogout(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.user = {"email": "some@user.com", "password": "Password"}

    def tearDown(self):
        pass

    def test_logout_200(self):
        response = self.api.get("/logout")
        self.assertEqual(response.json["message"], "User logged out")
        self.assertTrue(response.headers["Set-Cookie"])
        self.assertTrue(response.headers["Set-Cookie"].split("Expires")[0])
        self.assertEqual(response.status_code, 200)


class TestRefreshToken(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.user = {"email": "test@user.com", "password": "Password"}

    def tearDown(self):
        pass

    def test_refresh_token_200(self):
        with self.api.app.app_context():
            auth = firebase_auth.sign_in_with_email_and_password(email=self.user["email"], password=self.user["password"])
            self.api.client.set_cookie(server_name="localhost", key="refreshToken", value=auth["refreshToken"])
            response = self.api.get("/refresh-token")
            self.assertEqual(response.json["user"]["email"], self.user["email"])
            self.assertTrue(response.json["user"]["firebaseUid"])
            self.assertEqual(response.json["user"]["firstName"], "Test")
            self.assertEqual(response.json["user"]["lastName"], "User")
            self.assertEqual(response.json["user"]["profilePicture"], None)
            self.assertEqual(response.json["user"]["profilePictureBlobName"], None)
            self.assertTrue(response.json["idToken"])
            self.assertEqual(response.status_code, 200)

    def test_refresh_token_400(self):
        with self.api.app.app_context():
            response = self.api.get("/refresh-token")
            self.assertEqual(response.json["message"], "No refresh token provided")
            self.assertEqual(response.status_code, 400)
            

class TestResetPassword(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.new_user = {"email": "new@user.com", "password": "Password"}
        self.api.post("/register", json=self.new_user)
    
    def tearDown(self):
        with self.api.app.app_context():
            auth = firebase_auth.sign_in_with_email_and_password(email=self.new_user["email"], password=self.new_user["password"])
            delete = DeleteFirebaseAuthUser(user_id_token=auth["idToken"])
            delete.run_request()
            delete.convert_response_to_json()
            user = User.query.filter(User.email == self.new_user["email"]).first()
            if user:
                db.session.delete(user)
                db.session.commit()
        
    def test_reset_password_200(self):
        with self.api.app.app_context():
            response = self.api.get(f"/reset-password/{self.new_user['email']}")
            self.assertEqual(response.json["message"], f"Password reset E-Mail sent to {self.new_user['email']}")
            self.assertEqual(response.status_code, 200)
        
    def test_reset_password_401(self):
        with self.api.app.app_context():
            response = self.api.get(f"/reset-password/random-string-that's-not-an-email")
            self.assertEqual(response.json["message"], "Invalid E-Mail")
            self.assertEqual(response.status_code, 401)
            
        