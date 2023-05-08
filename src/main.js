import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import { router } from "./router/router.js";
import VueCookies from "vue-cookies";
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
const app = createApp(App);
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }
// app.config.globalProperties.$cookies = VueCookies; //全局挂载 同vue2.x Vue.prototype.$cookies
app.provide("$cookies", VueCookies);
app.provide("$router", router);
app.use(VueCookies);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount("#app");
