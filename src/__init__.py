from flask import Flask, jsonify, send_from_directory
from src.recipe import recipe
from src.database import db
from flask_cors import CORS
from flask_migrate import Migrate
from src.const.status_code import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND
import os


def create_app():
    app = Flask(__name__, static_folder='../client/dist')
    app.config['CORS_HEADERS'] = 'Content-Type'
    CORS(app)

    # Load configuration from environment variables
    app.config.from_mapping(
        SECRET_KEY=os.environ.get("SECRET_KEY"),
        SQLALCHEMY_DATABASE_URI=os.environ.get("SQLALCHEMY_DB_URI"),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        ENV=os.environ.get("FLASK_ENV", "production"),
    )

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)

    # Register blueprints
    app.register_blueprint(recipe)

    # Create default tags if they don't exist
    @app.before_first_request
    def create_default_tags():
        with app.app_context():
            from src.database import RecipeTags
            default_tags = ['main_dish', 'side_dish', 'dessert', 'drinks']
            for tag_name in default_tags:
                tag = RecipeTags.query.filter_by(name=tag_name).first()
                if not tag:
                    tag = RecipeTags(name=tag_name)
                    db.session.add(tag)
            db.session.commit()

    # Error handling
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Not found"}), HTTP_404_NOT_FOUND

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({"error": "Internal server error"}), HTTP_500_INTERNAL_SERVER_ERROR

    @app.route('/')
    @app.route('/<path:path>')
    def serve_static(path='index.html'):
        if os.path.isfile(app.static_folder + '/' + path):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app
