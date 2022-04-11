<!--
 * @Description: 小程序 主入口
 * @Author: HanYongHui
 * @Date: 2022-03-29 16:44:50
 * @LastEditTime: 2022-04-09 16:16:35
 * @LastEditors: HanYongHui
-->
<script setup lang="ts">
import { watch, reactive } from "vue";
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
  if (token) {
    uni.switchTab({ url: "/pages/home/index" });
  }
});

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
