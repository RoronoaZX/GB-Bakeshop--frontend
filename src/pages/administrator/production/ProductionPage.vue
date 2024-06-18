<template>
  <q-card class="elegant-container" flat>
    <q-card-section>
      <div class="text-h6 text-dark">
        <q-icon name="fa-regular fa-building" />
        Production
      </div>
    </q-card-section>
    <!-- <q-card-section>
      <ProductionSearch />
    </q-card-section> -->
    <q-card-section>
      <ProductionTable />
    </q-card-section>
  </q-card>
</template>
<script setup>
// import ProductionSearch from "./components/ProductionSearch.vue";
import ProductionTable from "./components/ProductionTable.vue";
</script>
<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
</style>
