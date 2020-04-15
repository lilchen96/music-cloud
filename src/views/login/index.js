import login from "@/views/login/login.vue";
import cellphoneForm from "@/views/login/cellphoneForm.vue";

export default [
  {
    name: "login",
    path: "/",
    component: login,
    meta: { title: "登录|music-cloud", deepth: 0 }
  },
  {
    name: "cellphoneForm",
    path: "/cellphoneForm",
    component: cellphoneForm,
    meta: { title: "手机号登录|music-cloud", deepth: 1 }
  }
];
