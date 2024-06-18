<template>
  <q-btn
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
    @click="openEditForm"
  >
    <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
  </q-btn>
  <q-dialog v-model="editRawMaterialsDialog">
    <q-card class="my-card" style="width: 400px">
      <q-card-section class="row items-center">
        <div class="text-h6">Edit Ingredients</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
        <div>
          <div class="q-my-sm">Ingredient Name</div>
          <q-input v-model="editRawMaterialsForm.name" outlined dense />
        </div>
        <div>
          <div class="q-my-sm">Ingredient Code</div>
          <q-input
            v-model="editRawMaterialsForm.code"
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
            v-model="editRawMaterialsForm.category"
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
            v-model="editRawMaterialsForm.unit"
            :options="ingredientsUnitOptions"
            outlined
            dense
            behavior="menu"
          />
        </div>
      </q-card-section>
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Cancel" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Save"
          @click="saveEditedIngredient"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRawMaterialStore } from "src/stores/raw-materials-store";
import { Notify } from "quasar";

const rawMaterialStore = useRawMaterialStore();
const editRawMaterialsDialog = ref(false);
const rawMaterialsCategory = ["Ingredients", "Packaging Materials"];
const ingredientsUnitOptions = ["Grams", "Pcs"];

const props = defineProps(["edit"]);

const editRawMaterialsForm = reactive({
  name: "",
  code: "",
  category: null,
  unit: null,
});

const openEditForm = () => {
  Object.assign(editRawMaterialsForm, props.edit.row);
  editRawMaterialsDialog.value = true;
};

const saveEditedIngredient = async () => {
  try {
    const updatedRawMaterials = { ...props.edit.row, ...editRawMaterialsForm };
    await rawMaterialStore.update(props.edit.row.id, updatedRawMaterials);
    Notify.create({
      type: "warning",
      icon: "check",
      message: `${props.edit.row.name} ingredient successfully updated!`,
      position: "top",
    });

    editRawMaterialsDialog.value = false;
  } catch (error) {
    console.error("Failed to update ingredient:", error);
  }
};

// const saveEditedIngredient = async () => {
//   try {
//     const originalRawMaterials = props.edit.row;
//     const updatedRawMaterials = {
//       id: originalRawMaterials.id,
//       name: editRawMaterialsForm.name,
//       code: editRawMaterialsForm.code,
//       category: editRawMaterialsForm.category,
//       unit: editRawMaterialsForm.unit,
//     };
//     const changedFields = [];
//     if (originalRawMaterials.name !== updatedRawMaterials.name) {
//       changedFields.push(
//         `Name: ${originalRawMaterials.name} to $ updatedRawMaterials.name}`
//       );
//     }
//     if (originalRawMaterials.code !== updatedRawMaterials.code) {
//       changedFields.push(
//         `Code: ${originalRawMaterials.code} to $ updatedRawMaterials.code}`
//       );
//     }
//     if (originalRawMaterials.unit !== updatedRawMaterials.unit) {
//       changedFields.push(
//         `Unit: ${originalRawMaterials.unit} to $ updatedRawMaterials.unit}`
//       );
//     }

//     await rawMaterialStore.update(props.edit.row.id, updatedRawMaterials);
//     Notify.create({
//       type: "warning",
//       icon: "check",
//       message: `${props.edit.row.name} ingredient successfully updated!`,
//       position: "top",
//     });

//     editRawMaterialsDialog.value = false;
//     if (response.status === 2000) {
//       console.log("Ingredient updated successfully:", response.data);
//     } else {
//       console.log("Failed to update ingredient:", response);
//     }
//   } catch (error) {}
// };
</script>
