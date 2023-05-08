import { createRouter, createWebHashHistory } from "vue-router";
import DataView from "../views/DataView.vue";
// import OrderMange from "../views/DataMange/PlaceAndOrderMange/OrderMange.vue";
// import PlaceMange from "../views/DataMange/PlaceAndOrderMange/PlaceMange.vue";
// import OrderAllowMange from "../views/DataMange/PlaceAndOrderMange/OrderAllowMange.vue";
// import RoleSettingManage from "../views/DataMange/UserRoleMange/RoleSettingManage.vue";
// import userInfoMange from "../views/DataMange/UserRoleMange/userInfoMange.vue";
// import Setting from "../views/Setting.vue";
// import UserInfo from "../views/UserInfo.vue";

// import Login from "../views/Login/Login.vue";
const routes = [
  { path: "/", component: DataView },
  {
    path: "/OrderMange",
    component: () =>
      import("../views/DataMange/PlaceAndOrderMange/OrderMange.vue")
  },
  {
    path: "/PlaceMange",
    component: () =>
      import("../views/DataMange/PlaceAndOrderMange/PlaceMange.vue")
  },
  {
    path: "/OrderAllowMange",
    component: () =>
      import("../views/DataMange/PlaceAndOrderMange/OrderAllowMange.vue")
  },
  {
    path: "/RoleSettingManage",
    component: () =>
      import("../views/DataMange/UserRoleMange/RoleSettingManage.vue")
  },
  {
    path: "/userInfoMange",
    component: () =>
      import("../views/DataMange/UserRoleMange/userInfoMange.vue")
  },
  { path: "/Setting", component: () => import("../views/Setting.vue") },
  { path: "/UserInfo", component: () => import("../views/UserInfo.vue") }
];
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
});
