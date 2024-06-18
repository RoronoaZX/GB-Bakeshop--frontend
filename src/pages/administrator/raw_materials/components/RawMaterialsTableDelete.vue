<template>
  <q-btn
    @click="deleteDialog"
    color="negative"
    icon="delete"
    size="sm"
    flat
    round
    dense
  >
    <q-tooltip class="bg-negative" :delay="200">Delete</q-tooltip>
  </q-btn>
  <q-dialog v-model="dialogVisible">
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
import { ref } from "vue";
import { useRawMaterialStore } from "src/stores/raw-materials-store";
import { Notify } from "quasar";

const dialogVisible = ref(false);

const deleteDialog = () => {
  dialogVisible.value = true;
};

const materialsStore = useRawMaterialStore();
const props = defineProps(["delete"]);

const onDelete = async () => {
  try {
    await materialsStore.delete(props.delete.row.id);
    Notify.create({
      type: "negative",
      icon: "warning",
      message: `Ingredient ${props.delete.row.name}  successfully deleted`,
      timeout: 1000,
      position: "top",
    });
    dialogVisible.value = false;
  } catch (error) {
    console.error(error.message);
  }
};
</script>
