<template>
  <q-btn
    color="accent"
    icon="visibility"
    size="md"
    flat
    round
    dense
    @click="open_bakers_reports_dialog"
  >
    <!-- <q-tooltip class="bg-accent" :delay="200">View</q-tooltip> -->
  </q-btn>
  <q-dialog v-model="bakersReportDialog" persistent>
    <q-card class="my-card" style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">Bakers Report Name</div>
          <div>
            <q-btn rounded flat dense icon="close" v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <!-- <q-virtual-scroll
          type="table"
          style="max-height: 70vh"
          :virtual-scroll-item-size="48"
          :virtual-scroll-sticky-size-start="48"
          :virtual-scroll-sticky-size-end="32"
          :items="rows"
        >
          <template v-slot:before>
            <thead class="thead-sticky text-left">
              <tr>
                <th v-for="col in columns" :key="col.name">
                  {{ col.name }}
                </th>
              </tr>
            </thead>
          </template>
        </q-virtual-scroll> -->
        <q-table flat :columns="columns" :rows="rows" row-key="name">
          <template v-slot:body-cell-over="props">
            <q-td key="over" :props="props">
              {{ props.row.over }}
              <q-popup-edit v-model="props.row.over" buttons v-slot="scope">
                <q-input
                  type="number"
                  v-model.number="scope.value"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </template>
          <template v-slot:body-cell-newProduction="props">
            <q-td key="newProduction" :props="props">
              {{ props.row.newProduction }}
              <q-popup-edit
                v-model="props.row.newProduction"
                buttons
                v-slot="scope"
              >
                <q-input
                  type="number"
                  v-model.number="scope.value"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <div align="right">
          <q-btn label="Confirm" color="red-6" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const bakersReportDialog = ref(false);

const open_bakers_reports_dialog = () => {
  bakersReportDialog.value = true;
};

const columns = [
  {
    name: "name",
    label: "Bread Name",
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
    name: "newProduction",
    align: "center",
    label: "New Production",
    field: "newProduction",
    sortable: true,
  },
  {
    name: "over",
    align: "center",
    label: "Over",
    field: "over",
    sortable: true,
  },
  {
    name: "short",
    align: "center",
    label: "Short",
    field: "short",
    sortable: true,
  },
];

const rows = [
  {
    name: "Bread 1",
    date: "4/4/4",
    newProduction: "24",
    over: "3",
    short: "0",
  },
  {
    name: "Bread 2",
    date: "4/4/4",
    newProduction: "24",
    over: "3",
    short: "0",
  },
  {
    name: "Bread 3",
    date: "4/4/4",
    newProduction: "24",
    over: "3",
    short: "0",
  },
  {
    name: "Bread 4",
    date: "4/4/4",
    newProduction: "24",
    over: "3",
    short: "0",
  },
  {
    name: "Bread 5",
    date: "4/4/4",
    newProduction: "24",
    over: "3",
    short: "0",
  },
];
const row = ref(rows);
</script>

<style lang="scss" scoped>
.thead-sticky tr > *,
.thead-sticky tr:last-child > * {
  top: 0;
}
</style>
