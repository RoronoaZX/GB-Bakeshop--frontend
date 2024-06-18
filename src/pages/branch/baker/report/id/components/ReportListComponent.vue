<template>
  <q-field outlined dense readonly>
    <template v-slot:control>
      <div class="self-center full-width no-outline">
        {{ text1 }}
      </div>
      <div class="self-center full-width no-outline">
        {{ text1 }}
      </div>
      <div class="self-center full-width no-outline">
        {{ text1 }}
      </div>
      <div class="self-center full-width no-outline">
        {{ text1 }}
      </div>
      <div class="self-center full-width no-outline">
        {{ text1 }}
      </div>
    </template>
  </q-field>
</template>

<script setup>
import { ref } from "vue";

const text1 = ref("Bakers Report");
</script>

<style lang="scss" scoped></style>
