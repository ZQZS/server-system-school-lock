<script setup>
import { reactive } from "vue";
import buttonV from "../../../../components/Button.vue";
import { useStore } from "piniaPath/state.js";
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
const useStoreV = useStore();
const form = reactive({
  order_reject_reason: "",
  order_rejecter: useStoreV.user.userName
});
const onSubmit = () => {
  const date = { ...form };
  emits("submit", {
    form: date,
    id: props.changeData.order_id
  });
};
const onClose = () => {
  emits("close");
};
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
      <el-form-item label="审核拒绝理由">
        <el-input v-model="form.order_reject_reason" />
      </el-form-item>
      <el-form-item label="审核拒绝人">
        <el-input
          v-model="form.order_rejecter"
          disabled
        />
      </el-form-item>
    </el-form>
    <div class="flex items-center justify-center w-full bottom-8">
      <div class="inline-flex">
        <buttonV
          appearance="primary"
          @click="onSubmit"
          >确定</buttonV
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
