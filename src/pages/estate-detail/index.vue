<!--
 * @Description: 楼盘详情
 * @Author: HanYongHui
 * @Date: 2022-03-31 21:00:01
 * @LastEditTime: 2022-04-14 19:00:55
 * @LastEditors: HanYongHui
-->
<template>
  <navigation-custom
    title="楼盘详情"
    :theme="theme"
    :isBack="!shareBtn"
    :shareBtn="shareBtn"
  />
  <detail :estateId="id" ref="estateDetail" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  onLoad,
  onShareAppMessage,
  onPageScroll,
  onPullDownRefresh,
} from "@dcloudio/uni-app";
import detail from "./components/detail.vue";
import navigationCustom from "../../components/navigation-custom/index.vue";
import { useEstateDetailHook } from "./hooks/index";
import { useUserInfoHooks } from "../../hoosk/index";
export default defineComponent({
  name: "",
  components: {
    detail,
    navigationCustom,
  },
  setup() {
    const { storeData } = useUserInfoHooks();
    const { requestAddBrowseRecord } = useEstateDetailHook();
    const id = ref<number>(0);
    const shareBtn = ref<boolean>(false);
    const estateDetail = ref<any>(null);
    onLoad((e: any) => {
      console.log("-----load-------", e);
      if (e.scene) {
        // 二维码  分享进入
        const scene = decodeURIComponent(e.scene).split("&");
        console.log("二维码分享进入", scene);
        id.value = +scene[0].split("=")[1];
        const sahreId = +scene[1].split("=")[1];
        uni.setStorageSync("shareId", +sahreId ? sahreId : "");
        shareBtn.value = sahreId ? true : false;
      } else {
        id.value = +e.estateId;
        uni.setStorageSync("shareId", +e.shareId ? e.shareId : "");
        shareBtn.value = e.shareId ? true : false;
      }
      if (storeData.role === 2) {
        requestAddBrowseRecord({
          userId: +storeData.userId,
          userNickName: storeData.userName,
          estateId: id.value,
        });
        storeData.estateId = id.value;
      }
      let pages = getCurrentPages();
      console.log("当前栈深度", pages.length);
    });
    const theme = ref<"white" | "black" | "transparent">("transparent");
    onPageScroll((e) => {
      if (e.scrollTop > 64) {
        theme.value = "white";
      } else {
        theme.value = "transparent";
      }
    });
    onShareAppMessage(() => {
      let shareId: number;
      if (storeData.role === 2) {
        shareId = uni.getStorageSync("shareId") || 0;
      } else {
        shareId = +storeData.userId;
      }
      console.log(
        "onShareAppMessage",
        `/pages/estate-detail/index?estateId=${id.value}&shareId=${shareId}`
      );
      return {
        title: "楼盘详情",
        path: `/pages/estate-detail/index?estateId=${id.value}&shareId=${shareId}`,
      };
    });

    onPullDownRefresh(() => {
      estateDetail.value?.refreshPage();
    });
    return {
      id,
      theme,
      shareBtn,
      estateDetail,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>