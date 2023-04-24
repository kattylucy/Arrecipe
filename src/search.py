from flask import Blueprint, request, jsonify
from src.database import Recipe
from src.utils import get_recipe_dict
from src.const.status_code import HTTP_200_OK

search = Blueprint("search", __name__, url_prefix='/api/v1/search')


@search.route('/', methods=['GET'])
def search_recipe():
    query = request.args.get('query', '').lower()
    recipes = Recipe.query.filter(Recipe.name.ilike(f'%{query}%')).all()

    recipe_list = [get_recipe_dict(recipe) for recipe in recipes]

    return jsonify({'data': recipe_list}), HTTP_200_OK
