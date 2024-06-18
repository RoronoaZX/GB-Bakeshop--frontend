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
      <template v-slot:body-cell-status="props">
        <q-td key="name" :props="props">
          <q-badge class="text-white" :color="getBadgeColor(props.row.status)">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-view="props">
        <q-td :props="props">
          <div>
            <BakersReportView />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import BakersReportView from "./BakersReportView.vue";
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
    name: "status",
    align: "left",
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    name: "view",
    align: "left",
    label: "View",
    field: "view",
    sortable: true,
  },
];
const bakersReportListRow = [
  {
    name: "Bakers Report 1",
    date: "4/4/24",
    status: "To Confirm",
  },
  {
    name: "Bakers Report 2",
    date: "4/4/24",
    status: "Confirmed",
  },
  {
    name: "Bakers Report 3",
    date: "4/4/24",
    status: "To Confirm",
  },
  {
    name: "Bakers Report 4",
    date: "4/4/24",
    status: "Confirmed",
  },
];

const getBadgeColor = (status) => {
  switch (status) {
    case "To Confirm":
      return "red";
    case "Confirmed":
      return "info";
    default:
      return "grey";
  }
};
</script>
