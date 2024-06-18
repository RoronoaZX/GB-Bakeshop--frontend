<template>
  <q-input
    outlined
    rounded
    dense
    placeholder="Search Recipe"
    style="width: 300px; max-width: 1500px; min-width: 100px"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup></script>

<style lang="scss" scoped></style>
