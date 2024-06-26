<template>
  <q-card
    class="my-card q-pa-lg q-ma-lg"
    style="
      width: 430px;
      max-width: 90%;
      height: 80%;
      max-height: 1000px;
      min-height: none;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    "
  >
    <q-card-section>
      <div class="text-h5 text-center text-red-6 q-mb-md">
        Welcome to GB Bakeshop!
      </div>
      <div class="text-caption q-pt-sm text-center text-grey-8">
        Please log in to continue.
      </div>
    </q-card-section>

    <q-card-section class="q-mt-md">
      <q-form @submit="login">
        <div class="q-gutter-y-md">
          <q-input
            v-model="username"
            outlined
            placeholder="Username"
            dense
            autofocus
            required
            style="border-radius: 8px"
          />
          <q-input
            v-model="password"
            outlined
            placeholder="Password"
            :type="isPwd ? 'password' : 'text'"
            dense
            required
            style="border-radius: 8px"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                @click="isPwd = !isPwd"
                class="cursor-pointer"
                style="color: #9e9e9e"
              />
            </template>
          </q-input>
        </div>
        <!-- <q-checkbox v-model="rememberMe" label="Remember me" dense /> -->
        <div class="q-my-lg text-center">
          <q-btn
            type="submit"
            color="red-6"
            label="Login"
            class="q-mt-md"
            dense
            :loading="loading"
            :disable="!formIsValid"
            style="width: 100%; max-width: 350px; border-radius: 8px"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { Notify, useQuasar } from "quasar";
import { useRouter } from "vue-router";
import api from "src/boot/axios"; // Import the configured Axios instance

const isPwd = ref(true);
<<<<<<< HEAD
const username = ref("admin@gmail.com");
const password = ref("admin12345");
=======
const username = ref("alverta25@example.net");
const password = ref("admin123");

>>>>>>> parent of 477a444 (added bearer token to fetch the user has middleware)
const loading = ref(false);
const user = ref(null);

const formIsValid = computed(
  () => username.value !== "" && password.value !== ""
);

const quasar = useQuasar();
const router = useRouter();

const login = async () => {
  if (!formIsValid.value) {
    Notify.create({
      message: "Please fill in all fields.",
      color: "negative",
      position: "top",
      timeout: 1000,
    });
    return;
  }

  loading.value = true;

<<<<<<< HEAD
  try {
    // await api.get("http://127.0.0.1:8000/sanctum/csrf-cookie"); // Fetch CSRF token

    const response = await api.post("auth/login", {
      email: username.value,
      password: password.value,
    });

    const { data } = await api.get("http://127.0.0.1:8000/api/user");
    user.value = data;

    Notify.create({
      position: "top",
      color: "positive",
      message: "Logged in successfully!",
      timeout: 1000,
    });

    // Handle redirection based on user roles or other logic here
=======
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      quasar.notify({
        position: "top",
        color: "positive",
        message: "Logged in successfully!",
      });
      console.log("response", response);
      const role = response.data.user.role;
      if (role === "Admin") {
        router.push("/admin/dashboard");
      } else if (role === "Super Admin") {
        router.push("/admin/dashboard");
      } else if (role === "Cashier") {
        router.push("/branch/sales_lady");
      } else if (role === "Baker") {
        router.push("/branch/baker");
      } else {
        router.push("/");
      }
    }
    loading.value = true;
>>>>>>> parent of 477a444 (added bearer token to fetch the user has middleware)
  } catch (error) {
    quasar.notify({
      position: "top",
      color: "negative",
      message: "Login failed. Please check your credentials.",
    });
  } finally {
    loading.value = false;
  }
};
</script>
<style scoped>
.text-primary {
  color: #f44336; /* Primary color for the welcome message */
}

.my-card {
  background-color: #ffffff; /* White background for card */
  animation: mymove 2s infinite;
}

.q-input .q-field__control {
  font-size: 16px; /* Increased font size for inputs */
}

.q-input .q-field__control::placeholder {
  color: #9e9e9e; /* Light gray placeholder text */
}

.q-input .q-icon {
  cursor: pointer;
}

.q-btn {
  background-color: #f44336; /* Primary color for button */
  color: #ffffff; /* White text for button */
}

.q-btn:disabled {
  background-color: #e0e0e0; /* Light gray background for disabled button */
  color: #9e9e9e; /* Gray text for disabled button */
}

@keyframes mymove {
  50% {
    box-shadow: 10px 20px 30px rgb(254, 154, 154);
  }
}
</style>
