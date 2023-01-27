from .firebase import firebase_auth

class FirebaseAuthClient:
    def __init__(self):
        self.firebase_auth_client = firebase_auth


class FirebaseSignInEmailPassword(FirebaseAuthClient):
    def __init__(self):
        super().__init__()

    def sign_in(self, email: str, password: str) -> dict:
        auth = self.firebase_auth_client.sign_in_with_email_and_password(email=email, password=password)
        return auth