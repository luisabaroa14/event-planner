import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import Bootstrap and BootstrapVue CSS files
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Import FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import custom SCSS
import "../scss/custom.scss";
import '../scss/responsive.scss';
import '../scss/anims.scss';

// Import VCalendar and its styles
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

// Import Carousel and its styles
import "vue3-carousel/dist/carousel.css";

const app = createApp(App);

app.use(VCalendar, {})

app.use(router);
app.mount("#app");
