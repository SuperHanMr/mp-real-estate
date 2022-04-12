<!--
 * @Description: 楼盘详情
 * @Author: HanYongHui
 * @Date: 2022-03-31 21:00:01
 * @LastEditTime: 2022-04-12 18:29:02
 * @LastEditors: HanYongHui
-->
<template>
  <navigation-custom
    title="楼盘详情"
    :theme="theme"
    :isBack="!shareBtn"
    :shareBtn="shareBtn"
  />
  <detail :estateId="id" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { onLoad, onShareAppMessage, onPageScroll } from "@dcloudio/uni-app";
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
    onLoad((e: any) => {
      console.log("-----load-------", e);
      id.value = +e.estateId;
      uni.setStorageSync("shareId", +e.shareId ? e.estateId : "");
      shareBtn.value = e.shareId ? true : false;
      if (storeData.role === 2) {
        requestAddBrowseRecord({
          userId: +storeData.userId,
          userNickName: storeData.userName,
          estateId: id.value,
        });
        storeData.estateId = id.value;
      }
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
      return {
        title: "楼盘详情",
        path: `/pages/estate-detail/index?estateId=${id.value}&shareId=${shareId}`,
      };
    });
    return {
      id,
      theme,
      shareBtn,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>