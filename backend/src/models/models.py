from sqlalchemy.orm import backref
from datetime import datetime

from .db import db


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    firebase_uid = db.Column(db.String(128), nullable=False, unique=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    email_verified = db.Column(db.Boolean, default=False)
    first_name = db.Column(db.String(30), nullable=True)
    last_name = db.Column(db.String(30), nullable=True)
    profile_picture = db.Column(db.String(256), nullable=True)
    profile_picture_blob_name = db.Column(db.String(256), nullable=True)
    todos = db.relationship("ToDo", uselist=True, cascade = "all, delete", order_by="desc(ToDo.id)", backref=backref("user", uselist=False), lazy=True)
    
class ToDo(db.Model):
    __tablename__ = "to_do"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_firebase_uid = db.Column(db.String(128), db.ForeignKey('user.firebase_uid'), nullable=False)
    task = db.Column(db.String(256), nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    deleted = db.Column(db.Boolean, nullable=False, default=True)