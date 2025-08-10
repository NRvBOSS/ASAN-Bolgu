import "./assets/main.css";

import { createApp } from "vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Calendar from "primevue/calendar";

// ✅ Correct theme import for PrimeVue 3.53.1
import "primevue/resources/themes/saga-blue/theme.css";  // or 'saga-green', 'vela-blue', etc.
import "primevue/resources/primevue.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons

import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.component("Calendar", Calendar);

app.mount("#app");