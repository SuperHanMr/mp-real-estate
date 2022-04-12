<!--
 * @Description: 主页
 * @Author: HanYongHui
 * @Date: 2022-03-29 18:00:39
 * @LastEditTime: 2022-04-12 10:53:05
 * @LastEditors: HanYongHui
-->
<template>
  <navigation-custom title="楼盘详情" theme="transparent" />
  <view class="list">
    <image src="" />
    <estate-list v-for="item in list" :key="item.id" :item="item" />
    <load-more :loadType="loadType" />
  </view>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import {
  onLoad,
  onShow,
  onPullDownRefresh,
  onReachBottom,
} from "@dcloudio/uni-app";
import estateList from "./components/estate-list.vue";
import loadMore from "../../components/load-more/index.vue";
import { useUserInfoHooks } from "../../hoosk/index";
import { useEstateListHook } from "./hooks/index";
import navigationCustom from "../../components/navigation-custom/index.vue";

export default defineComponent({
  name: "",
  components: {
    estateList,
    loadMore,
    navigationCustom,
  },
  setup() {
    const { storeData } = useUserInfoHooks();
    const { requestEstateList, list, loadType } = useEstateListHook();
    onLoad((e) => {});
    watch(
      () => storeData.isLogin,
      () => {
        requestEstateList();
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

    onShow(() => {});
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
    return {
      loadType,
      list,
    };
  },
});
</script>
<style lang="scss" scoped>
.list {
  padding-top: 122rpx;
  height: 100%;
  width: 100%;
  background: #fff;
}
</style>

<style>
page {
  background: #fff;
}
</style>