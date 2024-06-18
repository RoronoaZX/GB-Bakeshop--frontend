<template>
  <div>
    <q-btn
      class="text-dark q-pa-sm"
      outline
      icon="add_circle"
      label="Add User"
      @click="openDialog"
    />
  </div>
  <q-dialog v-model="dialog" persistent>
    <q-card>
      <div class="q-ma-xm" align="right">
        <q-btn icon="close" flat dense round v-close-popup />
      </div>
      <div>
        <q-stepper
          class=""
          v-model="step"
          ref="stepper"
          animated
          done-color="green"
          active-color="blue"
          inactive-color="grey"
          flat
          align="center"
        >
          <q-step :name="1" title="Sign Up" icon="settings" :done="step > 1">
            <UserStep1 @updateData="setUser" :userData="user" />
          </q-step>
          <q-step
            :name="2"
            title="Personal Info"
            icon="settings"
            :done="step > 2"
          >
            <UserStep2 @updateData="setUserInfo" :userData="userInfo" />
          </q-step>
          <q-step
            :name="3"
            title="Checked Personal Info"
            icon="settings"
            :done="step > 3"
          >
            <UserStepFinish :userData="combinedUserData" @save="saveUser" />
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation class="q-ma-none">
              <div>
                <q-btn
                  v-if="step > 1"
                  flat
                  color="primary"
                  @click="$refs.stepper.previous()"
                  label="Back"
                  class="q-ml-sm"
                />
                <q-btn
                  :disable="isDisabled"
                  @click="nextStep"
                  color="primary"
                  :label="step === 3 ? 'Save' : 'Continue'"
                />
              </div>
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useUserStore } from "src/stores/user-store";
import UserStep1 from "./users_create_component/UserStep1.vue";
import UserStep2 from "./users_create_component/UserStep2.vue";
import UserStepFinish from "./users_create_component/UserStepFinish.vue";
import { ref, computed, reactive } from "vue";
import { Notify } from "quasar";
import { api } from "src/boot/axios";

const userStore = useUserStore();
const step = ref(1);
const isDisabled = ref(true);
const loading = ref(false);
const user = reactive({
  email: "",
  password: "",
});

const setUser = (data) => {
  Object.assign(user, data);
  if (data.password && data.confirmPass && data.password == data.confirmPass) {
    isDisabled.value = false;
  }
};
const userInfo = reactive({
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

const setUserInfo = (data) => {
  Object.assign(userInfo, data);
  if (
    data.user_first_name &&
    data.user_last_name &&
    data.user_address &&
    data.user_birthdate &&
    data.user_sex &&
    data.user_age &&
    data.user_status &&
    data.user_phone_number &&
    data.user_position
  ) {
    isDisabled.value = false;
  }
};

const combinedUserData = computed(() => ({
  ...user,
  ...userInfo,
}));
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const nextStep = () => {
  if (step.value === 3) {
    saveUser();
  } else {
    step.value++;
  }
};

const resetForm = () => {
  user.email = "";
  user.password = "";
  user.confirmPass = "";
  userInfo.user_first_name = "";
  userInfo.user_middle_name = "";
  userInfo.user_last_name = "";
  userInfo.user_address = "";
  userInfo.user_birthdate = "";
  userInfo.user_sex = "";
  userInfo.user_status = "";
  userInfo.user_phone_number = "";
  userInfo.user_position = "";
  step.value = 1;
  isDisabled.value = true;
};

const saveUser = async () => {
  loading.value = true;
  try {
    const userData = {
      email: `${user.email}@gmail.com`,
      password: user.password,
      password_confirmation: user.confirmPass,
      user_fullname: `${userInfo.user_first_name} ${userInfo.user_middle_name} ${userInfo.user_last_name}`,
      user_address: userInfo.user_address,
      user_birthdate: userInfo.user_birthdate,
      user_sex: userInfo.user_sex,
      user_status: userInfo.user_status,
      user_phone_number: userInfo.user_phone_number,
      user_position: userInfo.user_position,
    };

    const response = userStore.registerUser(userData);
    // await userStore.registerUser(combinedUserData);
    Notify.create({
      type: "positive",
      icon: "thumb_up",
      message: "Users registered successfully",
      timeout: 1000,
      position: "top",
    });
    console.log("User data saved: ", response.data);
    dialog.value = false;
    resetForm();
  } catch (error) {
    console.error("User Error message: ", error);
    Notify.create({
      type: "negative",
      message: "Failed to registered user!",
    });
  }
};
</script>

<style scoped>
.q-stepper--horizontal .q-stepper__step-inner {
  --q-stepper-step-inner-padding: 2px; /* Define your desired padding */
}
.profile-card {
  max-width: 400px;
  margin: 0 auto;
}

.profile-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-picture {
  position: relative;
  margin-bottom: 20px;
}

.avatar-image {
  border-radius: 50%;
  width: 150px;
  height: 150px;
}

.file-input {
  position: absolute;
  bottom: 5px;
  right: 5px;
  opacity: 0;
}

.full-width {
  width: 100%;
}
.q-stepper--horizontal .q-stepper__step-inner {
  padding: 5px;
}
</style>
