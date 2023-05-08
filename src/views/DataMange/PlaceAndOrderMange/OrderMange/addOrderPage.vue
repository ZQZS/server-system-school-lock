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
  order_id: "",
  order_place_id: "",
  order_user_no: "",
  order_time_start: "",
  order_time_end: "",
  order_place_password: "",
  order_state: "",
  order_apply_reason: "",
  order_reject_reason: "",
  order_rejecter: "",
  order_ordering_time: "",
  order_last_updateing_time: ""
});
const onSubmit = () => {
  const date = { ...form };
  emits("submit", {
    form: date,
    isAdd: props.isAdd,
    id: props.changeData.order_id
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
      if (key == "order_state")
        switch (form[key]) {
          case "已撤销":
            form[key] = 0;
            break;
          case "审核中":
            form[key] = 1;
            break;
          case "已通过":
            form[key] = 3;
            break;
          case "已驳回":
            form[key] = 4;
            break;
          case "已过期":
            form[key] = 5;
            break;
          default:
        }
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
      <el-form-item label="地点id">
        <el-input
          v-model="form.order_place_id"
          maxlength="10"
          minlength="5"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="用户账户">
        <el-input
          v-model="form.order_user_no"
          disabled
        />
      </el-form-item>
      <el-form-item label="预约开始时间">
        <el-input
          v-model="form.order_time_start"
          disabled
        />
      </el-form-item>
      <el-form-item label="预约结束时间">
        <el-input
          v-model="form.order_time_end"
          disabled
        />
      </el-form-item>
      <el-form-item label="房间密码">
        <el-input v-model="form.order_place_password" />
      </el-form-item>
      <el-form-item label="预约状态">
        <el-radio-group v-model="form.order_state">
          <el-radio
            :label="0"
            disabled
            >已撤销</el-radio
          >
          <el-radio :label="1">审核中</el-radio>
          <el-radio :label="3">已通过</el-radio>
          <el-radio :label="4">已驳回</el-radio>
          <el-radio
            :label="5"
            disabled
            >已过期</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="申请理由">
        <el-input
          v-model="form.order_apply_reason"
          disabled
        />
      </el-form-item>
      <el-form-item label="审核拒绝理由">
        <el-input v-model="form.order_reject_reason" />
      </el-form-item>
      <el-form-item label="审核拒绝人">
        <el-input v-model="form.order_rejecter" />
      </el-form-item>
      <el-form-item label="预约时间">
        <el-input
          v-model="form.order_ordering_time"
          disabled
        />
      </el-form-item>
      <el-form-item label="最后更新时间">
        <el-input
          v-model="form.order_last_updateing_time"
          disabled
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
