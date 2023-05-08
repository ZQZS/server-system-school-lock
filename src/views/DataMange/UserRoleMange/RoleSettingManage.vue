<script setup>
import { ref, computed, watch } from "vue";
import buttonV from "../../../components/Button.vue";
import { ElLoading, ElMessage, ElMessageBox } from "element-plus";
import { useApis } from "axiosPath/axios.js";
import addRoleSettingPage from "./RoleSettubfMange/addRoleSettingPage.vue";
const hideOnSinglePage = ref(true);
const page = ref(1);
const tableData = ref([]);
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    data => !search.value || data.role.includes(search.value)
  )
);
const pageSize = 10;
const total = ref(0);
const loading = ElLoading.service({
  lock: true,
  text: "正在获取...",
  background: "rgba(0, 0, 0, 0.7)"
});
useApis(
  "post",
  "./api/mange/getRoleMange",
  { data: { startPage: (page.value - 1) * 10, pageSize } },
  res => {
    tableData.value = [];
    tableData.value = res.data.data.placeListRes;
    total.value = res.data.data.num;
    loading.close();
  },
  loading
);
watch(page, newV => {
  const loading = ElLoading.service({
    lock: true,
    text: "正在获取...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  useApis(
    "post",
    "./api/mange/getRoleMange",
    { data: { startPage: (newV - 1) * 10, pageSize } },
    res => {
      tableData.value = [];
      tableData.value = res.data.data.placeListRes;
      total.value = res.data.data.num;
      loading.close();
    },
    loading
  );
});

const tableHead = ["power", "role", "hours", "power_list"];
const tableChinaHead = {
  power: "权限值",
  role: "角色",
  hours: "每月可用时间",
  power_list: "权限列表"
};
const isAdd = ref(false);
const isOpen = ref(false);
const changeData = ref({});
function handleEdit(index, row) {
  console.log(index, row);
  changeData.value = { ...row };
  isAdd.value = false;
  isOpen.value = true;
}
function handleAdd() {
  isAdd.value = true;
  isOpen.value = true;
}

function onClose() {
  isAdd.value = false;
  isOpen.value = false;
}
function onSubmit(data) {
  console.log(data);
  let loading = ElLoading.service({
    lock: true,
    text: "正在更新...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  if (!data.isAdd) {
    useApis(
      "post",
      "./api/mange/updateRoleMange",
      { data: { ...data.form, change_id: data.id } },
      () => {
        loading.close();
        isAdd.value = false;
        isOpen.value = false;
      },
      loading
    );
    loading = ElLoading.service({
      lock: true,
      text: "正在获取...",
      background: "rgba(0, 0, 0, 0.7)"
    });
    useApis(
      "post",
      "./api/mange/getRoleMange",
      { data: { startPage: (page.value - 1) * 10, pageSize } },
      res => {
        tableData.value = [];
        tableData.value = res.data.data.placeListRes;
        total.value = res.data.data.num;
        loading.close();
      },
      loading
    );
  } else {
    useApis(
      "post",
      "./api/mange/addRoleMange",
      { data: { ...data.form } },
      res => {
        if (!res.data.error) {
          ElMessage({
            message: "添加成功",
            type: "success"
          });
          isAdd.value = false;
          isOpen.value = false;
          loading = ElLoading.service({
            lock: true,
            text: "正在获取...",
            background: "rgba(0, 0, 0, 0.7)"
          });
          useApis(
            "post",
            "./api/mange/getRoleMange",
            { data: { startPage: (page.value - 1) * 10, pageSize } },
            res => {
              tableData.value = [];
              tableData.value = res.data.data.placeListRes;
              total.value = res.data.data.num;
              loading.close();
            },
            loading
          );
        }
        loading.close();
      },
      loading
    );
  }
}
function handleDelete(index, row) {
  ElMessageBox.confirm("现在进行删除该条记录操作，是否继续", "Warning", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    useApis(
      "post",
      "./api/mange/deleteRoleMange",
      { data: { power: row.power } },
      () => {
        ElMessage({
          type: "success",
          message: "删除成功"
        });
        loading.close();
      },
      loading
    );
    useApis(
      "post",
      "./api/mange/getRoleMange",
      { data: { startPage: (page.value - 1) * 10, pageSize } },
      res => {
        tableData.value = [];
        tableData.value = res.data.data.placeListRes;
        total.value = res.data.data.num;
      }
    );
  });
}
</script>
<template>
  <div class="grid relative">
    <el-table
      :data="filterTableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        v-for="(value, key) in tableHead"
        :key="key"
        :prop="value"
        :label="tableChinaHead[value]"
      />
      <el-table-column
        fixed="right"
        align="right"
        width="250"
      >
        <template #header>
          <div class="inline-flex mx-4">
            <el-input
              v-model="search"
              size="small"
              placeholder="Type to search"
              class="w-28 pr-2"
            />
            <buttonV
              appearance="primary-g"
              @click="handleAdd"
              >添加</buttonV
            >
          </div>
        </template>
        <template #default="scope">
          <div class="px-4 inline-flex justify-between">
            <buttonV
              size="small"
              appearance="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</buttonV
            >
            <div class="w-4 px-4"></div>
            <buttonV
              size="small"
              appearance="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</buttonV
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center items-center pt-8 mb-4 bottom-3">
      <el-pagination
        v-model:current-page="page"
        background
        :hide-on-single-page="hideOnSinglePage"
        layout="prev, pager, next"
        :total="total"
      />
    </div>
    <addRoleSettingPage
      v-if="isOpen"
      :is-add="isAdd"
      :change-data="changeData"
      @submit="onSubmit"
      @close="onClose"
    />
  </div>
</template>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
