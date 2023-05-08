<script setup>
import { ref, inject } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from "@element-plus/icons-vue";
import { useStore } from "piniaPath/state.js";
const useStoreV = useStore();

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const menuState = inject("menuState");
</script>
<template>
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo pt-8"
    router
    :collapse="menuState.isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="/">
      <el-icon><icon-menu /></el-icon>
      <template #title>数据屏</template>
    </el-menu-item>
    <el-sub-menu index="/">
      <template #title>
        <el-icon><location /></el-icon>
        <span>数据管理</span>
      </template>
      <el-menu-item-group>
        <template #title><span>房间及订单管理</span></template>
        <el-menu-item
          v-if="
            useStoreV.powerList.includes('all') ||
            useStoreV.powerList.includes('place')
          "
          index="/PlaceMange"
          >房间管理</el-menu-item
        >
        <el-menu-item
          v-if="
            useStoreV.powerList.includes('all') ||
            useStoreV.powerList.includes('order')
          "
          index="/OrderMange"
          >订单管理</el-menu-item
        >
        <el-menu-item
          v-if="
            useStoreV.powerList.includes('all') ||
            useStoreV.powerList.includes('order_allow')
          "
          index="/OrderAllowMange"
          >预约审批</el-menu-item
        >
      </el-menu-item-group>
      <el-menu-item-group title="用户角色管理">
        <el-menu-item
          v-if="
            useStoreV.powerList.includes('all') ||
            useStoreV.powerList.includes('user')
          "
          index="/userInfoMange"
          >用户管理</el-menu-item
        >
        <el-menu-item
          v-if="
            useStoreV.powerList.includes('all') ||
            useStoreV.powerList.includes('role')
          "
          index="/RoleSettingManage"
          >角色设置管理</el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>

    <el-menu-item index="/UserInfo">
      <el-icon><document /></el-icon>
      <template #title>个人信息</template>
    </el-menu-item>
    <el-menu-item
      v-if="
        useStoreV.powerList.includes('all') ||
        useStoreV.powerList.includes('setting')
      "
      index="/Setting"
    >
      <el-icon><setting /></el-icon>
      <template #title>设置</template>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
