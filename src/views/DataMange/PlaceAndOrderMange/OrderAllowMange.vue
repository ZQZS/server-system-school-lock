<script setup>
import { ref, computed, watch } from "vue";
import buttonV from "../../../components/Button.vue";
import OneButtonAllowAllOrderMange from "./OneButtonAllowAllOrderMange/OneButtonAllowAllOrderMange.vue";
import ExamineOrderState from "./OneButtonAllowAllOrderMange/ExamineOrderState.vue";

import { ElLoading, ElMessage } from "element-plus";
import { useApis } from "axiosPath/axios.js";
const hideOnSinglePage = ref(true);
const page = ref(1);
const tableData = ref([]);
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(data => {
    if (!data.order_time_start.includes("/")) {
      data.order_time_start = getTime(data.order_time_start);
      data.order_time_end = getTime(data.order_time_end);
      data.order_ordering_time = getTime(data.order_ordering_time);
      data.order_last_updateing_time = getTime(data.order_last_updateing_time);
    }
    //'已撤销':0, '审核中':1，'已通过':3，'已驳回':4，'已过期':5
    switch (data.order_state) {
      case 0:
        data.order_state = "已撤销";
        break;
      case 1:
        data.order_state = "审核中";
        break;
      case 3:
        data.order_state = "已通过";
        break;
      case 4:
        data.order_state = "已驳回";
        break;
      case 5:
        data.order_state = "已过期";
        break;
      default:
    }
    return (
      !search.value ||
      data.order_place_id.toLowerCase().includes(search.value.toLowerCase()) ||
      data.order_user_no.toLowerCase().includes(search.value.toLowerCase()) ||
      data.order_time_start
        .toLowerCase()
        .includes(search.value.toLowerCase()) ||
      data.order_time_end.toLowerCase().includes(search.value.toLowerCase()) ||
      data.order_state.includes(search.value)
    );
  })
);
function getTime(data) {
  const date = new Date();
  date.setTime(data);
  const s = `${date.getFullYear()}/${
    date.getMonth() - 0 + 1
  }/${date.getDate()} ${date.getHours()}:${(date.getMinutes() + "").padStart(
    2,
    "0"
  )}`;
  return s;
}
const pageSize = 10;
const total = ref(0);
const loading = ElLoading.service({
  lock: true,
  text: "正在获取...",
  background: "rgba(0, 0, 0, 0.7)"
});
useApis(
  "post",
  "./api/mange/getNeedAllowOrderMange",
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
    "./api/mange/getNeedAllowOrderMange",
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

const tableHead = [
  "order_id",
  "order_place_id",
  "order_user_no",
  "order_time_start",
  "order_time_end",
  "order_place_password",
  "order_state",
  "order_apply_reason",
  "order_reject_reason",
  "order_rejecter",
  "order_ordering_time",
  "order_last_updateing_time"
];
const tableChinaHead = {
  order_id: "id",
  order_place_id: "地点id",
  order_user_no: "用户账号",
  order_time_start: "预约开始时间",
  order_time_end: "预约结束时间",
  order_place_password: "房间密码",
  order_state: "预约状态",
  order_apply_reason: "申请理由",
  order_reject_reason: "审核拒绝理由",
  order_rejecter: "审核拒绝人",
  order_ordering_time: "预约时间",
  order_last_updateing_time: "最后更新时间"
};

const isOpen = ref(false);
const isRejectOpen = ref(false);
const changeDate = ref({});
function handleAdd() {
  isOpen.value = true;
}
function onClose() {
  isOpen.value = false;
}
function onSubmit(form) {
  const data = { ...form };
  if (
    data.start_date != "" &&
    data.start_time != "" &&
    data.end_date != "" &&
    data.end_time != ""
  ) {
    const d1 = new Date(
      data.start_date.getFullYear(),
      data.start_date.getMonth(),
      data.start_date.getDate(),
      data.start_time.getHours(),
      data.start_time.getMinutes()
    );
    const d2 = new Date(
      data.end_date.getFullYear(),
      data.end_date.getMonth(),
      data.end_date.getDate(),
      data.end_time.getHours(),
      data.end_time.getMinutes()
    );
    data.order_time_start = d1.getTime();
    data.order_time_end = d2.getTime();
  } else {
    data.order_time_start = "";
    data.order_time_end = "";
  }
  useApis(
    "post",
    "./api/mange/oneButtonAllowAllOrderMange",
    { data: data },
    res => {
      if (!res.data.error) {
        ElMessage({
          message: "已审核",
          type: "success"
        });
        isOpen.value = false;
      }
    }
  );
  useApis(
    "post",
    "./api/mange/getNeedAllowOrderMange",
    { data: { startPage: (page.value - 1) * 10, pageSize } },
    res => {
      tableData.value = [];
      tableData.value = res.data.data.placeListRes;
      total.value = res.data.data.num;
    }
  );
}

function handleReject(index, row) {
  changeDate.value = { ...row };
  isRejectOpen.value = true;
}
function onRejectClose() {
  isRejectOpen.value = false;
}
function onRejectSubmit(data) {
  useApis(
    "post",
    "./api/mange/updateAllowOrderStateMange",
    { data: { ...data.form, order_state: 4, order_id: data.id } },
    res => {
      if (!res.data.error) {
        ElMessage({
          message: "已拒绝",
          type: "success"
        });
        isRejectOpen.value = false;
      }
    }
  );
  useApis(
    "post",
    "./api/mange/getNeedAllowOrderMange",
    { data: { startPage: (page.value - 1) * 10, pageSize } },
    res => {
      tableData.value = [];
      tableData.value = res.data.data.placeListRes;
      total.value = res.data.data.num;
    }
  );
}
function handleAllow(index, row) {
  useApis(
    "post",
    "./api/mange/updateAllowOrderStateMange",
    {
      data: {
        order_reject_reason: "",
        order_rejecter: "",
        order_state: 3,
        order_id: row.order_id
      }
    },
    res => {
      if (!res.data.error) {
        ElMessage({
          message: "已通过",
          type: "success"
        });
        useApis(
          "post",
          "./api/mange/getNeedAllowOrderMange",
          { data: { startPage: (page.value - 1) * 10, pageSize } },
          res => {
            tableData.value = [];
            tableData.value = res.data.data.placeListRes;
            total.value = res.data.data.num;
          }
        );
      }
    }
  );
}
</script>
<template>
  <div class="relative grid">
    <el-table
      :data="filterTableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      />
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
              @click="handleAdd()"
              >一键审批</buttonV
            >
          </div>
        </template>
        <template #default="scope">
          <div class="px-4 inline-flex justify-between">
            <buttonV
              size="small"
              appearance="primary"
              @click="handleAllow(scope.$index, scope.row)"
              >允许</buttonV
            >
            <div class="w-4 px-4"></div>
            <buttonV
              size="small"
              appearance="danger"
              @click="handleReject(scope.$index, scope.row)"
              >拒绝</buttonV
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

    <OneButtonAllowAllOrderMange
      v-if="isOpen"
      @submit="onSubmit"
      @close="onClose"
    />
    <ExamineOrderState
      v-if="isRejectOpen"
      :change-data="changeDate"
      @submit="onRejectSubmit"
      @close="onRejectClose"
    />
  </div>
</template>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
