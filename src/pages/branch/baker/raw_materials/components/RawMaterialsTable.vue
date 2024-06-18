<template>
  <div>
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
      :filter="filter"
      flat
      :columns="rawMaterialsStatusColumns"
      :rows="rawMaterialsStatusRows"
      row-key="code"
      virtual-scroll
    >
      <template v-slot:body-cell-availableStocks="props">
        <q-td :props="props">
          <q-chip
            square
            class="text-white"
            :class="getRawMaterialBadgeColor(props.row.availableStocks)"
          >
            {{ props.row.availableStocks }}
          </q-chip>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
// import BakersReportAction from './BakersReportAction.vue';
import { ref, watch } from "vue";

const filter = ref("");
const loadingSearchIcon = ref(false);

watch(filter, () => {
  loadingSearchIcon.value = true;
  setTimeout(() => {
    loadingSearchIcon.value = false;
  });
});

const rawMaterialsStatusColumns = [
  {
    name: "code",
    label: "Code",
    align: "center",
    field: (row) => row.code,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "availableStocks",
    align: "center",
    label: "Available Stocks",
    field: "availableStocks",
    sortable: true,
  },
];
const rawMaterialsStatusRows = [
  {
    code: "001",
    availableStocks: "50 kgs",
  },
  {
    code: "010",
    availableStocks: "70 kgs",
  },
  {
    code: "0010",
    availableStocks: "20 g",
  },
  {
    code: "002",
    availableStocks: "50 kgs",
  },
  {
    code: "003",
    availableStocks: "30 kgs",
  },
  {
    code: "004",
    availableStocks: "10 kgs",
  },
];
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
