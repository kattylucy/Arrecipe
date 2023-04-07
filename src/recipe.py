from flask import Blueprint, request, jsonify, url_for
from src.database import Recipe, RecipeTags, db
from src.const.status_code import HTTP_400_BAD_REQUEST, HTTP_200_OK

recipe = Blueprint("recipe", __name__, url_prefix='/api/v1/recipes')


@recipe.get('/')
def get_all():
    recipes = Recipe.query.options(db.joinedload(Recipe.tag)).all()
    recipe_list = [{
        'calories_count': recipe.calories_count,
        'cooking_time': recipe.cooking_time,
        'created_at': recipe.created_at,
        'id': recipe.id,
        'name': recipe.name,
        'tag': recipe.tag.name,
        'thumbnail': url_for('photos', filename=recipe.thumbnail),
        'url': recipe.url
    } for recipe in recipes]
    return jsonify({'data': recipe_list}), HTTP_200_OK


@recipe.post('/create')
def create():
    calories_count = request.json['calories_count']
    cooking_time = request.json['cooking_time']
    name = request.json['name']
    tag_name = request.json['tag']
    thumbnail = request.files['thumbnail']
    url = request.json['url']

    # Validate the thumbnail file extension
    if thumbnail.filename.split('.')[-1].lower() != 'jpg':
        return jsonify({
            'status_code': 400,
            'message': 'Only JPG images are allowed'
        }), HTTP_400_BAD_REQUEST

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
        db
