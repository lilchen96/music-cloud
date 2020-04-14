import login from "@/view/login/login.vue";
import cellphoneForm from "@/view/login/cellphoneForm.vue";

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
