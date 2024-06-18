<template>
  <q-btn
    class="text-dark q-pa-sm"
    outline
    dense
    elevated
    icon="add_circle"
    label="Add Store Branch"
    @click="openAddingStoreBranchDialog"
    style="background-color: #ef4444"
  />
  <q-dialog v-model="addNewBranchDialogVisible" persistent>
    <q-card class="my-card" style="width: 400px">
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ef4444"
      >
        <div class="text-h6">Add New Branch</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section class="q-my-sm q-mx-md q-gutter-y-sm">
        <div>
          <div>Name of Branch</div>
          <q-input
            v-model="addNewBranchForm.name"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div>Location</div>
          <q-input
            v-model="addNewBranchForm.location"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div>Person In-charge</div>
          <q-input
            v-model="addNewBranchForm.person_incharge"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div>Warehouse</div>
          <q-select
            v-model="selectedWarehouse"
            clearable
            use-input
            input-debounce="0"
            :options="filterWarehouseOptions"
            hide-dropdown-icon
            stack-label
            outlined
            dense
            @filter="filterWarehouses"
            behavior="menu"
          />
        </div>
        <div class="row q-gutter-x-sm justify-between">
          <div class="col-6">
            <div>Phone Number</div>
            <q-input
              v-model="addNewBranchForm.phone"
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
              v-model="addNewBranchForm.status"
              outlined
              dense
              :options="statusOptions"
              hide-dropdown-icon
              behavior="menu"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Create"
          @click="addNewBranch"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { Notify } from "quasar";
import { useBranchesStore } from "src/stores/branches-store";
import { useWarehousesStore } from "src/stores/warehouses-store";

const addNewBranchDialogVisible = ref(false);
const branchStore = useBranchesStore();

const openAddingStoreBranchDialog = () => {
  addNewBranchDialogVisible.value = true;
};

const warehousesStore = useWarehousesStore();
const warehouseOptions = ref([]);
const filterWarehouseOptions = ref([]);
const loading = ref(false);
const statusOptions = ["Open", "Open soon", "Close"];

const selectedWarehouse = ref(null);

const addNewBranchForm = reactive({
  name: "",
  location: "",
  person_incharge: "",
  phone: "",
  status: "",
});

const fetchWarehouseData = async () => {
  loading.value = true;
  try {
    await warehousesStore.fetchWarehouses();
    warehouseOptions.value = warehousesStore.warehouses.map((val) => ({
      label: val.name,
      value: val.id,
    }));
    filterWarehouseOptions.value = warehouseOptions.value;
  } catch (error) {
    console.error("Error fetching warehouse data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchWarehouseData);

const filterWarehouses = (val, update) => {
  update(() => {
    const needle = val.toLowerCase();
    filterWarehouseOptions.value =
      val === ""
        ? warehouseOptions.value
        : warehouseOptions.value.filter((v) =>
            v.label.toLowerCase().includes(needle)
          );
  });
};

const addNewBranch = async () => {
  try {
    const formData = {
      ...addNewBranchForm,
      warehouse_id: selectedWarehouse.value?.value || null,
    };
    await branchStore.create(formData);
    Notify.create({
      color: "positive",
      icon: "check",
      message: "Branch created successfully!",
    });
    addNewBranchDialogVisible.value = false;
    resetFormData();
  } catch (error) {
    console.error("Error creating branch:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to create branch. Please try again.";
    Notify.create({
      color: "negative",
      icon: "warning",
      message: errorMessage,
    });
  }
};

const resetFormData = () => {
  addNewBranchForm.name = "";
  addNewBranchForm.location = "";
  addNewBranchForm.person_incharge = "";
  selectedWarehouse.value = null;
  addNewBranchForm.phone = "";
  addNewBranchForm.status = "";
};
</script>
