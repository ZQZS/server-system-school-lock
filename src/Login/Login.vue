<template>
  <div class="login-container">
    <div class="container2">
      <el-container>
        <el-header class="headerEl"
          ><div class="header-text">
            管&nbsp;理&nbsp;端&nbsp;登&nbsp;录
          </div></el-header
        >
        <el-main class="mainbox">
          <div>
            <div class="loginbox">
              <el-input
                v-model="username"
                prefix-icon="el-icon-user"
                class="input"
                placeholder="请输入用户名"
                clearable
              >
              </el-input>
              <el-input
                v-model="password"
                prefix-icon="el-icon-lock"
                class="input"
                placeholder="请输入密码"
                show-password
              >
              </el-input>
              <div class="switch">
                <el-switch
                  v-model="checked"
                  size="large"
                  active-text="记住密码"
                ></el-switch>
              </div>
              <el-row class="input">
                <el-button
                  type="primary"
                  round
                  @click="login()"
                  ><div style="width: 8vw">登录</div>
                </el-button>
              </el-row>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import { ElLoading } from "element-plus";
import { useLoginApi } from "axiosPath/axios.js";
import { useStore } from "piniaPath/state.js";
export default {
  data() {
    let username = "",
      password = "",
      checked = false;
    const useStoreV = useStore();
    if (this.$cookies.isKey("mange_info")) {
      this.$cookies.remove("mange_info");
    }
    if (this.$cookies.isKey("mange")) {
      const mange = this.$cookies.get("mange");
      username = mange.username;
      password = mange.password;
      checked = true;
    }
    return {
      username,
      password,
      checked,
      useStore: useStoreV
    };
  },
  methods: {
    login() {
      const loading = ElLoading.service({
        lock: true,
        text: "正在登录...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      useLoginApi(
        "post",
        "./api/mange/login",
        {
          data: { password: this.password, userName: this.username },
          headers: { "Content-Type": "application/json" }
        },
        res => {
          if (res.data.loginInfo.msg === "success") {
            this.useStore.setIsLogin(true);
            const resData = res.data.loginInfo.data;
            this.useStore.setUser({
              userName: resData.user_name, //用户姓名
              userNo: resData.user_no, //学工号
              phone: resData.user_phone, //手机号码 可空
              hours: resData.user_hour //每月使用时间
            });
            this.useStore.setPowerList(resData.user_power_list);
            this.$cookies.set("mange_info", resData, "7D");
            if (this.checked) {
              this.$cookies.set(
                "mange",
                { username: this.username, password: this.password },
                "7D"
              );
            } else {
              if (this.$cookies.isKey("mange")) {
                this.$cookies.remove("mange");
              }
            }
          }
          loading.close();
        }
      );
    },
    // async login() {
    //   let res;
    //   //带查询参数，变成 /register?plan=private
    //   const basicSet = basicSetting();
    //   // console.log("code:", this.$router.currentRoute.query);
    //   // console.log("state:", this.getQueryVariable("state"));
    //   // console.log(basicSet);
    //   this.loading = true;
    //   try {
    //     res = await this.$axios({
    //       method: "post",
    //       url: "/api/users/login",
    //       data: {
    //         userName: this.username,
    //         password: this.password
    //       },
    //       headers: { "Content-Type": "application/json" }
    //     });
    //   } catch (error) {
    //     this.loading = false;
    //     MessageBox("提示", "无网络连接");
    //     return;
    //   }
    //   if (res.data.loginInfo.msg !== "success") {
    //     this.loading = false;
    //     MessageBox("提示", res.data.loginInfo.msg);
    //     return;
    //   }
    //   const resData = res.data.loginInfo.data;
    //   await basicSet.setUser({
    //     userName: resData.user_name, //用户姓名
    //     userNo: resData.user_no, //学工号
    //     phone: resData.user_phone, //手机号码 可空
    //     hours: resData.user_hour //每月使用时间
    //   });
    //   this.loading = false;
    //   this.$cookies.set("user_info", resData, "7D");
    //   if (this.checked) {
    //     this.$cookies.set(
    //       "user",
    //       { username: this.username, password: this.password },
    //       "7D"
    //     );
    //   } else {
    //     if (this.$cookies.isKey("user")) {
    //       this.$cookies.remove("user");
    //     }
    //   }
    //   // return this.$router.push({ path: "home", query: { plan: "private" } });
    //   return this.$router.push({ path: "home" });
    // },
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    }
  }
};
</script>
<style scoped>
.loginbox {
  align-content: center;
  text-align: center;
  margin: auto;
}

.mainbox {
  align-content: center;
  text-align: center;
}

.switch {
  padding-top: 1vh;
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.input {
  margin-top: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  min-height: 95vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-text {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: center;
  font-size: 2.5rem;
  line-height: 1;
  font-weight: 500;
  letter-spacing: 0.1em;
}
.headerEl {
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
    drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
}
.container2 {
  width: 80vw;
}
</style>
<style>
input.el-input__inner {
  background-color: transparent !important;
}
</style>
