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
  <q-dialog v-model="bakersReportDialog">
    <q-card class="my-card"> this is a report dialog </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const bakersReportDialog = ref(false);

const open_bakers_reports_dialog = () => {
  bakersReportDialog.value = true;
};
</script>
