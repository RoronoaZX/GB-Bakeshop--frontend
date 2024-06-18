<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="bg-white">
        <q-toolbar>
          <q-btn
            color="red-6"
            flat
            @click="drawer = !drawer"
            round
            dense
            icon="menu"
          />
          <q-toolbar-title class="text-red-6 text-weight-bold"
            >GB Bakeshop</q-toolbar-title
          >

          <div class="q-gutter-sm row items-center no-wrap">
            <q-btn round dense flat icon="message" v-if="$q.screen.gt.sm">
              <q-tooltip>Messages</q-tooltip>
            </q-btn>
            <q-btn round dense flat color="grey-10" icon="notifications">
              <q-badge color="red" class="text-white" floating> 2 </q-badge>
              <q-tooltip>Notifications</q-tooltip>
            </q-btn>
            <q-btn round flat>
              <q-avatar size="26px">
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>
              <q-menu>
                <div class="row no-wrap q-pa-md">
                  <div class="column">
                    <div class="text-h6 q-mb-md">Settings</div>
                    <q-list>
                      <q-separator />
                      <q-item clickable>
                        <q-item-section>Account</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item clickable>
                        <q-item-section>Help &amp; Feedback</q-item-section>
                      </q-item>
                    </q-list>
                    <!-- <q-toggle v-model="mobileData" label="Use Mobile Data" />
                    <q-toggle v-model="bluetooth" label="Bluetooth" /> -->
                  </div>

                  <q-separator vertical inset class="q-mx-lg" />

                  <div class="column items-center">
                    <q-avatar size="72px">
                      <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                    </q-avatar>

                    <div class="text-subtitle1 q-mt-md q-mb-xs">
                      {{ ` ${user.firstname}  ${user.lastname}` }}
                    </div>

                    <q-btn
                      color="primary"
                      label="Logout"
                      push
                      size="sm"
                      @click="signOut"
                      v-close-popup
                    />
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        behavior="mobile"
        :width="200"
        :breakpoint="500"
        bordered
      >
        <q-scroll-area class="fit">
          <q-list bordered padding>
            <q-item
              :clickable="true"
              v-for="(item, index) in menuItems"
              :key="index"
              @click="setActiveMenuItem(item.name)"
              :to="item.to"
              :active="activeMenuItem === item.name"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                {{ item.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page>
          <router-view />
        </q-page>
      </q-page-container>
      <q-dialog v-model="loading">
        <q-card>
          <q-card-section class="row items-center q-gutter-md">
            <span class="q-ml-md">Signing out</span>
            <q-spinner-dots size="50px" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { LocalStorage, useQuasar } from "quasar";
import { useRouter } from "vue-router";

const drawer = ref(false);
const activeMenuItem = ref("0");
const quasar = useQuasar();
const router = useRouter();
const loading = ref(false);
const user = JSON.parse(LocalStorage.getItem("user"));

async function fetch_user_account() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/user",
      {}, // You can send your request body here if needed
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching user account:", error);
  }
}

fetch_user_account();
const signOut = async () => {
  try {
    loading.value = true;
    await axios.post(
      "http://127.0.0.1:8000/api/auth/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          // "X-CSRF-TOKEN": "fsYAIn7o07DR3CAsexV6jXIdSDXwZTdOsccPUjSc6f134bd2",
          Accept: "application/json",
          Authorization: `Bearer 19|KwrIEUTDpeXPZdRsWPXZ2tVTNdDCPqODJNyAel7wc43d7bce`,
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
};

// const signOut = () => {
//   try {
//     LocalStorage.removeItem("token");
//     LocalStorage.removeItem("role");
//     LocalStorage.removeItem("user");
//     router.push("/");
//     quasar.notify({
//       position: "top",
//       color: "positive",
//       message: "Signed out successfully!",
//     });
//   } catch (error) {
//     quasar.notify({
//       position: "top",
//       color: "negative",
//       message: "Sign out failed. Please try again later.",
//     });
//   }
// };

const menuItems = [
  {
    name: "analytics",
    icon: "query_stats",
    to: "/branch/sales_lady",
    label: "Analytics",
    separator: true,
  },
  {
    name: "bread",
    icon: "fa-solid fa-cake-candles",
    to: "/branch/sales_lady/products",
    label: "Products",
    separator: true,
  },
  // {
  //   name: "expences",
  //   icon: "wysiwyg",
  //   to: "/branch/expences",
  //   label: "Expences",
  //   separator: true,
  // },
  {
    name: "bakersReport",
    icon: "fact_check",
    to: "/branch/sales_lady/bakers_report",
    label: "Bakers Report",
    separator: true,
  },
  {
    name: "rawMaterials",
    icon: "fact_check",
    to: "/branch/sales_lady/report",
    label: "Report",
    separator: true,
  },
  {
    name: "historyLogs",
    icon: "history",
    to: "/branch/sales_lady/history_logs",
    label: "History Logs",
    separator: true,
  },
  {
    name: "accounts",
    icon: "person",
    to: "/branch/sales_lady/account",
    label: "Accounts",
    separator: true,
  },
];
onMounted(() => {
  const storedActiveMenuItem = localStorage.getItem("activeMenuItem");
  if (storedActiveMenuItem) {
    activeMenuItem.value = storedActiveMenuItem;
  }
});

// Function to update activeMenuItem and store it in localStorage
const setActiveMenuItem = (itemName) => {
  activeMenuItem.value = itemName;
  localStorage.setItem("activeMenuItem", itemName);
};
</script>

<style scoped>
.my-menu-link {
  color: white;
  background: #ef4444;
}
.account-card {
  position: absolute;
  z-index: 999; /* Ensure the card is above other elements */
}
</style>
