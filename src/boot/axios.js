import { boot } from "quasar/wrappers";
import axios from "axios";
import { LocalStorage } from "quasar";

// Create an Axios instance
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:8000/api",
});

// Intercept requests to add the authorization header
api.interceptors.request.use(
  (config) => {
    const token = LocalStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // Make Axios available throughout the app
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
