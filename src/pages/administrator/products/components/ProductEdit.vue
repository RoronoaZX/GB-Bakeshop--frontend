<template>
  <q-btn
    @click="openEditForm"
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
  >
    <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
  </q-btn>
  <q-dialog v-model="dialog" persistent>
    <q-card class="my-card" style="width: 400px">
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ef4444"
      >
        <div class="text-h6">Edit Product</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
        <div>
          <div>Name of Bread</div>
          <q-input v-model="editProductForm.name" outlined dense />
        </div>
        <div>
          <div>Category</div>
          <q-select
            v-model="editProductForm.category"
            input-debounce="0"
            :options="category"
            stack-label
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
            hide-dropdown-icon=""
          />
        </div>
      </q-card-section>
      <!-- <q-separator /> -->
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Save"
          @click="saveEditedProduct"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { update_product_service } from "src/services/product-service";
import { useProductStore } from "src/stores/product-store";
import { ref, reactive } from "vue";

const productStore = useProductStore();
const props = defineProps(["edit"]);
const category = ["Bread", "Selecta", "Softdrinks"];
const dialog = ref(false);

const editProductForm = reactive({
  name: "",
  category: null,
});

const openEditForm = () => {
  Object.assign(editProductForm, props.edit.row);
  dialog.value = true;
};

const saveEditedProduct = async () => {
  try {
    const updatedProducts = { ...props.edit.row, ...editProductForm };
    await productStore.update(props.edit.row.id, updatedProducts);
    Notify.create({
      type: "warning",
      icon: "check",
      message: `${props.edit.row.name} ingredients successfully updated!`,
      position: "top",
    });
  } catch (error) {
    console.log("Failed to update ingredients:", error);
  }
};

// const saveEditedProduct = async () => {
//   try {
//     const originalProduct = props.edit.row;
//     const updatedProduct = {
//       id: originalProduct.id,
//       name: editProductForm.name,
//       category: editProductForm.category,
//     };
//     const changedFields = [];
//     if (originalProduct.name !== updatedProduct.name) {
//       changedFields.push(
//         `Name: ${originalProduct.name} to ${updatedProduct.name}`
//       );
//     }
//     if (originalProduct.category !== updatedProduct.category) {
//       changedFields.push(
//         `Category: ${originalProduct.category} to ${updatedProduct.category}`
//       );
//     }
//     const response = await productStore.update(
//       originalProduct.id,
//       updatedProduct
//     );
//     Notify.create({
//       type: "warning",
//       icon: "check",
//       message: `${originalProduct.name} ${originalProduct.category} successfully updated!`,
//       position: "top",
//     });
//     dialog.value = false;
//     if (response.status === 2000) {
//       console.log("Product updated successfully:", response.data);
//     } else {
//       console.log("Failed to update product:", response);
//     }
//   } catch (error) {}
// };
</script>
