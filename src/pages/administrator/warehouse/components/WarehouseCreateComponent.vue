<template>
  <q-btn
    outline
    icon="add_circle"
    label="Add Warehouse"
    @click="open_adding_warehouse_dialog"
    style="background-color: #ef4444"
  />
  <q-dialog v-model="addWarehouseDialogVisible" persistent>
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
          <q-input
            v-model="addNewWarehouseForm.name"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div>Location</div>
          <q-input
            v-model="addNewWarehouseForm.location"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div>Person In-charge</div>
          <q-input
            v-model="addNewWarehouseForm.person_incharge"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div class="row q-gutter-x-sm">
          <div class="col-6">
            <div>Phone Number</div>
            <q-input
              v-model="addNewWarehouseForm.phone"
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
              v-model="addNewWarehouseForm.status"
              outlined
              dense
              :options="warehouseStatus"
              hide-dropdown-icon
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
          label="Create"
          @click="createWarehouse"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Notify } from "quasar";
import { useWarehousesStore } from "src/stores/warehouses-store";

const warehousesStore = useWarehousesStore();
const addWarehouseDialogVisible = ref(false);

const warehouseStatus = ["Open", "Close"];
const open_adding_warehouse_dialog = () => {
  addWarehouseDialogVisible.value = true;
};

const addNewWarehouseForm = reactive({
  name: "",
  location: "",
  person_incharge: "",
  phone: "",
  status: null,
});

const createWarehouse = async () => {
  try {
    await warehousesStore.create(addNewWarehouseForm);
    Notify.create({
      color: "positive",
      icon: "thumb_up",
      message: `${addNewWarehouseForm.name} Warehouse created successfully!`,
      position: "top",
    });
    addWarehouseDialogVisible.value = false;
    resetFormData();
  } catch (error) {
    console.error("Error creating warehouse:", error);

    Notify.create({
      color: "negative",
      icon: "warning",
      message: "Failed to create warehouse. Please try again.",
    });
  }
};
const resetFormData = () => {
  addNewWarehouseForm.name = "";
  addNewWarehouseForm.location = "";
  addNewWarehouseForm.person_incharge = "";
  addNewWarehouseForm.phone = "";
  addNewWarehouseForm.status = [""];
};
</script>
