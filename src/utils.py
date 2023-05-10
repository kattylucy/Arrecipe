import base64

def get_thumbnail(thumbnail):
    return base64.b64encode(thumbnail).decode('utf-8')

def get_recipe_dict(recipe):
    recipe_dict = {
        'calories_count': recipe.calories_count,
        'cooking_time': recipe.cooking_time,
        'created_at': recipe.created_at,
        'id': recipe.id,
        'name': recipe.name,
        'tag': recipe.tag.name,
        'url': recipe.url,
        'thumbnail': recipe.thumbnail and get_thumbnail(recipe.thumbnail)
    }
    return recipe_dict
