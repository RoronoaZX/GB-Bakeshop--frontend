<template>
  <div class="q-mt-md">
    <q-scroll-area style="height: 450px; max-width: 1500px">
      <div class="row q-pa-lg q-gutter-sm q-mt-md">
        <q-intersection
          v-for="(item, index) in cards"
          :key="index"
          once
          transition="scale"
          class="example-item"
        >
          <q-card @click="clickme" class="q-ma-sm my-card">
            <img :src="item.image" />
            <q-card-section>
              <div class="text-h6">{{ item.breadName }}</div>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-pa-sm row q-gutter-x-md">
              <div class="text-subtitle1">Price:</div>
              <div class="text-subtitle1">{{ item.price }}</div>
            </q-card-section>
          </q-card>
        </q-intersection>
      </div>
    </q-scroll-area>
  </div>
  <div>
    <q-dialog v-model="dialog">
      <q-card class="my-card q-pa-lg" style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="row justify-between">
            <div class="text-h6">
              <!-- {{ selectedItem ? selectedItem.breadName : "" }} -->
              Bread Name
            </div>
            <div>
              <q-btn round dense flat icon="close" v-close-popup />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-gutter-xm justify-between">
            <div class="q-gutter-sm">
              <div class="text-weight-light">Sold Pcs</div>
              <q-input
                v-model="soldPcs"
                outlined
                type="number"
                placeholder="0"
                style="width: 120px; max-width: 300px; min-width: 50px"
              />
            </div>
            <div class="q-gutter-sm">
              <div class="text-weight-light">Price</div>
              <q-input
                outlined
                readonly
                label="5.00"
                style="width: 120px; max-width: 300px; min-width: 50px"
              />
            </div>
            <div class="q-gutter-sm">
              <div class="text-weight-light">Beginning</div>
              <q-input
                outlined
                readonly
                label="45 pcs"
                style="width: 120px; max-width: 300px; min-width: 50px"
              />
            </div>
            <div class="q-gutter-sm">
              <div class="text-weight-light">Sales Amount</div>
              <q-input
                outlined
                readonly
                label="0.00"
                style="width: 120px; max-width: 300px; min-width: 50px"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div align="right">
            <q-btn color="red-6" label="Ok" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedItem = ref(null);
const dialog = ref(false);
const clickme = (item) => {
  selectedItem.value = item;
  console.log(item);
  dialog.value = true;
};
const soldPcs = ref("");
const cards = [
  {
    // ../../assets/belguim.jpg
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Belguims",
    price: "5.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Pan de Coco",
    price: "4.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Spanish",
    price: "5.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "German",
    price: "10.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Banana Cake",
    price: "20.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Croissant",
    price: "5.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "German",
    price: "10.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Banana Cake",
    price: "20.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Croissant",
    price: "5.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "German",
    price: "10.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Banana Cake",
    price: "20.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Croissant",
    price: "5.00",
  },
];
</script>

<style lang="scss" scoped>
.example-item {
  width: 190px;
  max-width: 500px;
  min-width: 80px;
  height: 250px;
  max-height: 500px;
  min-height: 200px;
}
</style>
