import unittest
from flask import Flask
import os

from src.app import create_app, configure_app


class TestLogout(unittest.TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_create_app(self):
        app = create_app(environment="development")
        self.assertTrue(app)
        self.assertEqual(app.config["DEBUG"], True)
        self.assertEqual(app.config["ENV"], "development")
        self.assertEqual(app.config["SQLALCHEMY_DATABASE_URI"], "sqlite:///development-database.db")

    def test_configure_app_test(self):
        app = Flask(__name__)
        config = configure_app(app=app, environment="test")
        self.assertEqual(config.config["DEBUG"], True)
        self.assertEqual(config.config["ENV"], "development")
        self.assertEqual(config.config["SQLALCHEMY_DATABASE_URI"], "sqlite:///test-database.db")

    def test_configure_app_development(self):
        app = Flask(__name__)
        config = configure_app(app=app, environment="development")
        self.assertEqual(config.config["DEBUG"], True)
        self.assertEqual(config.config["ENV"], "development")
        self.assertEqual(config.config["SQLALCHEMY_DATABASE_URI"], "sqlite:///development-database.db")

    def test_configure_app_production(self):
        app = Flask(__name__)
        config = configure_app(app=app, environment="production")
        self.assertEqual(config.config["DEBUG"], False)
        self.assertEqual(config.config["ENV"], "production")
        self.assertEqual(config.config["SQLALCHEMY_DATABASE_URI"], os.environ["DATABASE_URI_PRODUCTION"])