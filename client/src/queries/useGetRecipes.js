import { useInfiniteQuery } from "react-query";
import isEmpty from 'lodash/isEmpty';
import { request } from "../utilities/request";

const LIMIT = 9;

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

  const transformUrl = (filters, page) => {
    if (!filters) return '/recipes';
    const urlParts = [];
    if (filters.query) urlParts.push(`query=${filters.query}`);
    if (filters.caloriesCount) urlParts.push(`calories_count=${filters.caloriesCount}`);
    if (filters.cookingTime) urlParts.push(`cooking_time=${filters.cookingTime}`);
    if (!isEmpty(filters.tags)){
      const toArr = Object.values(filters.tags);
      urlParts.push(`tags=${toArr}`)
    }
    return `/recipes?` + urlParts.join('&') + `&page=${page}&limit=${LIMIT}`;
  }

const fetchData = async (filters, pageParam) => {
  try {
    const data = await request("GET", transformUrl(filters, pageParam));
    return isEmpty(data.data) ? [] : transformData(data.data)
  } catch (error) {
    console.log(error);
    // Handle error
  }
};
const useGetRecipes = (filter) => {
  const query = useInfiniteQuery(
    ["recipes", filter],
    ({ pageParam = 1 }) => fetchData(filter, pageParam),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.length === LIMIT ? allPages.length + 1 : undefined;
        return nextPage;
      }
    },
    [filter]
  );

  return { ...query };
};

export default useGetRecipes;
