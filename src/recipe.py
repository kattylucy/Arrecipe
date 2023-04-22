from flask import Blueprint, request, jsonify
from src.database import Recipe, RecipeTags, db
from src.const.status_code import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR
import base64
import ipdb

recipe = Blueprint("recipe", __name__, url_prefix='/api/v1/recipes')


@recipe.get('/')
def get_all():
    recipes = Recipe.query.options(db.joinedload(Recipe.tag)).all()
    recipe_list = []
    for recipe in recipes:

        if recipe.thumbnail is None:
            thumbnail = None
        else:
            thumbnail = base64.b64encode(recipe.thumbnail).decode('utf-8')

        recipe_data = {
            'calories_count': recipe.calories_count,
            'cooking_time': recipe.cooking_time,
            'created_at': recipe.created_at,
            'id': recipe.id,
            'name': recipe.name,
            'tag': recipe.tag.name,
            'url': recipe.url,
            'thumbnail': thumbnail
        }
        recipe_list.append(recipe_data)

    return jsonify({'data': recipe_list}), HTTP_200_OK


@ recipe.post('/create')
def create():
    calories_count = request.form.get('calories_count')
    cooking_time = request.form.get('cooking_time')
    name = request.form.get('name')
    tag_name = request.form.get('tag')
    url = request.form.get('url')
    thumbnail = request.files['thumbnail']

    # Get the RecipeTag object by name or create it if it doesn't exist
    tag = RecipeTags.query.filter_by(name=tag_name).first()
    if tag is None:
        tag = RecipeTags(name=tag_name)
        db.session.add(tag)

    recipe = Recipe(name=name, calories_count=calories_count,
                    cooking_time=cooking_time, tag=tag, url=url, thumbnail=thumbnail.read())

    try:
        db.session.add(recipe)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        # Handle the exception, e.g., return an error response
        return jsonify({
            'status_code': 500,
            'message': 'Internal Server Error'
        }), HTTP_500_INTERNAL_SERVER_ERROR

     # Return a success response
    return jsonify({
        'status_code': 200,
        'message': 'Recipe created successfully'
    }), HTTP_200_OK
