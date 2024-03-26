import { createApp, markRaw } from "vue";
import { MotionPlugin } from "@vueuse/motion";
import App from "./App.vue";
import routes from "./routes";
import "./index.css";
import { createPinia } from 'pinia';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import BaseTitle from "@components/BaseTitle.vue";
import BaseSubtitle from "@components/BaseSubtitle.vue";
import TheNavBar from "@components/TheNavBar/TheNavBar.vue";
import TheFooter from "@components/TheFooter.vue";
import BaseHeaderImage from "@components/BaseHeaderImage.vue";
import intersectionDirective from "@/directives/IntersectDirective";
import './axios';
const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(routes);
});
library.add(fab, fas);

const app = createApp(App);
app.use(pinia)
app.component("TheNavBar", TheNavBar);
app.component("TheFooter", TheFooter);
app.component("BaseHeaderImage", BaseHeaderImage);
app.component("BaseTitle", BaseTitle);
app.component("BaseSubtitle", BaseSubtitle);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(routes);
app.use(intersectionDirective);
app.use(MotionPlugin);

app.mount("#app");