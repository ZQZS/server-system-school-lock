<script setup>
import { provide, reactive, inject, watch } from "vue";
import headVue from "./components/head.vue";
import menuVue from "./components/menu.vue";
import Login from "./Login/Login.vue";
import { useStore } from "piniaPath/state.js";
const menuState = reactive({
  isCollapse: false
});
const useStoreV = useStore();
const cookies = inject("$cookies");
const router = inject("$router");
router.push({ path: "/" });
if (cookies.isKey("mange_info")) {
  const mange_info = cookies.get("mange_info");
  useStoreV.setIsLogin(true);
  useStoreV.setUser({
    userName: mange_info.user_name, //用户姓名
    userNo: mange_info.user_no, //学工号
    phone: mange_info.user_phone, //手机号码 可空
    hours: mange_info.user_hour //每月使用时间
  });
  useStoreV.setPowerList(mange_info.user_power_list);
}
provide("menuState", menuState);

watch(
  () => useStoreV.isLogin,
  newV => {
    if (!newV) router.push({ path: "/" });
  }
);
</script>
<template>
  <div>
    <div class="bg-div"></div>
    <div v-if="!useStoreV.isLogin"><Login /></div>
    <div v-else>
      <el-backtop
        :right="100"
        :bottom="100"
      />
      <div
        id="container"
        class="w-full h-full flex bg-white divide-x-2"
      >
        <div class="rounded-l-md"><menuVue /></div>
        <div class="w-full divide-y-2 flex flex-col">
          <div class="h-16 rounded-tr-md"><headVue /></div>
          <div class="w-full min-h-[88vh] rounded-br-md relative">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
.bg-div {
  width: 100%;
  height: 100%;
  opacity: 0.3;
  position: fixed;
  background: url("../public/logo.png") no-repeat center center;
  background-size: contain;
  z-index: -1;
}
</style>
