import axios from 'axios';

const request = axios.create({
  baseURL: 'https://swapi.dev/api/',
});

const BASE_URL = 'https://swapi.dev/api/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getProducts = (page = 1) => {
  return api
    .get(`/people/?page=${page}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export default request;
