import axios from "axios";

const customAxios = axios.create();

customAxios.defaults.timeout = 600000;

customAxios.defaults.withCredentials = true;

customAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
