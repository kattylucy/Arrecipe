import { useQuery } from "react-query";
import { request } from "../utilities/request";

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

const fetchData = async () => {
  try {
    const data = await request("GET", "/recipes");
    return transformData(data);
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

const useGetRecipes = (options) =>
  useQuery("recipes", fetchData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });

export default useGetRecipes;
