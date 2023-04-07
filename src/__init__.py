from flask import Flask
from src.recipe import recipe
from src.database import db
from flask_cors import CORS, cross_origin
import os


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, support_credentials=True)

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get("SECRET_KEY"),
            SQLALCHEMY_DATABASE_URI=os.environ.get("SQLALCHEMY_DB_URI"),
            SQLALCHEMY_TRACK_MODIFICATIONS=False,
        )

    else:
        app.config.from_mapping(test_config)

    # database
    db.app = app
    db.init_app(app)

    # blueprints
    app.register_blueprint(recipe)

    return app
