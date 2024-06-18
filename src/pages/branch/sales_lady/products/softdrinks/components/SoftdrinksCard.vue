<template>
  <div class="q-pa-md">
    <q-scroll-area style="height: 450px; max-width: 1500px">
      <div class="row q-gutter-sm">
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
              {{ selectedItem ? selectedItem.breadName : "" }}
            </div>
            <div>
              <q-btn round dense flat icon="close" v-close-popup />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-gutter-xm justify-between">
            <div class="q-gutter-sm">
              <div class="text-weight-light">Product Sold</div>
              <q-input
                outlined
                type="number"
                placeholder="0"
                style="width: 120px; max-width: 300px; min-width: 50px"
              />
            </div>
            <div class="q-gutter-sm">
              <div class="text-weight-light">Product Price</div>
              <q-input
                outlined
                readonly
                label="5.00"
                style="width: 120px; max-width: 300px; min-width: 50px"
              />
            </div>
            <div class="q-gutter-sm">
              <div class="text-weight-light">Product Beginning</div>
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
const cards = [
  {
    // ../../assets/belguim.jpg
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Coke",
    price: "5.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Sprite",
    price: "4.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Royal",
    price: "5.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Sparkle",
    price: "10.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Mountain Dew",
    price: "20.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Pepsi",
    price: "5.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "7 Up",
    price: "10.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Sting",
    price: "20.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "RC Cola",
    price: "5.00",
  },
  {
    image: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    breadName: "Lemon",
    price: "10.00",
  },
];
</script>

<style lang="scss" scoped>
.example-item {
  width: 200px;
  max-width: 500px;
  min-width: 80px;
  height: 250px;
  max-height: 500px;
  min-height: 200px;
}
</style>
