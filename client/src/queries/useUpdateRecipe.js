import { useMutation, useQueryClient } from "react-query";
import { request } from "../utilities/request";

const putData = async (id, recipe) => {
  try {
    const data = await request("PUT", `/recipes/recipe/${id}`, recipe);
    return data;
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();
  const updateRecipeMutation = useMutation(({ id, recipe }) => putData(id, recipe), {
    onSuccess: () => queryClient.invalidateQueries(['recipes'], { refetchInactive: true })});
  return updateRecipeMutation;
};
