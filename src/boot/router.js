import { boot } from "quasar/wrappers";
import { createRouter, createWebHistory } from "vue-router";
import routes from "../router"; // Ensure the correct path to your routes

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add route guards
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const token = LocalStorage.getItem("token");
  const role = LocalStorage.getItem("role");

  if (requiresAuth && !token) {
    next("/");
  } else if (
    to.path.startsWith("/admin") &&
    role !== "Admin" &&
    role !== "SuperAdmin"
  ) {
    next("/branch/sales_lady");
  } else {
    next();
  }
});

export default boot(({ app }) => {
  app.use(router);
});

export { router };
