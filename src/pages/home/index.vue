<!--
 * @Description: 主页
 * @Author: HanYongHui
 * @Date: 2022-03-29 18:00:39
 * @LastEditTime: 2022-04-12 14:17:46
 * @LastEditors: HanYongHui
-->
<template>
  <template v-if="storeData.role === 1 && storeData.estateId">
    <!-- 用户且有楼盘详情浏览记录 -->
    <navigation-custom title="楼盘详情" :theme="theme" :isBack="false" />
    <estate-detail :estateId="storeData.estateId" />
  </template>
  <template v-else>
    <!-- 楼盘列表 -->
    <navigation-custom title="楼盘" theme="transparent" :isBack="false" />
    <estate-list />
  </template>
</template>
<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import {
  onLoad,
  onPageScroll,
  onPullDownRefresh,
  onReachBottom,
  onShareAppMessage,
} from "@dcloudio/uni-app";
import { useUserInfoHooks } from "../../hoosk/index";
import { useEstateListHook } from "./hooks/index";
import estateDetail from "../estate-detail/components/detail.vue";
import navigationCustom from "../../components/navigation-custom/index.vue";
import estateList from "./components/index.vue";

export default defineComponent({
  name: "",
  components: {
    navigationCustom,
    estateList,
    estateDetail,
  },
  setup() {
    const { storeData } = useUserInfoHooks();
    const { requestEstateList, loadType } = useEstateListHook();
    onLoad((e) => {});

    watch(
      () => storeData.isLogin,
      () => {
        if (storeData.role === 2) {
          uni.setTabBarItem({
            index: 1,
            text: "我的",
            iconPath: "/static/tab-image/my-un-icon.png",
            selectedIconPath: "/static/tab-image/my-icon.png",
          });
        }
      }
    );

    const theme = ref<"white" | "black" | "transparent">("transparent");
    onPageScroll((e) => {
      if (e.scrollTop > 64) {
        theme.value = "white";
      } else {
        theme.value = "transparent";
      }
    });

    onPullDownRefresh(() => {
      requestEstateList();
    });
    onReachBottom(() => {
      if (loadType.value === "complete") {
        return;
      }
      loadType.value = "load";
      requestEstateList(true);
    });

    onShareAppMessage(() => {
      return {
        title: "楼盘详情",
        path: `/pages/estate-detail/index?id=${10}`,
      };
    });
    return {
      storeData,
      theme,
    };
  },
});
</script>
<style lang="scss" scoped>
.list {
  padding-top: 128rpx;
  height: calc(100% - 128rpx);
  width: 100%;
  position: absolute;
}

.image-bg {
  width: 100%;
  position: absolute;
  top: 0;
  height: 268rpx;
}
</style>

<style>
page {
  background: #fff;
}
</style>