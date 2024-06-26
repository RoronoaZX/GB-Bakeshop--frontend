import axios from "axios";

export default ({ router }) => {
  // Add a request interceptor to attach the Bearer token
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a navigation guard to protect routes
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const token = localStorage.getItem("token");

    if (requiresAuth && !token) {
      next("/");
    } else {
      next();
    }
  });
};
