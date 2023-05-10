import { useMutation, useQueryClient } from "react-query";
import { request } from "../utilities/request";

const postData = async (recipe) => {
  try {
    const data = await request("POST", "/recipes/create", recipe, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  const createRecipeMutation = useMutation((recipe) => postData(recipe), {
    onSuccess: () => queryClient.invalidateQueries(['recipes'], { refetchInactive: true })
  });
  return createRecipeMutation;
};
