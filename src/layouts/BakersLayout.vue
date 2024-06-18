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

                    <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

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
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { LocalStorage, useQuasar } from "quasar";
import { useRouter } from "vue-router";

const drawer = ref(false);
const activeMenuItem = ref("0");

const quasar = useQuasar();
const router = useRouter();

const signOut = async () => {
  try {
    LocalStorage.removeItem("token");
    LocalStorage.removeItem("role");
    LocalStorage.removeItem("user");
    LocalStorage.removeItem("activeMenuItem");
    router.push("/");
  } catch (error) {
    quasar.notify({
      position: "top",
      color: "negative",
      message: "Sign out failed. Please try again later.",
    });
  }
};

const menuItems = [
  {
    name: "rawMaterials",
    icon: "fa-solid fa-layer-group",
    to: "/branch/baker",
    label: "Raw Materials",
    separator: true,
  },
  {
    name: "transaction",
    icon: "fa-solid fa-cake-candles",
    to: "/branch/baker/transaction",
    label: "Transaction",
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
    name: "report",
    icon: "fact_check",
    to: "/branch/baker/report",
    label: "Report",
    separator: true,
  },
  {
    name: "accounts",
    icon: "person",
    to: "/branch/baker/account",
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
