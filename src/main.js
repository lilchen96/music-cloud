import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
import createRouter from "@/router";
import service from "@/service";

import "@/assets/css/commom.css";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.prototype.$axios = service;

new Vue({
  store,
  router: createRouter(),
  render: h => h(App)
}).$mount("#app");
