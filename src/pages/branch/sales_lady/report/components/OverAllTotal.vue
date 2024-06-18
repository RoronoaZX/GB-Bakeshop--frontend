<template>
  <div class="text-h5 q-mb-md">Over All Total</div>
  <div class="row q-gutter-sm justify-between">
    <div>
      <div class="text-weight-light">Bread Total</div>
      <div>
        <q-input readonly outlined dense style="width: 150px" />
      </div>
    </div>
    <div>
      <div class="text-weight-light">Selecta Total</div>
      <div>
        <q-input readonly outlined dense style="width: 150px" />
      </div>
    </div>
    <div>
      <div class="text-weight-light">Softdrinks Total</div>
      <div>
        <q-input readonly outlined dense style="width: 150px" />
      </div>
    </div>
    <div>
      <div class="text-weight-light">Expences Total</div>
      <div>
        <q-input readonly outlined dense style="width: 150px" />
      </div>
    </div>
    <!-- <div>
  <div class="text-weight-light">Expected Sales Total</div>
  <div>
    <q-input readonly outlined dense style="width: 130px" />
  </div>
</div> -->
  </div>
  <div class="q-my-xl">
    <div class="q-gutter-sm q-my-md">
      <div class="text-h6 q-mt-md">Total Sales Amount:</div>
      <div>
        <q-input
          v-model="totalSalesAmount"
          mask="#.##"
          fill-mask="0"
          reverse-fill-mask
          outlined
          dense
          style="width: 180px"
        />
      </div>
    </div>
    <div>
      <div class="text-weight-light">Charges Total</div>
      <div>
        <q-input readonly outlined dense style="width: 180px" />
      </div>
    </div>
  </div>

  <div class="q-my-md" align="right">
    <q-btn class="q-pa-sm" color="red-6" dense rounded label="Submit">
      <q-icon class="q-mx-sm" left name="send" />
    </q-btn>
  </div>
</template>

<script setup>
import { ref } from "vue";

const totalSalesAmount = ref("");
</script>

<style lang="scss" scoped></style>
