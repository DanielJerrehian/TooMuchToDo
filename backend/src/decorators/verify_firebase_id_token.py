from flask import request
from functools import wraps
from firebase_admin.auth import verify_id_token, ExpiredIdTokenError


def verify_firebase_id_token(f):
    @wraps(f)
    def wrap(*args,**kwargs):
        if not request.headers.get("Authorization"):
            return {"message": "No token provided"}, 400
        try:
            id_token = request.headers["Authorization"]
            user = verify_id_token(id_token=id_token)
            request.user = user
        except ExpiredIdTokenError:
            return {"message": "Token expired"}, 403
        except:
            return {"message": "Invalid token"}, 400
        return f(*args, **kwargs)
    return wrap