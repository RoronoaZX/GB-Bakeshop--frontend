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
        <div class="text-h6">Edit Branch</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
        <div>
          <div>Name of Branch</div>
          <q-input v-model="editBranchesForm.name" outlined dense />
        </div>
        <div>
          <div>Location</div>
          <q-input v-model="editBranchesForm.location" outlined dense />
        </div>
        <div>
          <div>Person In-charge</div>
          <q-input v-model="editBranchesForm.person_incharge" outlined dense />
        </div>
        <div>
          <div>Under Warehouse</div>
          <q-select
            v-model="editBranchesForm.warehouse_id"
            use-input
            input-debounce="0"
            :options="warehouseOptions"
            stack-label
            outlined
            dense
            emit-value
            map-options
            map-option-label="name"
            map-option-value="id"
          />
        </div>
        <div class="row q-gutter-x-sm">
          <div class="col-6">
            <div>Phone Number</div>
            <q-input
              v-model="editBranchesForm.phone"
              outlined
              dense
              mask="(+63) ### - ### - ####"
              placeholder="(+63) ### - ### - ####"
              :rules="[(val) => val && val.length > 0]"
            />
          </div>
          <div class="col-5">
            <div>Status</div>
            <q-select
              v-model="editBranchesForm.status"
              outlined
              dense
              :options="statusOptions"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Save"
          @click="saveEditedBranches"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { update_branches_service } from "src/services/branches-service";
import { get_all_warehouse_service } from "src/services/warehouse-service";
import { reactive, ref, onMounted } from "vue";
const props = defineProps(["edit"]);
const dialog = ref(false);
const warehouseOptions = ref([]);
let editRow = props.edit.row;
const statusOptions = ["Open", "Open soon", "Close"];

const editBranchesForm = reactive({
  name: "",
  location: "",
  person_incharge: "",
  warehouse_id: null,
  phone: "",
  status: null,
});

const openEditForm = () => {
  console.log("Edit Row Data:", editRow);
  editBranchesForm.name = editRow.name;
  editBranchesForm.location = editRow.location;
  editBranchesForm.person_incharge = editRow.person_incharge;
  editBranchesForm.warehouse_id = editRow.warehouse_id || editRow.warehouse.id;
  editBranchesForm.phone = editRow.phone;
  editBranchesForm.status = editRow.status;
  dialog.value = true;
  console.log("Edit Data:", editBranchesForm);
};

const fetchWarehouseData = async () => {
  try {
    const warehouses = await get_all_warehouse_service();
    warehouseOptions.value = warehouses.map((warehouse) => ({
      label: warehouse.name,
      value: warehouse.id,
    }));
  } catch (error) {
    console.error("Error fetching warehouse data:", error);
  }
};

onMounted(fetchWarehouseData);

const saveEditedBranches = async () => {
  try {
    const updatedBranch = {
      id: editRow.id,
      name: editBranchesForm.name,
      location: editBranchesForm.location,
      person_incharge: editBranchesForm.person_incharge,
      warehouse_id: editBranchesForm.warehouse_id, // Use warehouse ID directly
      phone: editBranchesForm.phone,
      status: editBranchesForm.status,
    };
    console.log("Updated Branch ID:", updatedBranch.id);
    await update_branches_service(updatedBranch.id, updatedBranch);
    Notify.create({
      type: "positive",
      message: "Branch updated successfully",
    });
    dialog.value = false;
  } catch (error) {
    Notify.create({
      type: "negative",
      message: "Error updating branch",
    });
    console.error("Error updating branch:", error);
  }
};
</script>
