<template>
  <div>
    <q-btn
      class="q-pa-sm"
      outline
      dense
      icon="add_circle"
      label="Add Product"
      @click="openDialog"
      style="background-color: #ef4444"
    />
  </div>
  <div>
    <q-dialog v-model="dialog" persistent>
      <q-card class="my-card" style="width: 400px">
        <q-card-section
          class="row items-center text-white"
          style="background-color: #ef4444"
        >
          <div class="text-h6">Add Product</div>
          <q-space />
          <q-btn icon="close" flat dense round v-close-popup />
        </q-card-section>
        <q-form @submit.prevent="submitForm">
          <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
            <div>
              <div>Name of Product</div>
              <q-input
                v-model="addNewProductForm.name"
                outlined
                dense
                :rules="[(val) => val && val.length > 0]"
              />
            </div>
            <div>
              <div>Category</div>
              <q-select
                v-model="addNewProductForm.category"
                input-debounce="0"
                :options="category"
                stack-label
                outlined
                dense
                :rules="[(val) => val && val.length > 0]"
                hide-dropdown-icon
                behavior="menu"
              />
            </div>
          </q-card-section>
          <!-- <q-separator /> -->
          <q-card-actions class="row q-ma-md" align="right">
            <q-btn
              class="glossy"
              color="grey-9"
              label="Dismiss"
              v-close-popup
            />
            <q-btn class="glossy" color="teal" label="Create" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Notify } from "quasar";
import { useProductStore } from "src/stores/product-store";

const producStore = useProductStore();
const category = ["Bread", "Selecta", "Softdrinks"];
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const addNewProductForm = reactive({
  name: "",
  category: null,
});

const submitForm = () => {
  try {
    producStore.create(addNewProductForm);
    Notify.create({
      type: "positive",
      icon: "thumb_up",
      message: `${addNewProductForm.name} product created successfully`,
      position: "top",
      timeout: 1000,
    });
    dialog.value = false;
    console.log("Raw Materials Data", addNewProductForm);
    resetFormData();
  } catch (error) {
    console.log("Error saving product:", error);
    Notify.create({
      type: "negative",
      message: "Failed to save product:" + error.message,
    });
  }
};

const resetFormData = () => {
  addNewProductForm.name = "";
  addNewProductForm.category = "";
};
</script>

<style lang="scss" scoped></style>
