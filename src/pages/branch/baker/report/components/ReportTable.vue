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
      :columns="bakersReportListColumns"
      :rows="bakersReportListRow"
      row-key="name"
    >
      <template v-slot:body-cell-view="props">
        <q-td :props="props">
          <div>
            <ReportView />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import ReportView from "./ReportView.vue";
import { ref, watch } from "vue";

const filter = ref("");
const loadingSearchIcon = ref(false);

watch(filter, () => {
  loadingSearchIcon.value = true;
  setTimeout(() => {
    loadingSearchIcon.value = false;
  });
});
const bakersReportListColumns = [
  {
    name: "name",
    label: "Reports Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Date",
    field: "date",
    sortable: true,
  },
  {
    name: "view",
    align: "right",
    label: "View",
    field: "view",
    sortable: true,
  },
];
const bakersReportListRow = [
  {
    name: "Bakers Report 1",
    date: "4/4/24",
  },
  {
    name: "Bakers Report 2",
    date: "4/4/24",
  },
  {
    name: "Bakers Report 3",
    date: "4/4/24",
  },
  {
    name: "Bakers Report 4",
    date: "4/4/24",
  },
];
</script>
