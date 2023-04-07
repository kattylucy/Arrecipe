from flask import Blueprint, request, jsonify, url_for
from src.database import Recipe, RecipeTags, db
from src.const.status_code import HTTP_201_CREATED, HTTP_200_OK
from src.__init__ import photos

recipe = Blueprint("recipe", __name__, url_prefix='/api/v1/recipes')


@recipe.get('/')
def get_all():
    recipes = Recipe.query.join(RecipeTags).all()
    recipe_list = []
    for recipe in recipes:
        recipe_list.append({
            'calories_count': recipe.calories_count,
            'cooking_time': recipe.cooking_time,
            'created_at': recipe.created_at,
            'id': recipe.id,
            'name': recipe.name,
            'tag': recipe.tag.name,
            'thumbnail': url_for('photos', filename=recipe.thumbnail),
            'url': recipe.url
        })
    return jsonify({'data': recipe_list}), HTTP_200_OK


@recipe.post('/create')
def create():
    calories_count = request.json['calories_count']
    cooking_time = request.json['cooking_time']
    name = request.json['name']
    tag_name = request.json['tag']
    thumbnail = request.files['thumbnail']
    url = request.json['url']

    filename = photos.save(thumbnail)

    # Get the RecipeTag object by name or create it if it doesn't exist
    tag = RecipeTags.query.filter_by(name=tag_name).first()

    recipe = Recipe(name=name, calories_count=calories_count,
                    cooking_time=cooking_time, tag=tag, thumbnail=filename, url=url)
    db.session.add(recipe)
    db.session.commit()

    return jsonify({
        'status_code': 200,
        'message': 'Recipe was created'
    }), HTTP_201_CREATED
