<!--
 * @Description: 小程序 主入口
 * @Author: HanYongHui
 * @Date: 2022-03-29 16:44:50
 * @LastEditTime: 2022-03-31 18:08:48
 * @LastEditors: HanYongHui
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useUserInfoHooks } from "./hoosk/index";
onLaunch(() => {
  console.log("App Launch");
  const { storeData } = useUserInfoHooks();
  try {
    const token: string = uni.getStorageSync("token");
    if (token) {
      storeData.token = token;
      uni.switchTab({ url: "/pages/home/index" });
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
  height: 100%;
  background-color: #f5f6f6;
  font-size: 16px;
}
</style>
