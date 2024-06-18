<template>
  <q-btn round flat>
    <q-avatar size="26px">
      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
    </q-avatar>
    <q-menu
      transition-show="scale"
      transition-hide="scale"
      anchor="bottom left"
      self="top left"
    >
      <q-list style="min-width: 100px">
        <q-item clickable>
          <q-item-section avatar>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="q-text-truncate text-primary text-capitalize">
              {{ `${user.firstname} ${user.lastname}` }}
            </div>
          </q-item-section>
          <!-- <q-item-section>{{ `${user.lastname}` }}</q-item-section> -->
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-avatar icon="settings" size="xl" />
          </q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable @click="signOut">
          <q-item-section avatar>
            <q-avatar icon="logout" size="xl" />
          </q-item-section>
          <q-item-section>Sign Out</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <q-dialog v-model="loading">
      <q-card>
        <q-card-section class="row items-center q-gutter-md">
          <span class="q-ml-md">Signing out</span>
          <q-spinner-dots size="50px" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-btn>
</template>

<script setup>
import { LocalStorage, useQuasar } from "quasar";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const quasar = useQuasar();
const router = useRouter();
const loading = ref(false);

const user = JSON.parse(LocalStorage.getItem("user"));

const signOut = async () => {
  try {
    loading.value = true;
    await axios.post(
      "http://127.0.0.1:8000/api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
        },
      }
    );
    LocalStorage.removeItem("token");
    LocalStorage.removeItem("role");
    LocalStorage.removeItem("user");
    LocalStorage.removeItem("activeMenuItem");
    setTimeout(() => {
      loading.value = false;
      router.push("/");
    }, 5000);
  } catch (error) {
    console.error("Logout failed:", error);
  }

  // try {

  //   LocalStorage.removeItem("token");
  //   LocalStorage.removeItem("role");
  //   LocalStorage.removeItem("activeMenuItem");

  //   router.push("/");

  //   quasar.notify({
  //     position: "top",
  //     color: "positive",
  //     message: "Signed out successfully!",
  //   });
  // } catch (error) {
  //   quasar.notify({
  //     position: "top",
  //     color: "negative",
  //     message: "Sign out failed. Please try again later.",
  //   });
  // }
};
</script>

<style lang="scss" scoped></style>
