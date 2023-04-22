import { useQuery } from "react-query";
import isEmpty from 'lodash/isEmpty';
import { request } from "../utilities/request";

const transformData = (recipes) =>
  recipes.map((recipe) => ({
    name: recipe.name,
    url: recipe.url,
    calories: recipe.calories_count,
    cookingTime: recipe.cooking_time,
    createdAt: recipe.created_at,
    id: recipe.id,
    thumbnail: recipe.thumbnail,
    tag: recipe.tag
  }));

const fetchData = async () => {
  try {
    const data = await request("GET", "/recipes");
    return isEmpty(data.data) ? [] : transformData(data.data)
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
