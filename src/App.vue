<!--
 * @Description: 小程序 主入口
 * @Author: HanYongHui
 * @Date: 2022-03-29 16:44:50
 * @LastEditTime: 2022-04-08 14:19:42
 * @LastEditors: HanYongHui
-->
<script setup lang="ts">
import { watch } from "vue";
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useUserInfoHooks } from "./hoosk/index";
import { useLoginHooks } from "../src/pages/login/hooks/index";
const { requestLogin, loginData } = useLoginHooks();
onLaunch(() => {
  console.log("App Launch");
  const { storeData } = useUserInfoHooks();
  uni.getSystemInfo({
    success: (result) => {
      console.log("statusBarHeight", result.statusBarHeight);
      storeData.statusBarHeight = result.statusBarHeight || 0;
    },
  });
  uni.login({
    provider: "weixin",
    success: ({ code }) => {
      requestLogin(code).then(({ data }) => {
        if (data?.isRegister) {
          storeData.userName = data?.name || "";
          storeData.role = data?.role || 0;
          uni.switchTab({ url: "/pages/home/index" });
        }
      });
    },
  });
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
