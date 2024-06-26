import { boot } from "quasar/wrappers";
import axios from "axios";
import { Cookies } from "quasar";
import { LocalStorage } from "quasar";

axios.defaults.withCredentials = true;

axios.defaults.headers.common["X-CSRF-TOKEN"] = Cookies.get("XSRF-TOKEN");

const api = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:8000/api",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 419) {
      // Fetch new CSRF token
      // await axios.get("/sanctum/csrf-cookie");
      // Retry original request
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
