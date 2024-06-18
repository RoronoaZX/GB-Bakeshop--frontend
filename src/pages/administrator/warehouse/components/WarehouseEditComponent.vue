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
  <q-dialog v-model="dialog" persistent>
    <q-card class="my-card" style="width: 400px">
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ef4444"
      >
        <div class="text-h6">Add New Warehouse</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
        <div>
          <div>Name of Warehouse</div>
          <q-input v-model="editWarehouseForm.name" outlined dense />
        </div>
        <div>
          <div>Location</div>
          <q-input v-model="editWarehouseForm.location" outlined dense />
        </div>
        <div>
          <div>Person In-charge</div>
          <q-input v-model="editWarehouseForm.person_incharge" outlined dense />
        </div>
        <div class="row q-gutter-x-sm">
          <div class="col-6">
            <div>Phone Number</div>
            <q-input
              v-model="editWarehouseForm.phone"
              outlined
              dense
              mask="(+63) ### - ### - ####"
              placeholder="(+63)### - ### - ####"
              :rules="[(val) => val && val.length > 0]"
            />
          </div>
          <div class="col-5">
            <div>Status</div>
            <q-select
              v-model="editWarehouseForm.status"
              outlined
              dense
              :options="statusOptions"
              behavior="menu"
            />
          </div>
        </div>
      </q-card-section>
      <!-- <q-separator /> -->
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Save"
          @click="saveEditedWarehouse"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { useWarehousesStore } from "src/stores/warehouses-store";
import { ref, reactive, TrackOpTypes } from "vue";

const warehouseStore = useWarehousesStore();
const dialog = ref(false);

const statusOptions = ["Open", "Closed"];
const props = defineProps(["edit"]);

const editWarehouseForm = reactive({
  name: "",
  location: "",
  person_incharge: "",
  phone: "",
  status: null,
});

const openEditForm = () => {
  Object.assign(editWarehouseForm, props.edit.row);
  dialog.value = true;
};

const saveEditedWarehouse = async () => {
  try {
    const updatedWarehouse = { ...props.edit.row, ...editWarehouseForm };
    await warehouseStore.update(props.edit.row.id, updatedWarehouse);
    Notify.create({
      type: "warning",
      icon: "check",
      message: `${props.edit.row.name} ingredient successfully updated!`,
      position: "top",
    });
    dialog.value = false;
  } catch (error) {
    console.error("Failed to update ingredients:", error);
  }
};

// const saveEditedWarehouse = async () => {
//   try {
//     const originalWarehouse = props.edit.row;
//     const updatedWarehouse = {
//       id: originalWarehouse.id,
//       name: editWarehouseForm.name,
//       location: editWarehouseForm.location,
//       person_incharge: editWarehouseForm.person_incharge,
//       phone: editWarehouseForm.phone,
//       status: editWarehouseForm.status,
//     };
//     const changedFields = [];
//     if (originalWarehouse.name !== updatedWarehouse.name) {
//       changedFields.push(
//         `Name: ${originalWarehouse.name} to ${updatedWarehouse.name}`
//       );
//     }
//     if (originalWarehouse.location !== updatedWarehouse.location) {
//       changedFields.push(
//         `Location: ${originalWarehouse.location} to ${updatedWarehouse.location}`
//       );
//     }
//     if (
//       originalWarehouse.person_incharge !== updatedWarehouse.person_incharge
//     ) {
//       changedFields.push(
//         `Person Incharge: ${originalWarehouse.person_incharge} to ${updatedWarehouse.person_incharge}`
//       );
//     }
//     if (originalWarehouse.phone !== updatedWarehouse.phone) {
//       changedFields.push(
//         `Phone: ${originalWarehouse.phone} to ${updatedWarehouse.phone}`
//       );
//     }
//     if (originalWarehouse.status !== updatedWarehouse.status) {
//       changedFields.push(
//         `Status: ${originalWarehouse.status} to ${updatedWarehouse.status}`
//       );
//     }
//     await warehouseStore.update(props.edit.row.id, updatedWarehouse);
//     Notify.create({
//       type: "warning",
//       icon: "check",
//       message: ` Warehouse ${props.edit.row.name} updated successfully`,
//       position: "top",
//     });
//     dialog.value = false;
//     if (response.status === 2000) {
//       console.log("Ingredient updated successfully:", response.data);
//     } else {
//       console.error("Failed to update ingredient:", response.error);
//     }
//   } catch (error) {}
// };
</script>
