from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class RecipeTags(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    calories_count = db.Column(db.Integer)
    cooking_time = db.Column(db.Integer)
    url = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())
    tag_id = db.Column(db.Integer, db.ForeignKey('recipe_tags.id'))
    tag = db.relationship('RecipeTags', backref='recipes')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def __repr__(self) -> str:
        return 'Recipe>>> {self.name}'


if __name__ == '__main__':
    db.create_all()

    # Add default tags
    default_tags = ['main dish', 'side dish', 'dessert', 'drinks']
    for tag_name in default_tags:
        tag = RecipeTags(name=tag_name)
        db.session.add(tag)

    db.session.commit()
