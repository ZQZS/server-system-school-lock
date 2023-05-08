<script setup>
import { onBeforeMount, reactive } from "vue";
import ButtonV from "../components/Button.vue";
import { useApis } from "axiosPath/axios.js";
import { useStore } from "piniaPath/state.js";
import { ElMessage } from "element-plus";
const useStoreV = useStore();
const formLabelAlign = reactive({
  cells: 30,
  start_time: 8,
  cell_time: 30,
  early_open_time: 7,
  is_register_open: 1,
  examine: 1,
  oldCells: 0
});
onBeforeMount(() => {
  useApis("get", "./api/mange/getSettingMange2", {}, res => {
    for (const key in res.data.data) {
      formLabelAlign[key] = res.data.data[key];
    }
    formLabelAlign.is_register_open = formLabelAlign.is_register_open
      ? true
      : false;
    formLabelAlign.examine = formLabelAlign.examine ? true : false;
    formLabelAlign.oldCells = res.data.data.cells;
    useStoreV.setSetting(res.data.data);
  });
});

function onSubmit() {
  const date1 = { ...formLabelAlign };
  date1.is_register_open = date1.is_register_open ? 1 : 0;
  date1.examine = date1.examine ? 1 : 0;
  const cells = date1.cells;
  console.log(date1, formLabelAlign.oldCells);
  useApis(
    "post",
    "./api/mange/updateSettingMange",
    { data: { ...date1, change_id: formLabelAlign.oldCells } },
    () => {
      ElMessage({
        message: "保存成功",
        type: "success"
      });
      formLabelAlign.oldCells = cells;
    }
  );
}
</script>
<template>
  <div class="p-4">
    <div class="text-xl py-4">系统预约全局设置</div>
    <el-form
      label-position="top"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="单位数（一天多少个单位时间）">
        <el-input-number v-model="formLabelAlign.cells" />
      </el-form-item>
      <el-form-item label="开始时间（时）">
        <el-input-number v-model="formLabelAlign.start_time" />
      </el-form-item>
      <el-form-item label="单位时间（分）">
        <el-input-number v-model="formLabelAlign.cell_time" />
      </el-form-item>
      <el-form-item label="提前开放时间（天）">
        <el-input-number v-model="formLabelAlign.early_open_time" />
      </el-form-item>
      <el-form-item label="是否开放注册页面及功能">
        <el-switch
          v-model="formLabelAlign.is_register_open"
          size="large"
          :active-text="formLabelAlign.is_register_open ? '是' : '否'"
        ></el-switch>
      </el-form-item>
      <el-form-item label="是否需要审批">
        <el-switch
          v-model="formLabelAlign.examine"
          size="large"
          :active-text="formLabelAlign.examine ? '是' : '否'"
        ></el-switch>
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
