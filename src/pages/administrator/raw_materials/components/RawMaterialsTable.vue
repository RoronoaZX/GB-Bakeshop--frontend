<template>
  <div align="right">
    <q-input
      class="q-pb-lg q-pl-md"
      @update:model-value="search"
      v-model="searchQuery"
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

  <!-- <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div> -->
  <div>
    <q-table
      class="table-container elegant-container sticky-header"
      :virtual-scroll-sticky-size-start="48"
      flat
      style="height: 400px"
      :columns="rawMaterialsColumns"
      :rows="rawMaterialsRow ?? []"
      row-key="name"
      v-if="!loading && rawMaterialsRow && rawMaterialsRow.length"
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
      <template v-slot:body-cell-unit="props">
        <q-td key="name" :props="props">
          <q-badge :color="getBadgeUnitColor(props.row.unit)">
            {{ props.row.unit }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-availableStocks="props">
        <q-td :props="props">
          <q-badge
            square
            class="text-white"
            :class="getRawMaterialBadgeColor(props.row.availableStocks)"
          >
            {{ props.row.availableStocks }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <RawMaterialsTableEdit :edit="props" />
            <RawMaterialsTableDelete :delete="props" />
          </div>
        </q-td>
      </template>
    </q-table>
    <div class="data-error text-h6" v-else-if="loading">
      <q-spinner-dots size="50px" color="primary" />
    </div>

    <div class="data-error text-h6" v-else>
      <q-icon name="warning" color="warning" size="4em" />
      No data available
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import RawMaterialsTableEdit from "./RawMaterialsTableEdit.vue";
import RawMaterialsTableDelete from "./RawMaterialsTableDelete.vue";
import { useRawMaterialStore } from "src/stores/raw-materials-store";

const materialStore = useRawMaterialStore();
const rawMaterialsRow = computed(() => materialStore.rawMaterials);
const loading = ref(true);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});
const searchQuery = ref("");

const search = async () => {
  loading.value = true;
  showNoDataMessage.value = false;
  try {
    await materialStore.searchRawMaterials(searchQuery.value);
    showNoDataMessage.value = rawMaterialsRow.value.length === 0;
  } catch (error) {
    console.error("Error fetching raw materials:", error);
  } finally {
    loading.value = false;
  }
};
watch(searchQuery, (newValue) => {
  if (newValue.trim() !== "") {
    search();
  } else {
    rawMaterialsRow.value = materialStore.fetchMaterials();
    showNoDataMessage.value = rawMaterialsRow.value.length === 0;
  }
});

onMounted(async () => {
  try {
    rawMaterialsRow.value = await materialStore.fetchMaterials();
    if (!rawMaterialsRow.value.length) {
      showNoDataMessage.value = true;
    }
  } catch (error) {
    console.error("Error fetching raw materials:", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
});

const rawMaterialsColumns = [
  {
    name: "name",
    label: "Raw Materials Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "code",
    label: "Code",
    align: "left",
    field: "code",
    sortable: true,
  },
  {
    name: "category",
    label: "Category",
    align: "left",
    field: "category",
  },
  {
    name: "unit",
    label: "Unit",
    align: "left",
    field: "unit",
  },
  {
    name: "availableStocks",
    label: "Available Stocks",
    align: "center",
    field: "availableStocks",
  },
  {
    name: "action",
    label: "Action",
    align: "center",
  },
];

const getBadgeCategoryColor = (category) => {
  switch (category) {
    case "Ingredients":
      return "teal";
    case "Packaging Materials":
      return "brown-6";
    default:
      return "grey";
  }
};
const getBadgeUnitColor = (unit) => {
  switch (unit) {
    case "Grams":
      return "info";
    case "Pcs":
      return "accent";
    default:
      return "grey";
  }
};
const getRawMaterialBadgeColor = (availableStocks) => {
  const stockValue = parseInt(availableStocks);
  if (stockValue <= 20) {
    return "bg-red";
  } else if (stockValue <= 50) {
    return "bg-warning";
  } else {
    return "bg-primary";
  }
};
</script>
<style scoped>
.elegant-container {
  background: #f7f8fc;
  /* padding: 1rem; */
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
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-container {
  max-height: 400px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}
</style>
