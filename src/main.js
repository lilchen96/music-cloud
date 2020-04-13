import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
import createRouter from "@/router";

import "@/assets/css/commom.css";

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  store,
  router: createRouter(),
  render: h => h(App)
}).$mount("#app");
