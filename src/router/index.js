import Vue from "vue";
import VueRouter from "vue-router";

import HelloWorld from "@/components/HelloWorld.vue";
import pageNotFound from "@/view/404NotFound.vue";
import debug from "@/view/debug.vue";

// 路由配置
const routes = [
  {
    name: "HelloWorld",
    path: "/",
    component: HelloWorld,
    meta: { title: "登录|music-cloud" }
  },
  {
    name: "debug",
    path: "/debug",
    component: debug,
    meta: { title: "调试|music-cloud" }
  },
  {
    name: "pageNotFound",
    path: "*",
    component: pageNotFound
  }
];

// 配置路由的钩子函数
const beforeEach = (to, from, next) => {
  // 根据路由信息源更改网页title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
};

const beforeResolve = (to, from, next) => {
  next();
};

const afterEach = (to, from) => {};

export default function() {
  Vue.use(VueRouter);
  const router = new VueRouter({
    mode: "history",
    routes
  });
  router.beforeEach(beforeEach);
  router.beforeResolve(beforeResolve);
  router.afterEach(afterEach);

  return router;
}
