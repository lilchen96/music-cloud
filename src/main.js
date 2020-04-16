import Vue from "vue";
import store from "@/store";
import createRouter from "@/router";
import service from "@/service";
import components from "@/components";
import App from "./App.vue";

import "@/assets/css/commom.css";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(components); // 全局注册组件
Vue.prototype.$axios = service; // 封装axios

new Vue({
    store,
    router: createRouter(),
    render: h => h(App)
}).$mount("#app");
