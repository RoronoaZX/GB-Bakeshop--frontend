import { api } from "./axios";

import { LocalStorage } from "quasar";

api.interceptors.request.use(
  (config) => {
    const token = LocalStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const token = LocalStorage.getItem("token");

//   if (requiresAuth && !token) {
//     next("/");
//   } else {
//     next();
//   }
// });
