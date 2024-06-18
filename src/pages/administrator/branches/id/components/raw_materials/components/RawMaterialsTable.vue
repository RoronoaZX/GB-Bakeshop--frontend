<template>
  <q-table
    :filter="filter"
    flat
    :columns="ingredientsColumns"
    :rows="ingredientsRow"
    row-key="name"
  >
    <template v-slot:top-left>
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
          <q-icon name="search" />
        </template>
      </q-input>
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
          <RawMaterialsTableEdit />
          <RawMaterialsTableDelete />
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from "vue";
import RawMaterialsTableEdit from "./RawMaterialsTableEdit.vue";
import RawMaterialsTableDelete from "./RawMaterialsTableDelete.vue";

const filter = ref("");
const ingredientsColumns = [
  {
    name: "name",
    label: "Ingredients Name",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "unit",
    label: "Unit",
    align: "center",
    field: "unit",
    sortable: true,
  },
  {
    name: "availableStocks",
    label: "Available Stocks",
    align: "center",
    field: "availableStocks",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    sortable: true,
  },
];

const ingredientsRow = [
  {
    name: "Ingredients 1",
    unit: "Grams",
    availableStocks: "50 kgs",
  },
  {
    name: "Ingredients 2",
    unit: "Pcs",
    availableStocks: "20 Pcs",
  },
  {
    name: "Ingredients 3",
    unit: "Grams",
    availableStocks: "80 kgs",
  },
  {
    name: "Ingredients 4",
    unit: "Pcs",
    availableStocks: "50 Pcs",
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
