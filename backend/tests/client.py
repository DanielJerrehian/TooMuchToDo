from src.app import create_app
from src.utils.google.firebase import firebase_auth


class ApiHeaders:
    def __init__(self, user:object=None, user_non_hashed_password:str="Password", content_type:str="application/json"):
        self.user = user
        self.user_non_hashed_password = user_non_hashed_password
        self.headers = {
            "Accept": "application/json",
            "Content-Type": content_type,
        }

    def add_firebase_token(self):
        auth = firebase_auth.sign_in_with_email_and_password(email=self.user.email, password=self.user_non_hashed_password)
        self.headers["Authorization"] = auth["idToken"],

    def add_expired_firebase_token(self):
        self.headers["Authorization"] = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkMjNmMzc0MDI1ZWQzNTNmOTg0YjUxMWE3Y2NlNDlhMzFkMzFiZDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdG8tZG8tbGlzdC1yZWR1eCIsImF1ZCI6InRvLWRvLWxpc3QtcmVkdXgiLCJhdXRoX3RpbWUiOjE2NjI4OTIzNjAsInVzZXJfaWQiOiI4RmRVaVpESjdPUG1ad1I0YkFQb2szeldNRlIyIiwic3ViIjoiOEZkVWlaREo3T1BtWndSNGJBUG9rM3pXTUZSMiIsImlhdCI6MTY2Mjg5MjM2MCwiZXhwIjoxNjYyODk1OTYwLCJlbWFpbCI6ImRhbmllbGplcnJlaGlhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZGFuaWVsamVycmVoaWFuQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.p_rbzN1hImyfUL8aJsN7QkVW70dh7YhCyym0vOFHp8EaQFYYExoUxpn6r1foSsjS7Paz-2gKuwZFCeqMCWTzplkbXemiQhOBiLN27uouHH_xRRhpFJNYdO-hyl4GpYKuODG2EIhY6BBZub0vSIto3koJ1Pyp64HMwrjxUBpw-FVM-RieXJQPSx-I8b6ldTRzPaxQ3VDRDkVvJk_YnhVuZuWbU0EjNlmIhJQu9XYT1RZyw5-vFUlLtzsV3BPcWZ6yHUUTaoxmagtOcSECFb2paYRpTsN4OOjW29UKUtoSZp1wVTgPujLa3mRKp62r-hPw5ROy16Aq_wbvOKKaaLbtiA"
    
    def add_fake_firebase_token(self):
        self.headers["Authorization"] = "fakeToken"

        
class ApiClient(ApiHeaders):
    def __init__(self, user:object=None, content_type:str="application/json"):
        super().__init__(user=user, content_type=content_type)
        self.app = create_app(environment="test")
        self.app.config.update({"TESTING": True})
        self.client_with_cookies = self.app.test_client
        self.client = self.app.test_client()

    def get(self, url, **kwargs):
        return self.client.get(url, headers=self.headers, **kwargs)

    def post(self, url, **kwargs):
        return self.client.post(url, headers=self.headers, **kwargs)

    def put(self, url, **kwargs):
        return self.client.put(url, headers=self.headers, **kwargs)

    def delete(self, url, **kwargs):
        return self.client.delete(url, headers=self.headers, **kwargs)