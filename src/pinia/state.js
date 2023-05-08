import { defineStore } from "pinia";
import { ref } from "vue";
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore("store", {
  // other options...
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      setting: {
        cells: 0, //一天分成多少个单位时间
        start_time: 0, //开始时间，单位：时
        cell_time: 0, //单位时间，单位：分
        early_open_time: 0, //最早提前开放的时间，提前7天预约
        is_register_open: null,
        examine: null
      },
      user: {
        userName: "", //用户姓名
        userNo: "", //学工号
        phone: "", //手机号码 可空
        hours: 0 //每月使用时间
      },
      isLogin: ref(false),
      powerList: ref([])
    };
  },
  actions: {
    setIsLogin(flag) {
      this.isLogin = flag;
    },
    setUser(newInfo) {
      for (const key in this.user) {
        try {
          this.user[key] = newInfo[key];
        } catch (error) {
          console.log("New info format was wrong");
          this.initUser();
        }
      }
    },
    setSetting(newInfo) {
      for (const key in this.setting) {
        try {
          this.setting[key] = newInfo[key];
        } catch (error) {
          console.log("New info format was wrong");
          this.initSetting();
        }
      }
    },
    setPowerList(power_list) {
      // console.log(power_list)
      if (power_list) this.powerList = power_list.split(",");
    },
    initSetting() {
      this.setting["cells"] = 0;
      this.setting["cellTime"] = 0;
      this.setting["earlyOpenTime"] = 0;
      this.setting["startTime"] = 0;
      this.setting.examine = null;
      this.setting.register = null;
    },
    initUser() {
      this.user["userName"] = "";
      this.user["userNo"] = NaN;
      this.user["phone"] = "";
      this.user["hours"] = 0;
    }
  }
});
