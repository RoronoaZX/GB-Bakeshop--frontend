<template>
  <q-card flat>
    <q-card-section style="background-color: #ef4444">
      <div class="text-h6 text-white">
        <q-icon name="fa-solid fa-layer-group" />
        Sales Report
      </div>
    </q-card-section>
    <q-card-section>
      <div align="center">
        <ExpencesCard />
      </div>
      <div class="q-mt-lg q-gutter-y-md">
        <ExpencesReportField />
        <BreadReportField />
        <SelectaReportField />
        <SoftdrinksReportField />
      </div>
      <div class="q-mt-xl">
        <OverAllTotal />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import OverAllTotal from "./components/OverAllTotal.vue";
import SoftdrinksReportField from "./components/SoftdrinksReportField.vue";
import SelectaReportField from "./components/SelectaReportField.vue";
import BreadReportField from "./components/BreadReportField.vue";
import ExpencesReportField from "./components/ExpencesReportField.vue";
import ExpencesCard from "./components/ExpencesCard.vue";
import { ref, reactive } from "vue";

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
const breadList = reactive([
  {
    name: "Whole Wheat",
    sold: 10,
    price: 5,
    beginning: 20,
    sales: 30,
  },
  {
    name: "Sourdough",
    sold: 15,
    price: 7,
    beginning: 25,
    sales: 40,
  },
  {
    name: "Pan de Coco",
    sold: 15,
    price: 4,
    beginning: 25,
    sales: 40,
  },
  // Add more bread items as needed
]);
</script>

<style lang="scss" scoped></style>
