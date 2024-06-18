import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Ensure the correct path to your router file
import { Quasar, LocalStorage } from "quasar";
import quasarUserOptions from "./quasar-user-options"; // If you have specific Quasar options

const app = createApp(App);

app.use(Quasar, quasarUserOptions);
app.use(router);
app.mount("#app");
