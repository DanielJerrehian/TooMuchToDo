from src.app import create_app
from src.utils.google.firebase import firebase_auth


class ApiHeaders:
    def __init__(self, user:object=None, user_non_hashed_password:str="Password", content_type:str="application/json"):
        self.user = user
        self.user_non_hashed_password = user_non_hashed_password
        self.headers = {"Accept": "application/json", "Content-Type": content_type}

    def add_firebase_token(self):
        auth = firebase_auth.sign_in_with_email_and_password(email=self.user.email, password=self.user_non_hashed_password)
        self.headers["Authorization"] = auth["idToken"],

    def add_expired_firebase_token(self):
        self.headers["Authorization"] = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4MDljZmYxMTZlNWJhNzQwNzQ1YmZlZGE1OGUxNmU4MmYzZmQ4MDUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdG8tZG8tbGlzdC1yZWR1eCIsImF1ZCI6InRvLWRvLWxpc3QtcmVkdXgiLCJhdXRoX3RpbWUiOjE2NjkwNDMxMDYsInVzZXJfaWQiOiI4Qk9XN1VtVnRJV0NLcUZIZHB4MlFWeVd3RXExIiwic3ViIjoiOEJPVzdVbVZ0SVdDS3FGSGRweDJRVnlXd0VxMSIsImlhdCI6MTY2OTA0MzEwNiwiZXhwIjoxNjY5MDQ2NzA2LCJlbWFpbCI6InRlc3RAdXNlci5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB1c2VyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.LLx-q7B1iBjSbNYhMw8ARMn7nyvkPhsuCsHHG3tacqkFMjk3rvwmvSRsD6Ac5k9HtsvxRWY7erZjxz2-OmdP0X-Dh49-5ts9r3pxQEdEyWD8I5RfcsGsRHxhsJOXQ7HGu7_vHmlN9IYotHfILorMur-pVAz-rgTMIpryElcnKZu4i1be3FES-YWshaujZ0_6jJ1FYXAqkm7-bXH-c4hkbL_ulCrNAvrvjRxMSvlxoc-UIeyMNiUyj-nZF__OBuYELf7ZyKT77PUVnlfmi_EDGoCE3A2mK2JHSAmWI7il-Pd5WI4g3-AO3_k0epY_fxANXuCpsp2-pKcoEnfNs9FyeQ"
    
    def add_fake_firebase_token(self):
        self.headers["Authorization"] = "fakeToken"

        
class ApiClient(ApiHeaders):
    def __init__(self, user:object=None, content_type:str="application/json"):
        super().__init__(user=user, content_type=content_type)
        self.app = create_app(environment="test")
        self.app.config.update({"TESTING": True})
        self.client_with_cookies = self.app.test_client
        self.client = self.app.test_client()

    def get(self, url: str, firebase_token: str = None, **kwargs) -> dict:
        if firebase_token:
            self.headers["Authorization"] = firebase_token
        return self.client.get(url, headers=self.headers, **kwargs)

    def post(self, url: str, firebase_token: str = None, **kwargs) -> dict:
        if firebase_token:
            self.headers["Authorization"] = firebase_token
        return self.client.post(url, headers=self.headers, **kwargs)

    def put(self, url, firebase_token: str = None, **kwargs) -> dict:
        if firebase_token:
            self.headers["Authorization"] = firebase_token
        return self.client.put(url, headers=self.headers, **kwargs)

    def delete(self, url, firebase_token: str = None, **kwargs) -> dict:
        if firebase_token:
            self.headers["Authorization"] = firebase_token
        return self.client.delete(url, headers=self.headers, **kwargs)