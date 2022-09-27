import unittest
import os
from io import BytesIO

from ..client import ApiClient
from src.models.models import db, User
from src.auth.firebase_auth import DeleteFirebaseAuthUser
from src.utils.google.firebase import firebase_auth


class TestUpdateProfile(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.new_user = {"email": "new@user.com", "password": "Password"}
        self.api.post("/register", json=self.new_user)
        with self.api.app.app_context():
            self.user = User.query.filter(User.email == self.new_user["email"]).first()
            self.api = ApiClient(user=self.user, content_type="multipart/form-data")

    def tearDown(self):
        with self.api.app.app_context():
            auth = firebase_auth.sign_in_with_email_and_password(email=self.new_user["email"], password=self.new_user["password"])
            delete = DeleteFirebaseAuthUser(user_id_token=auth["idToken"])
            delete.run_request()
            delete.convert_response_to_json()
            if self.user:
                db.session.delete(self.user)
                db.session.commit()
                
    def test_update_profile_200_change_email(self):
        self.api.add_firebase_token()
        response = self.api.put(f"/update-profile/{self.user.firebase_uid}", data={"email": "test-email-for-unittest@test.com"})
        with self.api.app.app_context():
            user = User.query.filter_by(email="test-email-for-unittest@test.com").first()
            self.assertEqual(user.email, "test-email-for-unittest@test.com")
            self.assertEqual(user.firebase_uid, self.user.firebase_uid)
            self.assertEqual(response.json["message"], "Profile updated successfully")
            self.assertEqual(response.status_code, 200)

    def test_update_profile_200_try_changing_firebase_uid(self):
        self.api.add_firebase_token()
        response = self.api.put(f"/update-profile/{self.user.firebase_uid}", data={"firebaseUid": "123456789"})
        with self.api.app.app_context():
            user = User.query.filter_by(email=self.new_user["email"]).first()
            self.assertEqual(user.email, self.new_user["email"])
            self.assertEqual(user.firebase_uid, self.user.firebase_uid)
            self.assertEqual(response.json["message"], "Nothing to update")
            self.assertEqual(response.status_code, 200)

    def test_update_profile_200_update_first_name(self):
        self.api.add_firebase_token()
        response = self.api.put(f"/update-profile/{self.user.firebase_uid}", data={"firstName": "Mr. Test"})
        with self.api.app.app_context():
            user = User.query.filter_by(email=self.new_user["email"]).first()
            self.assertEqual(user.first_name, "Mr. Test")
            self.assertEqual(user.firebase_uid, self.user.firebase_uid)
        self.assertEqual(response.json["message"], "Profile updated successfully")
        self.assertEqual(response.status_code, 200)

    def test_update_profile_200_update_first_name_last_name(self):
        data = {"firstName": "Mister", "lastName": "Testmeister"}
        self.api.add_firebase_token()
        response = self.api.put(f"/update-profile/{self.user.firebase_uid}", data=data)
        with self.api.app.app_context():
            user = User.query.filter_by(email=self.new_user["email"]).first()
            self.assertEqual(user.first_name, data["firstName"])
            self.assertEqual(user.last_name, data["lastName"])
            self.assertEqual(user.firebase_uid, self.user.firebase_uid)
        self.assertEqual(response.json["message"], "Profile updated successfully")
        self.assertEqual(response.status_code, 200)
        
    def test_update_profile_409_email_already_taken(self):
        data = {"email": "test@user.com", "firstName": "Mister", "lastName": "Testmeister"}
        self.api.add_firebase_token()
        response = self.api.put(f"/update-profile/{self.user.firebase_uid}", data=data)
        with self.api.app.app_context():
            user = User.query.filter_by(email=self.new_user["email"]).first()
            self.assertEqual(user.email, self.new_user["email"])
        self.assertEqual(response.json["message"], "That E-Mail is already taken by another user")
        self.assertEqual(response.status_code, 409)
    
    def test_update_profile_200_nothing_to_update(self):
        self.api.add_firebase_token()
        response = self.api.put(f"/update-profile/{self.user.firebase_uid}", data={})
        self.assertEqual(response.json["message"], "Nothing to update")
        self.assertEqual(response.status_code, 200)
        
    def test_update_profile_no_firebase_token(self):
        response = self.api.put(f"/update-profile/{self.user.firebase_uid}", data={"firstName": "Mister"})
        self.assertEqual(response.json["message"], "No token provided")
        self.assertEqual(response.status_code, 400)

    def test_update_profile_token_not_match(self):
        self.api.add_firebase_token()
        response = self.api.put("/update-profile/12345679", data={"firstName": "Mister"})
        self.assertEqual(response.json["message"], "Forbidden")
        self.assertEqual(response.status_code, 403)

    def test_update_profile_picture_no_previous_photo(self):
        self.api.add_firebase_token()
        image_file = os.path.join(self.api.app.root_path, "static", "Chlopig.jpg")
        with open(image_file, "rb") as image:
            image = BytesIO(image.read())
            data = {"profilePicture": (image, 'Chlopig.jpg')}
            response = self.api.put(f"/update-profile/{self.user.firebase_uid}", data=data)
        with self.api.app.app_context():
            user = User.query.filter_by(email=self.new_user["email"]).first()
            self.assertTrue(user.profile_picture)
            self.assertTrue(user.profile_picture_blob_name)
        self.assertEqual(response.json["message"], "Profile updated successfully")
        self.assertEqual(response.status_code, 200)

    def test_update_profile_picture_with_previous_photo(self):
        self.api.add_firebase_token()
        image_file = os.path.join(self.api.app.root_path, "static", "Chlopig.jpg")
        with open(image_file, "rb") as image:
            image = BytesIO(image.read())
            self.api.put(f"/update-profile/{self.user.firebase_uid}", data={"profilePicture": (image, 'Chlopig.jpg')})
        with open(image_file, "rb") as image:
            image = BytesIO(image.read())
            data = {"profilePicture": (image, 'Chlopig.jpg')}
        response = self.api.put(f"/update-profile/{self.user.firebase_uid}", data=data)
        with self.api.app.app_context():
            user = User.query.filter_by(email=self.new_user["email"]).first()
            self.assertTrue(user.profile_picture)
            self.assertTrue(user.profile_picture_blob_name)
        self.assertEqual(response.json["message"], "Profile updated successfully")
        self.assertEqual(response.status_code, 200)
        
        
class TestGetUser(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.user = {"email": "test@user.com", "password": "Password"}
        with self.api.app.app_context():
            self.user = User.query.filter(User.email == self.user["email"]).first()
            self.api = ApiClient(user=self.user)
            
    def tearDown(self):
        pass

    def test_get_200(self):
        self.api.add_firebase_token()
        response = self.api.get(f"/user/{self.user.firebase_uid}")
        self.assertEqual(response.json["user"]["email"], self.user.email)
        self.assertEqual(response.status_code, 200)

    def test_get_403(self):
        self.api.add_firebase_token()
        response = self.api.get(f"/user/123")
        self.assertEqual(response.json["message"], "Forbidden")
        self.assertEqual(response.status_code, 403)


class TestDeleteUser(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.new_user = {"email": "new@user.com", "password": "Password"}
        self.api.post("/register", json=self.new_user)
        with self.api.app.app_context():
            self.user = User.query.filter(User.email == self.new_user["email"]).first()
            self.api = ApiClient(user=self.user)

    def tearDown(self):
        with self.api.app.app_context():
            user = User.query.filter(User.email == self.new_user["email"]).first()
            if user:
                auth = firebase_auth.sign_in_with_email_and_password(email=self.new_user["email"], password=self.new_user["password"])
                delete = DeleteFirebaseAuthUser(user_id_token=auth["idToken"])
                delete.run_request()
                delete.convert_response_to_json()
                db.session.delete(user)
                db.session.commit()

    def test_delete_200(self):
        self.api.add_firebase_token()
        response = self.api.delete(f"/delete-user/{self.user.firebase_uid}")
        with self.api.app.app_context():
            user = User.query.filter_by(email = self.new_user["email"]).first()
            self.assertEqual(user, None)
        self.assertEqual(response.json["message"], "User deleted")
        self.assertEqual(response.status_code, 200)

    def test_delete_403(self):
        self.api.add_firebase_token()
        response = self.api.delete("/delete-user/123")
        with self.api.app.app_context():
            user = User.query.filter_by(email = self.new_user["email"]).first()
            self.assertTrue(user)
        self.assertEqual(response.json["message"], "Forbidden")
        self.assertEqual(response.status_code, 403)
