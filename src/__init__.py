from flask import Flask
from src.recipe import recipe
from src.database import db
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask_uploads import UploadSet, IMAGES, configure_uploads
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
    Migrate(app, db)
    db.app = app
    db.init_app(app)

    # Flask-Uploads
    photos = UploadSet('photos', IMAGES)
    configure_uploads(app, photos)

    # blueprints
    app.register_blueprint(recipe)

    with app.app_context():
        # Create default tags if they don't exist
        from src.database import RecipeTags
        default_tags = ['main_dish', 'side_dish', 'dessert', 'drinks']
        for tag_name in default_tags:
            tag = RecipeTags.query.filter_by(name=tag_name).first()
            if not tag:
                tag = RecipeTags(name=tag_name)
                db.session.add(tag)
        db.session.commit()

    return app
