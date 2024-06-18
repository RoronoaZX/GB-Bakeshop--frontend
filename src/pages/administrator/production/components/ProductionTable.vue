<template>
  <div align="right">
    <q-input
      rounded
      outlined
      dense
      debounce="300"
      v-model="filter"
      placeholder="Search"
      style="width: 500px; max-width: 1500px; min-width: 100px"
    >
      <template v-slot:append>
        <q-icon v-if="!loadingSearchIcon" name="search" />
        <q-icon v-else :thickness="2" color="teal" size="1em" />
      </template>
    </q-input>
  </div>
  <div>
    <q-table
      class="elegant-container"
      :filter="filter"
      flat
      :columns="productionColumns"
      :rows="productionRow"
      row-key="name"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <ProductionView />
            <ProductionEdit />
            <!-- <RawMaterialsIngredientsTabTableDelete /> -->
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import ProductionEdit from "./ProductionEdit.vue";
import ProductionView from "./ProductionView.vue";
import { ref, watch } from "vue";

const filter = ref("");
const loadingSearchIcon = ref(false);

watch(filter, () => {
  loadingSearchIcon.value = true;
  setTimeout(() => {
    loadingSearchIcon.value = false;
  });
});

const productionColumns = [
  {
    name: "name",
    label: "Production Name",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    label: "Date",
    align: "center",
    field: "date",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    sortable: true,
  },
];

const productionRow = [
  {
    name: "Production 1",
    date: "4/4/24",
  },
  {
    name: "Production 2",
    date: "4/4/24",
  },
  {
    name: "Production 3",
    date: "4/4/24",
  },
  {
    name: "Production 4",
    date: "4/4/24",
  },
  {
    name: "Production 5",
    date: "4/4/24",
  },
  {
    name: "Production 6",
    date: "4/4/24",
  },
  {
    name: "Production 7",
    date: "4/4/24",
  },
];

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
<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
</style>
