<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6">User Profile</div>
    </q-card-section>
    <q-card-section>
      <div v-for="(info, index) in profileInfo" :key="index" class="row">
        <div class="col-6">
          <q-chip square color="grey-1">{{ info.label }}</q-chip>
        </div>
        <div class="col-6">
          <div class="q-pa-sm">{{ info.value }}</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from "vue";

const { userData } = defineProps(["userData"]);
const { save } = defineEmits(["save"]);

const profileInfo = computed(() => [
  { label: "Username:", value: `${userData.email}@gmail.com` },
  {
    label: "Full Name:",
    value: `${userData.user_first_name
      .charAt(0)
      .toUpperCase()}${userData.user_first_name.slice(
      1
    )} ${userData.user_middle_name
      .charAt(0)
      .toUpperCase()}${userData.user_middle_name.slice(
      1
    )} ${userData.user_last_name
      .charAt(0)
      .toUpperCase()}${userData.user_last_name.slice(1)}`,
  },
  {
    label: "Address:",
    value: userData.user_address,
  },
  {
    label: "Birthdate:",
    value:
      userData.user_birthdate.charAt(0).toUpperCase() +
      userData.user_birthdate.slice(1),
  },
  {
    label: "Sex:",
    value:
      userData.user_sex.charAt(0).toUpperCase() + userData.user_sex.slice(1),
  },
  {
    label: "Status:",
    value: `${
      userData.user_status.charAt(0).toUpperCase() +
      userData.user_status.slice(1)
    } ${
      userData.user_position.charAt(0).toUpperCase() +
      userData.user_position.slice(1)
    }`,
  },
  {
    label: "Phone Number:",
    value:
      userData.user_phone_number.charAt(0).toUpperCase() +
      userData.user_phone_number.slice(1),
  },
  {
    label: "Position:",
    value:
      userData.user_position.charAt(0).toUpperCase() +
      userData.user_position.slice(1),
  },
]);

const saveUserProfile = () => {
  emit("save");
};
</script>

<style lang="scss" scoped></style>
