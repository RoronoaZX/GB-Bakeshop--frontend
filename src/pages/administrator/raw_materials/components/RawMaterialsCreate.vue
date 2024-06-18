<template>
  <q-btn
    class="q-pa-sm"
    outline
    dense
    elevated
    icon="add_circle"
    label="Add Ingredients"
    @click="open_add_ingredients_dialog"
    size="md"
  />
  <q-dialog v-model="createRawMaterialsDialog">
    <q-card class="my-card" style="width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">Add Raw Materials</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
        <div>
          <div class="q-my-sm">Raw Materials Name</div>
          <q-input
            v-model="addRawMaterialsForm.name"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div class="q-my-sm">Raw Materials Code</div>
          <q-input
            v-model="addRawMaterialsForm.code"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
            mask="##-AAAAAAAAAAAAAAAAAAAAA"
            placeholder="00-SAMPLE"
          />
        </div>
        <div>
          <div class="q-my-sm">Category</div>
          <q-select
            v-model="addRawMaterialsForm.category"
            :options="rawMaterialsCategory"
            hide-dropdown-icon
            outlined
            dense
            behavior="menu"
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div class="q-my-sm">Unit</div>
          <q-select
            v-model="addRawMaterialsForm.unit"
            :options="ingredientsUnitOptions"
            hide-dropdown-icon
            outlined
            dense
            behavior="menu"
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
      </q-card-section>
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Cancel" v-close-popup />
        <q-btn
          @click="createRawMaterials"
          class="glossy"
          color="teal"
          label="Create"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Notify } from "quasar";
import { useRawMaterialStore } from "src/stores/raw-materials-store";

const rawMaterialStore = useRawMaterialStore();
const createRawMaterialsDialog = ref(false);
const rawMaterialsCategory = ["Ingredients", "Packaging Materials"];
const ingredientsUnitOptions = ["Grams", "Pcs"];
const loading = ref(false);
const open_add_ingredients_dialog = () => {
  createRawMaterialsDialog.value = true;
};
const addRawMaterialsForm = reactive({
  name: "",
  code: "",
  category: null,
  unit: null,
});

const createRawMaterials = async () => {
  loading.value = true;
  try {
    await rawMaterialStore.create(addRawMaterialsForm);
    Notify.create({
      type: "positive",
      icon: "thumb_up",
      message: "Ingredient created successfully",
      timeout: 1000,
      position: "top",
    });
    createRawMaterialsDialog.value = false;
    resetCreateRawMaterials();
  } catch (error) {
    Notify.create({
      type: "negative",
      message: "Failed to save product:" + error.message,
    });
  } finally {
    loading.value = false;
  }
};

const resetCreateRawMaterials = () => {
  addRawMaterialsForm.name = "";
  addRawMaterialsForm.code = "";
  addRawMaterialsForm.category = "";
  addRawMaterialsForm.unit = "";
};
</script>
