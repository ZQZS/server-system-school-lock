<script setup>
import { reactive } from "vue";
import buttonV from "../../../../components/Button.vue";
import { useStore } from "piniaPath/state.js";
const useStoreV = useStore();
const form = reactive({
  order_place_id: "",
  role: "",
  character: "",
  power: -1,
  start_date: "",
  start_time: "",
  end_date: "",
  end_time: "",
  order_state: 3,
  order_reject_reason: "",
  order_rejecter: useStoreV.user.userName
});
const emits = defineEmits(["submit", "close"]);

const onSubmit = () => {
  emits("submit", form);
};
const onClose = () => {
  emits("close");
};
const characterOption = ["=", "<", ">", ">=", "<=", "!="];
</script>
<template>
  <div class="absolute z-40 bg-black opacity-30 w-full h-full" />
  <div
    class="p-8 absolute bg-white w-4/5 h-4/5 min-h-[36rem] left-10 top-10 z-50 border-2 shadow-xl"
  >
    <el-form
      :model="form"
      label-width="120px"
    >
      <el-form-item label="根据地点编号id">
        <el-input v-model="form.order_place_id" />
      </el-form-item>
      <el-form-item label="根据角色筛选">
        <el-input v-model="form.role" />
      </el-form-item>
      <el-form-item label="根据权力值">
        <div class="flex justify-start w-full">
          <el-select
            v-model="form.character"
            placeholder="请选择符号"
            class="pr-4"
          >
            <el-option
              v-for="(item, key) of characterOption"
              :key="key"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-input-number
            v-model="form.power"
            :min="-1"
          />
        </div>
      </el-form-item>
      <div class="pb-2 pl-10 text-sm text-slate-600">
        注：如使用区间时间，必须四个选项都要填上，否则不生效
      </div>
      <el-form-item label="区间:开始">
        <el-col :span="11">
          <el-date-picker
            v-model="form.start_date"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-col>
        <el-col
          :span="2"
          class="text-center"
        >
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.start_time"
            placeholder="选择时间"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="区间:结束">
        <el-col :span="11">
          <el-date-picker
            v-model="form.end_date"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-col>
        <el-col
          :span="2"
          class="text-center"
        >
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.end_time"
            placeholder="选择时间"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="审批">
        <el-radio-group v-model="form.order_state">
          <el-radio :label="3">允许</el-radio>
          <el-radio :label="4">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.order_state == 4"
        label="拒绝理由"
      >
        <el-input
          v-model="form.order_reject_reason"
          type="textarea"
        />
      </el-form-item>
      <el-form-item
        v-if="form.order_state == 4"
        label="拒绝人"
      >
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
