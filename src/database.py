from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class RecipeTags(db.Model):
    __tablename__ = 'recipe_tags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)
    recipes = db.relationship('Recipe', backref='tag')


class Recipe(db.Model):
    __tablename__ = 'recipe'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False, index=True)
    calories_count = db.Column(db.Integer, nullable=False, index=True)
    cooking_time = db.Column(db.Integer, nullable=False, index=True)
    url = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())
    tag_id = db.Column(db.Integer, db.ForeignKey('recipe_tags.id'))
    thumbnail = db.Column(db.LargeBinary)
