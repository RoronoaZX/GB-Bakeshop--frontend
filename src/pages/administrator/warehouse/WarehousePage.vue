<template>
  <q-card class="elegant-container" flat>
    <q-card-section class="row justify-between">
      <div class="text-h6 text-dark">
        <q-icon name="factory" />
        Warehouse
        <div class="q-gutter-x-sm">
          <q-badge label="Open" outline color="info" />
          <q-badge label="Closed" outline color="accent" />
        </div>
      </div>
      <div align="right">
        <WarehouseCreateComponent />
      </div>
    </q-card-section>
    <!-- <q-card-section class="q-gutter-md">
      <div class="row q-gutter-md justify-end">
        <WarehouseSearchComponent />

      </div>
    </q-card-section> -->
    <q-card-section>
      <WarehouseTableComponent />
    </q-card-section>
  </q-card>
</template>
<script setup>
import WarehouseTableComponent from "./components/WarehouseTableComponent.vue";
import WarehouseCreateComponent from "./components/WarehouseCreateComponent.vue";
import WarehouseSearchComponent from "./components/WarehouseSearchComponent.vue";
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
</style>
