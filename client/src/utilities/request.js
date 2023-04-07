import axios from "axios";

export const recipesApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    "Content-type": "application/json",
  },
});


export const getRequest = async (url) => {
  const response = await recipesApi.get(url);
  return response.data;
};

export const postRequest = async (body) => {
  const response = await recipesApi.get(url, body);
  return response.data;
};
