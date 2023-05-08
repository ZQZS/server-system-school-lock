import axios from "axios";
import { ElMessageBox } from "element-plus";
import { useStore } from "piniaPath/state.js";

let flag = false;
/**
 *
 * @param {String} method
 * @param {String} url
 * @param {Object} option
 * @param {Function} callback
 * @returns res
 */
export const useLoginApi = async function (
  method = "get",
  url,
  option,
  callback = null
) {
  let res = null;
  try {
    res = await axios({
      method: method,
      url: url,
      ...option
    });
    if (res.data.loginInfo.msg !== "success") {
      ElMessageBox.alert(res.data.loginInfo.msg, "提示", {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: "OK"
      });
    }
  } catch (error) {
    ElMessageBox.alert("网络连接失败", "提示", {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: "OK"
    });
  } finally {
    if (callback) {
      callback(res);
    }
  }
  return res;
};
/**
 *
 * @param {String} method
 * @param {String} url
 * @param {Object} option
 * @param {Function} callback
 * @returns res
 */
export const useApis = async function (
  method = "get",
  url,
  option,
  callback = null,
  loading = null
) {
  let res = null;
  const useStoreV = useStore();
  try {
    res = await axios({
      method: method,
      url: url,
      ...option
    });
  } catch (error) {
    console.log(error);
    ElMessageBox.alert("网络连接失败", "提示", {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: "OK"
    });
  } finally {
    if (res.data.loginInfo && !flag) {
      flag = true;
      ElMessageBox.alert(res.data.loginInfo.msg, "提示", {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: "OK"
      }).then(() => {
        flag = false;
      });
      if (loading) loading.close();
      useStoreV.setIsLogin(false);
    }
    if (res.data.error && !flag) {
      flag = true;
      ElMessageBox.alert(res.data.error.msg, "提示", {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: "OK"
      }).then(() => {
        flag = false;
      });
    }
    if (callback) callback(res);
    if (loading) loading.close();
  }
  return res;
};
