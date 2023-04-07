from flask import Blueprint, request, jsonify
from src.database import Recipe, RecipeTags, db
from src.const.status_code import HTTP_201_CREATED, HTTP_200_OK

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
            'url': recipe.url
        })
    return jsonify({'data': recipe_list}), HTTP_201_CREATED


@recipe.post('/create')
def create():
    name = request.json['name']
    calories_count = request.json['calories_count']
    cooking_time = request.json['cooking_time']
    url = request.json['url']

    recipe = Recipe(name=name, calories_count=calories_count,
                    cooking_time=cooking_time, url=url)
    db.session.add(recipe)
    db.session.commit()

    return jsonify({
        'status_code': 200,
        'message': 'Recipe was created'
    }), HTTP_201_CREATED
