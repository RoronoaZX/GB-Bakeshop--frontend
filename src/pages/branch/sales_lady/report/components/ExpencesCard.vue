<template>
  <q-card class="q-pa-md" style="width: 450px">
    <div class="q-gutter-y-md">
      <div class="text-h6">Expences</div>
      <div class="row q-gutter-x-md">
        <div>
          <q-input
            v-model="expencesForm.name"
            outlined
            dense
            style="width: 300px"
            placeholder="Name"
          />
        </div>
        <div>
          <q-input
            v-model="expencesForm.amount"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            outlined
            dense
            style="width: 100px"
            label="Amount"
          />
        </div>
      </div>
      <div>
        <q-input
          v-model="description"
          placeholder="Description"
          outlined
          autogrow
          style="width: 415px"
        />
      </div>
      <div class="q-ma-md" align="right">
        <q-btn
          outline
          dense
          icon="add"
          label="Add To List"
          class="q-pa-sm"
          size="sm"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { reactive } from "vue";

const expencesForm = reactive({
  name: "",
  amount: "",
  description: "",
});
</script>

<style lang="scss" scoped></style>
