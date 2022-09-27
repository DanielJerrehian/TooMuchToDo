from flask import Blueprint, request, make_response, current_app
from requests.exceptions import HTTPError

from ..models.models import db, User
from ..models.marshmallow.schemas.ma_schemas import UserSchema
from ..utils.google.firebase import firebase_auth
from ..auth.firebase_auth import RefreshFirebaseIdToken
from ..logic.user import UpdateUserProfile


auth = Blueprint("auth", __name__)

@auth.post("/register")
def register():
    data = request.json
    email = data["email"].lower()
    existing_user = User.query.filter(User.email == email).first()
    if existing_user:
        return {"message": "A user with that E-Mail already exists"}, 409
    firebase_user = firebase_auth.create_user_with_email_and_password(email=email, password=data["password"])
    firebase_auth.send_email_verification(firebase_user["idToken"])
    user = User(email=email, firebase_uid=firebase_user["localId"])
    db.session.add(user)
    db.session.commit()
    return {"message": "User successfully created"}, 201

@auth.post("/login")
def login():
    data = request.json
    user = User.query.filter(User.email == data["email"]).first()
    if not user:
        return {"message": "No user found with that E-Mail"}, 400
    try:
        auth = firebase_auth.sign_in_with_email_and_password(email=data["email"], password=data["password"])
    except HTTPError:
        return {"message": "Password incorrect"}, 401
    firebase_user_account_info = firebase_auth.get_account_info(id_token=auth["idToken"])
    if firebase_user_account_info["users"][0]["emailVerified"] == False:
        return {"message": "Please verify your E-Mail via the link sent to your inbox before logging in (it may have landed in your spam folder)"}, 401
    if not user.email_verified:
        update = UpdateUserProfile(user_firebase_id=user.firebase_uid)
        update.update_profile(update_attributes={"email_verified": True})
        update.commit()
    response = make_response({"user": UserSchema(exclude=["todos"]).dump(user), "idToken": auth["idToken"]})
    if current_app.config.get("ENV") == "production":
        response.set_cookie(key="refreshToken", value=auth["refreshToken"], httponly=True, secure=True)
    else:
        response.set_cookie(key="refreshToken", value=auth["refreshToken"], domain="127.0.0.1", httponly=True, secure=True)
    return response, 200

@auth.get("/logout")
def logout():
    response = make_response({"message": "User logged out"})
    response.set_cookie(key="refreshToken", value="", domain="127.0.0.1", httponly=True, secure=True, expires=0)
    return response, 200
  
@auth.get("/refresh-token")
def refresh_access_token():
    user_refresh_token = request.cookies.get("refreshToken", None)
    if not user_refresh_token:
        return {"message": "No refresh token provided"}, 400
    refresh = RefreshFirebaseIdToken(user_refresh_token=user_refresh_token)
    refresh.create_payload_body()
    refresh.run_request()
    refresh.convert_response_to_json()
    refresh.get_user_object()
    return {"user": UserSchema(exclude=["todos"]).dump(refresh.user_object), "idToken": refresh.response["id_token"]}, 200

@auth.get("/reset-password/<string:email>")
def reset_password(email):
    try:
        firebase_auth.send_password_reset_email(email)
        return {"message": f"Password reset E-Mail sent to {email}"}, 200
    except Exception:
        return {"message": "Invalid E-Mail"}, 401