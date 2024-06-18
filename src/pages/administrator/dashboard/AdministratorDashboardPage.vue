<template>
  <q-page padding>
    <div class="q-gutter-md row justify-center">
      <q-card class="dashboard-card bg-teal-5" bordered>
        <q-card-section class="q-pa-md text-white text-h6">
          <div>Daily Sales</div>
          <div>1,250</div>
        </q-card-section>
      </q-card>
      <q-card class="dashboard-card bg-light-blue-9" bordered>
        <q-card-section class="q-pa-md text-white text-h6">
          <div>Weekly Sales</div>
          <div>8,750</div>
        </q-card-section>
      </q-card>
      <q-card class="dashboard-card bg-red-11" bordered>
        <q-card-section class="q-pa-md text-white text-h6">
          <div>Monthly Sales</div>
          <div>35,000</div>
        </q-card-section>
      </q-card>
      <q-card
        class="dashboard-card bg-deep-purple-11"
        bordered
        style="max-width: 1500px; min-width: 200px; width: 23%"
      >
        <q-card-section class="q-pa-md text-white text-h6">
          <div>Yearly Sales</div>
          <div>175,000</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
.dashboard-card {
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 1500px;
  min-width: 200px;
  width: 23%;
  max-height: 1500px;
  min-height: 40px;
  height: 20%;
}

.dashboard-card .q-card-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
