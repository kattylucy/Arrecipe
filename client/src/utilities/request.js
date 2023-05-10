import axios from "axios";

export const recipesApi = axios.create({
  baseURL: "https://arrecipe.herokuapp.com/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

export const request = async (method, url, data, config) => {
  try {
    const response = await recipesApi({
      method,
      url,
      data,
      ...config
    });
    return response.data;
  } catch (error) {
    return response.error;
  }
};
