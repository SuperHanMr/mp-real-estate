<!--
 * @Description: 小程序 主入口
 * @Author: HanYongHui
 * @Date: 2022-03-29 16:44:50
 * @LastEditTime: 2022-04-19 10:24:45
 * @LastEditors: HanYongHui
-->
<script setup lang="ts">
import { watch, reactive } from "vue";
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useUserInfoHooks } from "./hoosk/index";
import { useLoginHooks } from "../src/pages/login/hooks/index";
const { requestLogin, loginData, requsetBrowseRecord } = useLoginHooks();
const { storeData } = useUserInfoHooks();

onLaunch(() => {
  console.log("App Launch");

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
        storeData.isRegister = data?.isRegister || 0;
        switch (data?.isRegister) {
          case 0:
            uni.reLaunch({ url: "/pages/login/index" });
            break;
          case 1:
            // uni.reLaunch({ url: "/pages/login/index" });

            storeData.userId = data?.id;
            storeData.userName = data?.name;
            storeData.role = data?.role;
            storeData.isLogin = true;
            if (storeData.role === 1) {
              uni.setStorageSync("shareId", storeData.userId);
            }
            if (storeData.role === 2) {
              // 查询浏览记录
              requsetBrowseRecord().then((res) => {
                storeData.estateId = res.data?.estateId || 0;
              });
            }
            break;
          case 2:
            uni.reLaunch({ url: "/pages/login/index" });
            break;
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
