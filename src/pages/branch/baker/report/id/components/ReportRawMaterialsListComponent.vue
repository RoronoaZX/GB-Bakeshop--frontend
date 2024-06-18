<template>
  <div class="text-h6 q-mt-sm" align="center">Raw Materials</div>
  <div class="q-mt-lg">
    <q-field readonly outlined>
      <template v-slot:control>
        <div class="self-center full-width no-outline">
          {{ text2 }}
        </div>
        <div class="self-center full-width no-outline">
          {{ text2 }}
        </div>
        <div class="self-center full-width no-outline">
          {{ text2 }}
        </div>
        <div class="self-center full-width no-outline">
          {{ text2 }}
        </div>
        <div class="self-center full-width no-outline">
          {{ text2 }}
        </div>
      </template>
    </q-field>
  </div>
</template>

<script setup>
import { ref } from "vue";

const text2 = ref("Raw Materials");
</script>

<style lang="scss" scoped></style>
