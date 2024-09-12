from flask import Flask
from dotenv import load_dotenv
import os

from .network.cors import cors
from .models.db import db
from .models.marshmallow.ma import ma
from .models.migrate import migrate

from .routes.auth import auth
from .routes.to_do import to_do
from .routes.user import user
from .routes.public import public


def create_app(environment: str = "production"):
    app = Flask(__name__)

    load_dotenv(dotenv_path=".env")

    app = configure_app(app=app, environment=environment)

    cors.init_app(app)
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db, render_as_batch=True)

    app.register_blueprint(blueprint=auth)
    app.register_blueprint(blueprint=to_do)
    app.register_blueprint(blueprint=user)
    app.register_blueprint(blueprint=public)

    return app


def configure_app(app: object = None, environment: str = "development"):
    if environment == "production":
        app.config["ENV"] = "production"
        app.config["DEBUG"] = False
    else:
        app.config["ENV"] = "development"
        app.config["DEBUG"] = True

    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
    app.config["CORS_HEADERS"] = "Content-Type"
    app.config["CORS_ORIGINS"] = ["*"]
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(f"DATABASE_URI_{environment.upper()}")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SESSION_COOKIE_SECURE"] = True

    return app
