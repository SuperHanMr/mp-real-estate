<!--
 * @Description: 小程序 主入口
 * @Author: HanYongHui
 * @Date: 2022-03-29 16:44:50
 * @LastEditTime: 2022-04-08 18:07:32
 * @LastEditors: HanYongHui
-->
<script setup lang="ts">
import { watch } from "vue";
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useUserInfoHooks } from "./hoosk/index";
import { useLoginHooks } from "../src/pages/login/hooks/index";
const { requestLogin, loginData } = useLoginHooks();
const { storeData } = useUserInfoHooks();
onLaunch(() => {
  console.log("App Launch");
  uni.getSystemInfo({
    success: (result) => {
      console.log("statusBarHeight", result.statusBarHeight);
      storeData.statusBarHeight = result.statusBarHeight || 0;
    },
  });
  let token = uni.getStorageSync("token");
  if (!token) {
    login();
  } else {
    uni.switchTab({ url: "/pages/home/index" });
  }
});
const login = () => {
  uni.login({
    provider: "weixin",
    success: ({ code }) => {
      requestLogin(code).then(({ data }) => {
        switch (data?.isRegister) {
          case 0:
            break;
          case 1:
            storeData.userName = data?.name || "";
            storeData.role = data?.role || 0;
            uni.switchTab({ url: "/pages/home/index" });
            break;
          case 2:
            break;
          default:
            break;
        }
      });
    },
  });
};
onShow(() => {});
onHide(() => {});
</script>
<style >
page {
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-size: 16px;
}
</style>
