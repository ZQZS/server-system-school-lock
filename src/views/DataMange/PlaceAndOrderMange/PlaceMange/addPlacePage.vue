<script setup>
import { reactive, onMounted } from "vue";
import buttonV from "../../../../components/Button.vue";
import { ElLoading } from "element-plus";
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
  place_id: "",
  place_name: "",
  place_label: "",
  place_introduction: "",
  place_early_open_time: 7
});
const onSubmit = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "正在更新...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  emits("submit", {
    form,
    isAdd: props.isAdd,
    loading,
    id: props.changeData.place_id
  });
};
const onClose = () => {
  emits("close");
};

onMounted(() => {
  console.log(props.changeData);
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
      <el-form-item label="房间id">
        <el-input
          v-model="form.place_id"
          maxlength="10"
          minlength="5"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="房间名字">
        <el-input
          v-model="form.place_name"
          maxlength="10"
          minlength="5"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="房间简介">
        <el-input
          v-model="form.place_label"
          maxlength="20"
          minlength="5"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="房间介绍">
        <el-input
          v-model="form.place_introduction"
          type="textarea"
          maxlength="40"
          minlength="5"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="最早开放时间">
        <el-input-number
          v-model="form.place_early_open_time"
          :min="1"
          :max="10"
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
