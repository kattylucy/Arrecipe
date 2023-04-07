import { useQuery } from "react-query";
import { getRequest} from "../utilities/request";

const transformData = (recipes) =>
  recipes.map((recipe) => ({
    name: recipe.name,
    instagramUrl: recipe.instagram_url,
    calories: recipe.calories_count,
    cookingTime: recipe.cooking_time,
    createdAt: recipe.created_at,
    id: recipe.id,
    updatedAt: recipe.updated_at,
  }));

const fetchData = () => {
  return getRequest('recipes').then(data => transformData(data.data));
}


const useGetRecipes = (options) =>
  useQuery("recipes", fetchData, {
    ...options,
  });

export default useGetRecipes;
