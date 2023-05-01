from flask import Blueprint, request, jsonify, current_app
from src.database import Recipe, RecipeTags, db
from src.utils import get_recipe_dict
from src.const.status_code import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

recipe = Blueprint("recipe", __name__, url_prefix='/api/v1/recipes')

@recipe.get('/')
def get_all():
    query = request.args.get('query', '').lower()
    calories_count = request.args.get('calories_count', '').lower()
    cooking_time = request.args.get('cooking_time', '').lower()
    tags = request.args.get('tags', '').lower()
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))

    recipes = Recipe.query

    if query:
        recipes = recipes.filter(Recipe.name.ilike(f'%{query}%'))

    if calories_count:
        calories_count_int = int(calories_count)
        recipes = recipes.filter(Recipe.calories_count <= calories_count_int)

    if cooking_time:
        cooking_time_int = int(cooking_time)
        recipes = recipes.filter(Recipe.cooking_time == cooking_time_int)

    if tags:
        tags = tags.split(',')
        tag_ids = [tag.id for tag in RecipeTags.query.filter(
            RecipeTags.name.in_(tags)).all()]
        recipes = recipes.filter(Recipe.tag_id.in_(tag_ids))

    total_count = recipes.count()
    recipes = recipes.options(db.joinedload(Recipe.tag)).offset((page-1)*limit).limit(limit).all()
    recipe_list = [get_recipe_dict(recipe) for recipe in recipes]

    return jsonify({'data': recipe_list, 'total': {'total_count': total_count, 'page': page, 'limit': limit}}), HTTP_200_OK


@recipe.post('/create')
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
