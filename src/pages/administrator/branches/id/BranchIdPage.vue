<template>
  <div class="elegant-container q-gutter-md">
    <div class="text-h6 row justify-between">
      <div>
        <q-btn outline flat icon="arrow_back" to="/admin/branches" />
        <q-space />
      </div>
      <div>
        <q-icon name="fa-solid fa-store" color="red-6" />
        {{ branchName }}
      </div>
    </div>

    <div class="q-gutter-sm">
      <div class="tab-container">
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-2 text-grey-7 tabs-as-cards"
          active-color="red-6"
          indicator-color="transparent"
          align="justify"
        >
          <q-tab name="products" label="Products" />
          <q-tab name="rawMaterials" label="Raw Materials" />
          <q-tab name="production" label="Production" />
        </q-tabs>
      </div>

      <q-card class="tab-content q-mt-md">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="products">
            <ProductPage />
          </q-tab-panel>

          <q-tab-panel name="rawMaterials">
            <RawMaterialsPage />
          </q-tab-panel>

          <q-tab-panel name="production">
            <ProductionPage />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import ProductPage from "./components/products/ProductPage.vue";
import RawMaterialsPage from "./components/raw_materials/RawMaterialsPage.vue";
import ProductionPage from "./components/production/ProductionPage.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { get_branches_by_id } from "src/services/branches-service";

const route = useRoute();
const branchName = ref("");

async function get_branch() {
  try {
    const res = await get_branches_by_id(route.params.branch_id);
    if (res) {
      if (res.name) {
        branchName.value = res.name;
      } else {
        console.error('Branch data is missing "name" property:', res);
      }
    } else {
      console.error("Received undefined response from get_branches_by_id");
    }
  } catch (error) {
    console.error("Failed to fetch branch data:", error);
  }
}

onMounted(() => {
  get_branch();
});

const tab = ref("products");

// function changeTab(tab) {
//   activeTab.value = tab;
// }
</script>

<style scoped>
.q-tabs--not-scrollable .q-tabs__content,
body.mobile .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__content {
  overflow: visible;
}
.tabs-as-cards {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
}

.tabs-as-cards .q-tab {
  background-color: white;
  color: #333;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin: 0 8px;
  padding: 10px 20px;
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

.tabs-as-cards .q-tab:hover {
  background-color: #f0f0f0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.tabs-as-cards .q-tab--active {
  background-color: #e0e0e0;
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.tab-content {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>

<!-- <style scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}

.tab-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.tab-card {
  flex: 1;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  margin-right: 10px; /* Adjust gutter */
}

.tab-card:last-child {
  margin-right: 0; /* Remove gutter for the last card */
}

.tab-card:hover {
  background-color: #eaeaea;
}

.active-tab {
  background-color: #d5e5f7; /* Soft blue color for active tab */
}

.tab-title {
  text-align: center;
  padding: 1rem;
  font-weight: bold;
}

.tab-content {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style> -->
<!-- <template>
  <div>
    hello
    <h1>{{ branch.name }}</h1>
    <p>{{ branch.description }}</p>
    <h2>Products</h2>
    <q-table :rows="products" :columns="productColumns" row-key="id" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { get_branches_by_id } from "src/services/branches-service";
const route = useRoute();

async function get_branch(params) {
  const res = await get_branches_by_id(route.params.branch_id);

  products.value = res.branch_products;
}
get_branch();

function name(params) {
  create_branch_product_service({
    name: "",
    age: "",
    branch_id: route.params.branch_id,
  });
}

const branch = ref({});
const products = ref([]);

const productColumns = [
  { name: "name", label: "Product Name", field: "name" },
  { name: "price", label: "Price", field: "price" },
  { name: "quantity", label: "Quantity", field: "quantity" },
];

const fetchBranchData = async () => {};
</script> -->
