<template>
  <q-btn
    @click="open_dialog"
    color="negative"
    icon="delete"
    size="sm"
    flat
    round
    dense
    align="center"
  >
    <q-tooltip class="bg-negative" :delay="200">Delete</q-tooltip>
  </q-btn>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Do you want to delete it?</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-card-actions align="right">
          <q-btn flat dense outline label="No" v-close-popup />
          <q-btn flat dense label="Yes" @click="onDelete" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { useProductPerBranchesStore } from "src/stores/product-per-branches-store";
import { ref } from "vue";

const productsPerBranchesstore = useProductPerBranchesStore();
const props = defineProps(["delete"]);

const onDelete = async () => {
  try {
    await productsPerBranchesstore.delete(props.delete.row.id);
    Notify.create({
      type: "negative",
      icon: "warning",
      message: `Ingredient successfully deleted`,
      timeout: 1000,
      position: "top",
    });
    dialog.value = false;
  } catch (error) {
    console.error(error.message);
  }
};
const dialog = ref(false);
const open_dialog = () => {
  dialog.value = true;
};
</script>
