<script setup>
import { reactive, onMounted } from "vue";
import buttonV from "../../../../components/Button.vue";
const props = defineProps({
  isAdd: {
    type: Boolean,
    default: true
  },
  changeData: {
    type: Object,
    default: null
  }
});
const emits = defineEmits(["submit", "close"]);

const form = reactive({
  user_no: "",
  user_name: "",
  user_phone: "",
  user_password: "",
  user_power: ""
});
const onSubmit = () => {
  const date = { ...form };
  emits("submit", {
    form: date,
    isAdd: props.isAdd,
    id: props.changeData.user_no
  });
};
const onClose = () => {
  emits("close");
};

onMounted(() => {
  if (!props.isAdd && props.changeData) {
    for (const key in form) {
      form[key] = props.changeData[key];
    }
  }
});
</script>
<template>
  <div class="absolute z-40 bg-black opacity-30 w-full h-full" />
  <div
    class="p-8 absolute bg-white w-5/6 left-10 top-10 z-50 border-2 shadow-xl"
  >
    <el-form
      :model="form"
      label-width="120px"
    >
      <el-form-item label="用户账号">
        <el-input
          v-model="form.user_no"
          maxlength="20"
          minlength="5"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input
          v-model="form.user_name"
          maxlength="10"
          minlength="2"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="用户手机">
        <el-input
          v-model="form.user_phone"
          maxlength="15"
          minlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input
          v-model="form.user_password"
          maxlength="20"
          minlength="6"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="用户权限值">
        <el-input-number
          v-model="form.user_power"
          @change="handleChange"
        />
      </el-form-item>
    </el-form>
    <div class="flex items-center justify-center w-full bottom-8">
      <div class="inline-flex">
        <buttonV
          appearance="primary"
          @click="onSubmit"
          >{{ isAdd ? "添加" : "修改" }}</buttonV
        >
        <div class="px-32" />
        <buttonV
          appearance="danger"
          @click="onClose"
          >关闭</buttonV
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
