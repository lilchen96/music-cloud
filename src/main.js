import Vue from "vue";
import store from "@/store";
import createRouter from "@/router";
import service from "@/service";
import components from "@/components";
import util from "@/assets/util";
import App from "./App.vue";

import "@/assets/css/commom.css";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(components); // 全局注册组件
Vue.prototype.$axios = service; // 封装axios
Vue.prototype.$util = util; // 封装工具对象

new Vue({
    store,
    router: createRouter(),
    render: h => h(App)
}).$mount("#app");
