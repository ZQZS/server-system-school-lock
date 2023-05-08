<script setup>
import { reactive } from "vue";
import ButtonV from "../components/Button.vue";
import { useStore } from "piniaPath/state.js";
import { useApis } from "axiosPath/axios.js";
import { ElMessage } from "element-plus";
const useStoreV = useStore();
const formLabelAlign = reactive({
  userName: useStoreV.user.userName,
  userPhone: useStoreV.user.phone,
  userPassword: ""
});
useApis("get", "./api/mange/getMangeInfo", {}, res => {
  useStoreV.user.userName = res.data.data.user_name;
  useStoreV.user.phone = res.data.data.user_phone;
  formLabelAlign.userName = res.data.data.user_name;
  formLabelAlign.userPhone = res.data.data.user_phone;
});
function onSubmit() {
  if (
    formLabelAlign.userPassword != "" &&
    formLabelAlign.userPassword.length < 6
  ) {
    ElMessage({
      message: "密码长度不能低于6位",
      type: "error"
    });
    return;
  }
  const data = {
    user_phone: formLabelAlign.userPhone,
    user_name: formLabelAlign.userName,
    user_password: formLabelAlign.userPassword
  };
  useApis("post", "./api/mange/updateMangeInfo", { data: { ...data } }, () => {
    ElMessage({
      message: "保存成功",
      type: "success"
    });
  });
}
</script>
<template>
  <div class="p-4">
    <div class="text-xl py-4">个人信息</div>
    <el-form
      label-position="top"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="姓名">
        <el-input v-model="formLabelAlign.userName" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="formLabelAlign.userPhone" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="formLabelAlign.userPassword"
          maxlength="20"
          minlength="5"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <div class="flex justify-center items-center w-full py-8">
      <ButtonV
        appearance="primary"
        @click="onSubmit"
        >保存</ButtonV
      >
    </div>
  </div>
</template>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
