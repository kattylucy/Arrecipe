import { useMutation, useQueryClient } from "react-query";
import { request } from "../utilities/request";

const postData = async (id) => {
  try {
    const data = await request("DELETE", `/recipes/delete/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  const deleteRecipeMutation = useMutation((id) => postData(id), {
    onSuccess: () => queryClient.invalidateQueries(['recipes'], { refetchInactive: true })});
  return deleteRecipeMutation;
};

export default useDeleteRecipe;
