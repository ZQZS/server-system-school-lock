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
  power: "",
  role: "",
  hours: "",
  power_list: ""
});
const onSubmit = () => {
  const date = { ...form };
  date.power_list = form.power_list.join(",");
  emits("submit", {
    form: date,
    isAdd: props.isAdd,
    id: props.changeData.power
  });
};
const onClose = () => {
  emits("close");
};

onMounted(() => {
  if (!props.isAdd && props.changeData) {
    for (const key in form) {
      form[key] = props.changeData[key];
      if (key == "power_list" && form[key].split(",")[0] != "") {
        form[key] = form[key].split(",");
      }
    }
  }
});
const powerListOptions = [
  {
    value: "mange",
    label: "管理页面登录"
  },
  {
    value: "place",
    label: "房间管理"
  },
  {
    value: "order",
    label: "订单管理"
  },
  {
    value: "order_allow",
    label: "预约审批"
  },
  {
    value: "user",
    label: "用户管理"
  },
  {
    value: "role",
    label: "角色设置管理"
  },
  {
    value: "all",
    label: "所有权限（不包括管理页面登录）"
  }
];
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
      <el-form-item label="权限值">
        <el-input-number v-model="form.power" />
      </el-form-item>
      <el-form-item label="角色">
        <el-input
          v-model="form.role"
          maxlength="10"
          minlength="5"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="每月可用时间">
        <el-input-number v-model="form.hours" />
      </el-form-item>
      <el-form-item label="权限列表">
        <el-select
          v-model="form.power_list"
          multiple
          placeholder="选择管理端权限"
          style="width: 240px"
        >
          <el-option
            v-for="item in powerListOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
