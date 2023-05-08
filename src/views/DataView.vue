<script setup>
import { ref, onMounted } from "vue";
import { useApis } from "axiosPath/axios.js";
import * as eCharts from "echarts";
const hotPlaceContainer = ref(null);
const userUsedOrderSortContainer = ref(null);
const yearAllOrderContainer = ref(null);
const userYearOrderTimeContainer = ref(null);
const userRoleUsedContainer = ref(null);

const d = new Date();
const todayMonth = ref(d.getFullYear() + "." + (d.getMonth() + 1));

const hotPlaceOption = {
  tooltip: {},
  xAxis: {
    nameTextStyle: {
      overflow: "break"
    },
    data: []
  },
  yAxis: { name: "预约量" },
  series: [
    {
      name: "预约量",
      type: "bar",
      data: []
    }
  ]
};
const userUsedOrderSortOption = {
  tooltip: {},
  xAxis: {
    name: "时",
    max: "dataMax"
  },
  yAxis: {
    nameTextStyle: {
      overflow: "break"
    },
    data: []
  },
  series: [
    {
      name: "使用时间",
      type: "bar",
      data: [],
      label: {
        show: true,
        position: "right",
        valueAnimation: true
      }
    }
  ]
};
const yearAllOrderOption = {
  xAxis: {
    data: []
  },
  yAxis: { name: "预约量" },
  series: [
    {
      data: [],
      type: "line",
      label: {
        show: true,
        position: "top",
        textStyle: {
          fontSize: 20,
          valueAnimation: true
        }
      }
    }
  ]
};
const userYearOrderTimeOption = {
  xAxis: {
    data: []
  },
  yAxis: { name: "时" },
  series: [
    {
      data: [],
      type: "line",
      label: {
        show: true,
        position: "top",
        textStyle: {
          fontSize: 20,
          valueAnimation: true
        }
      }
    }
  ]
};
const userRoleUsedOption = {
  tooltip: {},
  xAxis: {
    name: "时",
    max: "dataMax"
  },
  yAxis: {
    nameTextStyle: {
      overflow: "break"
    },
    data: []
  },
  series: [
    {
      name: "使用时间",
      type: "bar",
      data: [],
      label: {
        show: true,
        position: "right",
        valueAnimation: true
      }
    }
  ]
};
onMounted(() => {
  let hotPlaceChart,
    userUsedOrderSortChart,
    yearAllOrderChart,
    userYearOrderTimeChart,
    userRoleUsedChart;
  useApis("get", "./api/mange/getHotPlace", {}, res => {
    // console.log("./api/mange/getHotPlace", res);
    for (let i = res.data.data.length - 1; i >= 0; i--) {
      const item = res.data.data[i];
      hotPlaceOption.xAxis.data.push(item.place_name);
      hotPlaceOption.series[0].data.push(item.ordered_user_number);
    }
    hotPlaceChart = eCharts.init(hotPlaceContainer.value);
    hotPlaceChart.setOption(hotPlaceOption);
  });
  useApis("get", "./api/mange/getUserUsedTimeSort", {}, res => {
    // console.log("./api/mange/getUserUsedTimeSort", res);
    for (let i = res.data.data.length - 1; i >= 0; i--) {
      const item = res.data.data[i];
      userUsedOrderSortOption.yAxis.data.push(
        `${item.user_name}\n(${item.role})`
      );
      userUsedOrderSortOption.series[0].data.push(item.used_time);
    }
    userUsedOrderSortChart = eCharts.init(userUsedOrderSortContainer.value);
    userUsedOrderSortChart.setOption(userUsedOrderSortOption);
  });
  useApis("get", "./api/mange/getMonthAllOrder", {}, res => {
    // console.log("./api/mange/getMonthAllOrder", res);
    for (let i = res.data.data.length - 1; i >= 0; i--) {
      const item = res.data.data[i];
      yearAllOrderOption.xAxis.data.push(item.data);
      yearAllOrderOption.series[0].data.push(item.num);
    }
    yearAllOrderChart = eCharts.init(yearAllOrderContainer.value);
    yearAllOrderChart.setOption(yearAllOrderOption);
  });
  useApis("get", "./api/mange/getUserAvgUsedTime", {}, res => {
    // console.log("./api/mange/getUserAvgUsedTime", res);
    for (let i = res.data.data.length - 1; i >= 0; i--) {
      const item = res.data.data[i];
      userYearOrderTimeOption.xAxis.data.push(item.year_and_month);
      userYearOrderTimeOption.series[0].data.push(item.used_avg_time);
    }
    userYearOrderTimeChart = eCharts.init(userYearOrderTimeContainer.value);
    userYearOrderTimeChart.setOption(userYearOrderTimeOption);
  });
  useApis("get", "./api/mange/getRoleOrderTimeSort", {}, res => {
    // console.log("./api/mange/getRoleOrderTimeSort", res);
    for (let i = res.data.data.length - 1; i >= 0; i--) {
      const item = res.data.data[i];
      userRoleUsedOption.yAxis.data.push(item.role);
      userRoleUsedOption.series[0].data.push(item.all_used_time);
    }
    userRoleUsedChart = eCharts.init(userRoleUsedContainer.value);
    userRoleUsedChart.setOption(userRoleUsedOption);
  });
});
</script>
<template>
  <div class="flex flex-wrap justify-around">
    <el-card class="w-[36rem] m-4">
      <template #header>
        <div class="flex justify-center items-center">
          <span>热门区域({{ todayMonth }})</span>
        </div>
      </template>
      <div
        ref="hotPlaceContainer"
        class="w-[36rem] min-h-[24rem]"
      ></div>
    </el-card>
    <el-card class="w-[36rem] m-4">
      <template #header>
        <div class="flex justify-center items-center">
          <span>用户使用时间排行({{ todayMonth }})</span>
        </div>
      </template>
      <div
        ref="userUsedOrderSortContainer"
        class="w-[36rem] min-h-[24rem]"
      ></div>
    </el-card>
    <el-card class="w-[36rem] m-4">
      <template #header>
        <div class="flex justify-center items-center">
          <span>总预约量</span>
        </div>
      </template>
      <div
        ref="yearAllOrderContainer"
        class="w-[36rem] min-h-[24rem]"
      ></div>
    </el-card>
    <el-card class="w-[36rem] m-4">
      <template #header>
        <div class="flex justify-center items-center">
          <span>用户平均使用时间</span>
        </div>
      </template>
      <div
        ref="userYearOrderTimeContainer"
        class="w-[36rem] min-h-[24rem]"
      ></div>
    </el-card>
    <el-card class="w-[40rem] m-4">
      <template #header>
        <div class="flex justify-center items-center">
          <span>用户人群使用时间({{ todayMonth }})</span>
        </div>
      </template>
      <div
        ref="userRoleUsedContainer"
        class="w-[40rem] min-h-[24rem]"
      ></div>
    </el-card>
  </div>
</template>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
