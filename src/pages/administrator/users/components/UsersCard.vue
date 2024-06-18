<template>
  <div class="q-pa-md elegant-container">
    <div align="right">
      <q-input
        class="q-pb-lg"
        v-model="searchQuery"
        @update:model-value="search"
        outlined
        placeholder="Search"
        debounce="1000"
        flat
        dense
        rounded
        style="width: 100%; max-width: 600px"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div v-if="loading" class="skeleton-wrapper row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="n in 8" :key="n">
        <q-card class="user-card skeleton-card">
          <q-skeleton type="image" height="200px" class="q-mb-md" />
          <q-card-section class="text-center">
            <q-skeleton type="circle" size="80px" class="q-mb-md" />
            <q-skeleton type="text" width="60%" class="q-mt-lg" />
            <q-skeleton type="text" width="40%" class="q-mt-sm" />
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-skeleton type="text" width="80%" class="q-mb-sm" />
            <q-skeleton type="text" width="60%" class="q-mb-sm" />
            <q-skeleton type="text" width="70%" class="q-mb-sm" />
            <q-skeleton type="text" width="50%" class="q-mb-sm" />
            <q-skeleton type="text" width="90%" class="q-mt-md" />
          </q-card-section>
          <q-separator />
          <q-card-actions class="q-pa-md text-center">
            <q-skeleton type="rect" width="40%" height="36px" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div v-else-if="showNoDataMessage" class="data-error">
      <q-icon name="error" size="50px" color="negative" />
      <div>No data available</div>
    </div>
    <div v-else class="q-pa-md row q-col-gutter-md">
      <div
        v-for="user in userRows"
        :key="user.id"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="user-card">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-card-section class="text-center">
            <div>
              <q-avatar
                icon="person"
                size="80px"
                color="primary"
                text-color="white"
                class="q-mb-md absolute"
                style="top: 0; left: 12px; transform: translateY(-50%)"
              />
            </div>
            <div class="q-mt-lg">
              <div
                class="text-h6 text-weight-medium elegant-name text-capitalize"
              >
                {{ user.firstname }}
                <!-- {{ user.middlename.charAt(0).toUpperCase() + "." }} -->
                {{ user.lastname }}
              </div>
              <q-chip
                :color="getBadgePositionColor(user.role)"
                text-color="white"
                class="q-mt-sm elegant-chip"
              >
                {{ user.role }}
              </q-chip>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="q-mb-sm elegant-detail">
              <q-icon name="mail" class="q-mr-sm" />
              <span>{{ user.email }}</span>
            </div>
            <div class="q-mb-sm elegant-detail">
              <q-icon name="calendar_today" class="q-mr-sm" />
              <span>{{ user.birthdateFormatted }}</span>
            </div>
            <div class="q-mb-sm elegant-detail">
              <q-icon name="smartphone" class="q-mr-sm" />
              <span>{{ user.phone }}</span>
            </div>
            <div class="q-mb-sm elegant-detail text-capitalize">
              <q-icon name="location_on" class="q-mr-sm" />
              <span>{{ user.address }}</span>
            </div>
            <div class="row q-mt-md justify-between">
              <div class="text-subtitle1 text-weight-light">
                <q-chip outline square class="elegant-chip-outline">
                  Employment Status
                </q-chip>
              </div>
              <q-chip
                outline
                :color="getBadgeStatusColor(user.status)"
                text-color="white"
                class="q-mr-xs elegant-chip"
              >
                {{ user.status }}
              </q-chip>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions class="q-pa-md text-center">
            <q-btn
              class="text-subtitle2 elegant-btn"
              outline
              dense
              flat
              label="View Profile"
              :to="`/admin/users/${user.id}`"
            >
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "src/stores/user-store";
import { computed, onMounted, ref, watch } from "vue";
import { date } from "quasar";

const userStore = useUserStore();
const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM D, YYYY");
};
const userRows = computed(() =>
  userStore.users.map((user) => ({
    ...user,
    birthdateFormatted: formatDate(user.birthdate),
  }))
);
const loading = ref(true);
const showNoDataMessage = ref(false);
const searchQuery = ref("");

const search = async () => {
  loading.value = true;
  showNoDataMessage.value = false;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  try {
    if (searchQuery.value.trim() === "") {
      await userStore.fetchUser();
    } else {
      await userStore.searchUser(searchQuery.value);
    }
    showNoDataMessage.value = userRows.value.length === 0;
  } catch (error) {
    console.error("Error fetching user:", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

watch(searchQuery, async (newValue) => {
  if (newValue.trim() === "") {
    await search();
  }
});

onMounted(async () => {
  loading.value = true;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  try {
    await Promise.all([
      userStore.fetchUser(),
      delay(5000), // Ensures the skeleton loader is displayed for at least 5 seconds
    ]);
    showNoDataMessage.value = userRows.value.length === 0;
  } catch (error) {
    console.error("Error fetching users:", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
});

const getBadgePositionColor = (role) => {
  switch (role) {
    case "Super Admin":
      return "negative";
    case "Admin":
      return "blue-grey-8";
    case "Scaler":
      return "info";
    case "Lamesador":
      return "indigo";
    case "Hornero":
      return "purple";
    case "Baker":
      return "warning";
    case "Cashier":
      return "secondary";
    case "Sales Clerk":
      return "deep-orange";
    case "Utility":
      return "deep-purple";
    case "Not Yet Assigned":
      return "grey";
    default:
      return "grey";
  }
};

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "Current":
      return "positive";
    case "Former":
      return "red-6";
    default:
      return "grey";
  }
};
</script>
<style lang="scss" scoped>
.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.elegant-container {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  color: #333;
}

.elegant-search {
  margin-bottom: 2rem;
  border: 1px solid #ccc;
  border-radius: 25px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.skeleton-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.skeleton-wrapper .col-xs-12 {
  margin-bottom: 1rem;
}

.skeleton-card {
  height: 100%;
  border-radius: 15px;
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.user-card {
  height: 100%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.text-center {
  text-align: center;
}

.q-mb-sm {
  margin-bottom: 0.5rem;
}

.elegant-name {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: #555;
}

.elegant-chip {
  background-color: #007bff;
  border-radius: 8px;
  color: #fff;
}

.elegant-chip-outline {
  border-color: #007bff;
  color: #007bff;
}

.elegant-detail {
  display: flex;
  align-items: center;
  color: #777;
}

.elegant-btn {
  color: #007bff;
  border-color: #007bff;
  font-weight: 600;
}
</style>
