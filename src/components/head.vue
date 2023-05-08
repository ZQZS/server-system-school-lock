<script setup>
import { ref, inject } from "vue";
import { IndentRight, IndentLeft } from "@icon-park/vue-next/es/map";
import { useStore } from "piniaPath/state.js";
import { ElMessage, ElMessageBox } from "element-plus";
const menuState = inject("menuState");
const router = inject("$router");
const useStoreV = useStore();

function switchMenuState(state) {
  if (state === "open") {
    menuState.isCollapse = false;
  } else {
    menuState.isCollapse = true;
  }
}
const indentIconColor = ref("#000");
function mouseHover() {
  indentIconColor.value = "#4a90e2";
}
function mouseLeave() {
  indentIconColor.value = "#000";
}
const handleCommand = command => {
  console.log(`click on item ${command}`);
};

function logout() {
  ElMessageBox.confirm("正在退出系统，是否继续", "Warning", {
    confirmButtonText: "是",
    cancelButtonText: "否",
    type: "warning"
  })
    .then(() => {
      useStoreV.setIsLogin(false);
      ElMessage({
        type: "success",
        message: "退出成功"
      });

      return router.push({ path: "/" });
    })
    .catch(() => {});
}
</script>
<template>
  <div class="inline-flex w-full h-full justify-between">
    <div class="flex justify-center items-center px-4">
      <indent-right
        v-if="menuState.isCollapse"
        class="cursor-pointer"
        theme="outline"
        size="30"
        :fill="indentIconColor"
        :strokeWidth="2"
        strokeLinecap="butt"
        @mousedown="switchMenuState('open')"
        @mouseenter="mouseHover"
        @mousemove="mouseHover"
        @mouseout="mouseLeave"
        @mouseleave="mouseLeave"
      />
      <indent-left
        v-else
        class="cursor-pointer"
        theme="outline"
        size="30"
        :fill="indentIconColor"
        :strokeWidth="2"
        strokeLinecap="butt"
        @mousedown="switchMenuState('close')"
        @mouseenter="mouseHover"
        @mousemove="mouseHover"
        @mouseout="mouseLeave"
        @mouseleave="mouseLeave"
      />
    </div>
    <div class="flex justify-center items-center text-xl">
      空间预约平台管理端
    </div>
    <div class="flex justify-center items-center px-4">
      <div class="px-4">你好，{{ useStoreV.user.userName }}</div>
      <el-dropdown @command="handleCommand">
        <div class="block outline-none">
          <el-avatar
            :size="45"
            src="../../public/logo.png"
          />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              command="logout"
              @click="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
