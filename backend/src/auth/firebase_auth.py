import os
import requests
from firebase_admin.auth import verify_id_token

from ..models.models import User

class FirebaseAuth:
    def __init__(self):
        self.firebase_api_key = os.environ.get("FIREBASE_API_KEY")
        self.response = None


class RefreshFirebaseIdToken(FirebaseAuth):
    def __init__(self, user_refresh_token: str = None):
        super().__init__()
        self.user_refresh_token = user_refresh_token
        self.endpoint = f"https://securetoken.googleapis.com/v1/token?key={self.firebase_api_key}"
        self.payload_body = {"grant_type": "refresh_token"}
        self.user_object = None
        
    def create_payload_body(self):
        self.payload_body["refresh_token"] = self.user_refresh_token
        
    def run_request(self):
        self.response = requests.post(url=self.endpoint, json=self.payload_body)
        
    def convert_response_to_json(self):
        self.response = self.response.json()
        
    def get_user_object(self):
        user = verify_id_token(id_token=self.response["id_token"])
        self.user_object = User.query.filter(User.email == user["email"]).first()
        

class DeleteFirebaseAuthUser(FirebaseAuth):
    def __init__(self, user_id_token: str = None):
        super().__init__()
        self.endpoint = f"https://identitytoolkit.googleapis.com/v1/accounts:delete?key={self.firebase_api_key}"
        self.payload_body = {"idToken": user_id_token}

    def run_request(self):
        self.response = requests.post(url=self.endpoint, json=self.payload_body)
        
    def convert_response_to_json(self):
        self.response = self.response.json()
    
    