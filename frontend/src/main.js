import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import Bootstrap and BootstrapVue CSS files
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "../scss/custom.scss";

const app = createApp(App);

app.use(router);
app.mount("#app");
