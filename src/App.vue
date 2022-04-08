<!--
 * @Description: 小程序 主入口
 * @Author: HanYongHui
 * @Date: 2022-03-29 16:44:50
 * @LastEditTime: 2022-04-02 19:01:25
 * @LastEditors: HanYongHui
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useUserInfoHooks } from "./hoosk/index";
onLaunch(() => {
  console.log("App Launch");
  const { storeData } = useUserInfoHooks();
  uni.getSystemInfo({
    success: (result) => {
      console.log("statusBarHeight", result.statusBarHeight);
      storeData.statusBarHeight = result.statusBarHeight || 0;
    },
  });

  try {
    const token: string = uni.getStorageSync("token");
    if (token) {
      // 拿到token请求 获取用户信息
      storeData.token = token;
      uni.switchTab({ url: "/pages/home/index" });
      // uni.navigateTo({ url: "/pages/estate-detail/index" });
    }
  } catch (e) {
    console.log("获取token失败");
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
