<template>
  <q-card flat style="width: 500px; max-width: 80vw">
    <q-card-section>
      <div class="q-gutter-y-sm">
        <div class="q-gutter-y-sm q-mx-auto">
          <q-input
            class="text-capitalize"
            v-model="userPersonalInfoForm.user_first_name"
            @update:model-value="$emit('updateData', userPersonalInfoForm)"
            outlined
            dense
            label="First Name"
            :rules="[(val) => (val && val.length > 0) || 'Required']"
          />
          <q-input
            class="text-capitalize"
            v-model="userPersonalInfoForm.user_middle_name"
            @update:model-value="$emit('updateData', userPersonalInfoForm)"
            outlined
            dense
            label="Middle Name"
            :rules="[(val) => (val && val.length > 0) || 'Required']"
          />
          <q-input
            class="text-capitalize"
            v-model="userPersonalInfoForm.user_last_name"
            @update:model-value="$emit('updateData', userPersonalInfoForm)"
            outlined
            dense
            label="Last Name"
            :rules="[(val) => (val && val.length > 0) || 'Required']"
          />
          <q-input
            class="text-capitalize"
            v-model="userPersonalInfoForm.user_address"
            @update:model-value="$emit('updateData', userPersonalInfoForm)"
            outlined
            dense
            label="Address"
            :rules="[(val) => (val && val.length > 0) || 'Required']"
          />
        </div>
        <div class="row q-gutter-x-sm item-start">
          <div>
            <q-input
              v-model="userPersonalInfoForm.user_birthdate"
              @update:model-value="$emit('updateData', userPersonalInfoForm)"
              outlined
              dense
              label="Birthdate"
              type="date"
              style="width: 230px"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
            />
          </div>
          <div>
            <q-select
              v-model="userPersonalInfoForm.user_sex"
              @update:model-value="$emit('updateData', userPersonalInfoForm)"
              dense
              outlined
              label="Sex"
              :options="genderOptions"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
              style="width: 120px"
              behavior="menu"
              hide-dropdown-icon
            />
          </div>
          <div>
            <q-select
              v-model="userPersonalInfoForm.user_status"
              :options="statusOptions"
              @update:model-value="$emit('updateData', userPersonalInfoForm)"
              dense
              outlined
              hide-dropdown-icon
              label="Status"
              style="width: 100px"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
              behavior="menu"
            />
          </div>
        </div>
        <div class="row q-gutter-x-md">
          <div>
            <q-input
              v-model="userPersonalInfoForm.user_phone_number"
              @update:model-value="$emit('updateData', userPersonalInfoForm)"
              outlined
              dense
              label="Phone Number"
              mask="+(63) ### - ### - ####"
              placeholder="(+63) ### - ### - ####"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
              style="width: 300px; max-width: 500px; min-width: 100px"
            />
          </div>
          <div>
            <q-select
              v-model="userPersonalInfoForm.user_position"
              @update:model-value="$emit('updateData', userPersonalInfoForm)"
              outlined
              dense
              hide-dropdown-icon
              label="Position"
              :options="positionOptions"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
              style="width: 150px; max-width: 500px; min-width: 100px"
            />
          </div>
        </div>
        <!-- <div class="row q-gutter-x-md">
          <q-select
            outlined
            flat
            dense
            label="Designation"
            style="width: 350px; max-width: 500px; min-width: 100px"
            hide-dropdown-icon
          />
        </div> -->
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { onMounted, reactive } from "vue";

defineEmits(["updateData"]);
const { userData } = defineProps(["userData"]);

const positionOptions = [
  "Super Admin",
  "Admin",
  "Scaler",
  "Lamesador",
  "Hornero",
  "Baker",
  "Cashier",
  "Sales Clerk",
  "Utility",
  "Not Yet Assigned",
];
const genderOptions = ["Male", "Female"];
const statusOptions = ["Current", "Former"];
const userPersonalInfoForm = reactive({
  user_first_name: "",
  user_middle_name: "",
  user_last_name: "",
  user_address: "",
  user_birthdate: "",
  user_sex: "",
  user_status: "",
  user_phone_number: "",
  user_position: "",
});

onMounted(() => {
  Object.assign(userPersonalInfoForm, userData);
});
</script>

<style lang="scss" scoped></style>
