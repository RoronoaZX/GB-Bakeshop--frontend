import { createRouter, createWebHistory } from "vue-router";
import { LocalStorage } from "quasar";

const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/login/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    // meta: {
    //   requiresAuth: true,
    // },
    children: [
      {
        path: "dashboard",
        component: () =>
          import(
            "pages/administrator/dashboard/AdministratorDashboardPage.vue"
          ),
      },
      {
        path: "raw_materials",
        component: () =>
          import("pages/administrator/raw_materials/RawMaterialsPage.vue"),
      },
      {
        path: "recipe",
        component: () => import("pages/administrator/recipe/RecipePage.vue"),
      },
      {
        path: "warehouse",
        component: () =>
          import("pages/administrator/warehouse/WarehousePage.vue"),
      },
      {
        path: "branches",
        component: () =>
          import("pages/administrator/branches/BranchesPage.vue"),
      },
      {
        path: "branch/:branch_id",
        component: () =>
          import("pages/administrator/branches/id/BranchIdPage.vue"),
        name: "BranchDetail",
        props: true,
      },
      {
        path: "warehouse/:warehouse_id",
        component: () =>
          import("pages/administrator/warehouse/id/WarehouseIdPage.vue"),
      },
      {
        path: "products",
        component: () =>
          import("pages/administrator/products/ProductsPage.vue"),
      },
      {
        path: "production",
        component: () =>
          import("pages/administrator/production/ProductionPage.vue"),
      },
      {
        path: "users",
        component: () => import("pages/administrator/users/UsersPage.vue"),
      },
      {
        path: "users/:user_id",
        component: () => import("pages/administrator/users/id/UserIdPage.vue"),
        name: "UserIdPage",
      },
    ],
  },
  {
    path: "/branch/sales_lady",
    component: () => import("layouts/SalesLadyLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/branch/sales_lady/analytics/AnalyticsPage.vue"),
      },
      {
        path: "products",
        component: () =>
          import("pages/branch/sales_lady/products/ProductsPage.vue"),
      },
      {
        path: "bakers_report",
        component: () =>
          import("pages/branch/sales_lady/bakers_report/BakersReportPage.vue"),
      },
      {
        path: "report",
        component: () =>
          import("pages/branch/sales_lady/report/ReportPage.vue"),
      },
      {
        path: "history_logs",
        component: () =>
          import("pages/branch/sales_lady/history_logs/HistoryLogsPage.vue"),
      },
      {
        path: "account",
        component: () =>
          import("pages/branch/sales_lady/account/AccountPage.vue"),
      },
    ],
  },
  {
    path: "/branch/baker",
    component: () => import("layouts/BakersLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/branch/baker/raw_materials/RawMaterialsPage.vue"),
      },
      {
        path: "transaction",
        component: () =>
          import("pages/branch/baker/transaction/TransactionPage.vue"),
      },
      {
        path: "report",
        component: () => import("pages/branch/baker/report/ReportPage.vue"),
      },
      {
        path: "account",
        component: () => import("pages/branch/baker/account/AccountPage.vue"),
      },
      {
        path: "create_report",
        component: () =>
          import("pages/branch/baker/report/id/ReportIdCreatePage.vue"),
      },
    ],
  },
  {
    path: "/warehouse",
    component: () => import("layouts/WarehouseLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import(
            "pages/warehouse/transactions/warehouseTransactionHistory.vue"
          ),
      },
      {
        path: "ingredients",
        component: () =>
          import("pages/warehouse/ingredients/WarehouseIngredients.vue"),
      },
      {
        path: "scalling_section",
        component: () =>
          import(
            "pages/warehouse/scalling_section/WarehouseScallingSection.vue"
          ),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

// Create the router instance
// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const token = LocalStorage.getItem("token");

//   if (requiresAuth && !token) {
//     next("/");
//   } else {
//     next();
//   }
// });

export default routes;
