import os
import requests
from firebase_admin.auth import verify_id_token

from ..models.models import User


class FirebaseAuth:
    def __init__(self):
        self.firebase_api_key = os.environ.get("FIREBASE_API_KEY")


class RefreshFirebaseIdToken(FirebaseAuth):
    def __init__(self, user_refresh_token: str):
        super().__init__()
        self.payload_body = {"grant_type": "refresh_token", "refresh_token": user_refresh_token}

    def fetch_new_id_token(self) -> dict:
        # print(self.payload_body)
        response = requests.post(
            url=f"https://securetoken.googleapis.com/v1/token?key={self.firebase_api_key}", data=self.payload_body
        ).json()
        return response

    def get_user_object(self, id_token: str) -> object:
        user = verify_id_token(id_token=id_token)
        return User.query.filter(User.email == user["email"]).first()


class DeleteFirebaseAuthUser(FirebaseAuth):
    def __init__(self):
        super().__init__()

    def delete(self, user_id_token: str) -> str:
        response = requests.post(
            url=f"https://identitytoolkit.googleapis.com/v1/accounts:delete?key={self.firebase_api_key}",
            json={"idToken": user_id_token},
        )
        return response.json()
