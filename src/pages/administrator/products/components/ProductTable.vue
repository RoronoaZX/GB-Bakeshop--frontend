<template>
  <div align="right">
    <q-input
      class="q-pb-lg q-pl-md"
      v-model="searchQuery"
      @update:model-value="search"
      outlined
      placeholder="Search"
      debounce="1000"
      style="width: 500px; max-width: 1500px; min-width: 100px"
      flat
      dense
      rounded
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
  <div>
    <q-table
      class="my-sticky-dynamic elegant-container"
      :virtual-scroll-sticky-size-start="48"
      flat
      style="height: 400px"
      :columns="productsColumn"
      :rows="productsRows ?? []"
      row-key="name"
      v-if="!loading && productsRows && productsRows.length"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
    >
      <template v-slot:body-cell-category="props">
        <q-td key="name" :props="props">
          <q-badge :color="getBadgeCategoryColor(props.row.category)">
            {{ props.row.category }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <ProductEdit :edit="props" />
            <ProductDelete :delete="props" />
          </div>
        </q-td>
      </template>
    </q-table>
    <div class="spinner-wrapper" v-else-if="loading">
      <q-spinner-dots size="50px" color="primary" />
    </div>
    <div class="data-error text-h6" v-else>
      <q-icon name="warning" color="warning" size="4em" />
      No data available.
    </div>
  </div>
</template>

<script setup>
import ProductEdit from "./ProductEdit.vue";
import ProductDelete from "./ProductDelete.vue";
import { ref, watch, onMounted, computed } from "vue";
import { date } from "quasar";
import { useProductStore } from "src/stores/product-store";

const pagination = ref({
  rowsPerPage: 0,
});
const productStore = useProductStore();
const productsRows = computed(() => productStore.products);
const isLoading = ref(true);
const loading = ref(true);
const showNoDataMessage = ref(false);

const searchQuery = ref("");

const search = async () => {
  loading.value = true;
  showNoDataMessage.value = false;

  try {
    await productStore.searchProducts(searchQuery.value);
    showNoDataMessage.value = productsRows.value.length === 0;
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
};

watch(searchQuery, (newValue) => {
  if (newValue.trim() !== "") {
    search();
  } else {
    productsRows.value = productStore.fetchProducts();
    showNoDataMessage.value = productsRows.value.length === 0;
  }
});

onMounted(async () => {
  try {
    productsRows.value = await productStore.fetchProducts();
    if (!productsRows.value.length) {
      showNoDataMessage.value = true;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
});

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM D, YYYY");
};

const productsColumn = [
  {
    name: "name",
    label: "Product Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
  },

  {
    name: "category",
    align: "left",
    label: "Category",
    field: "category",
  },
  {
    name: "createdAt",
    align: "center",
    label: "Created At",
    field: "created_at",
    format: (val) => formatDate(val),
  },
  {
    name: "action",
    align: "center",
    label: "Action",
    field: "action",
  },
];

const getBadgeCategoryColor = (category) => {
  switch (category) {
    case "Bread":
      return "brown";
    case "Selecta":
      return "red-6";
    case "Softdrinks":
      return "accent";
    default:
      return "grey";
  }
};
</script>
<style scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
.absolute-full {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.spinner-wrapper {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-sticky-dynamic {
  height: 410px;
}

.my-sticky-dynamic .q-table__top,
.my-sticky-dynamic .q-table__bottom,
.my-sticky-dynamic thead tr:first-child th {
  background-color: #000000;
}

.my-sticky-dynamic thead tr th {
  position: sticky;
  z-index: 1;
}

.my-sticky-dynamic thead tr:last-child th {
  top: 48px;
}

.my-sticky-dynamic thead tr:first-child th {
  top: 0;
}

.my-sticky-dynamic tbody {
  scroll-margin-top: 48px;
}
</style>
