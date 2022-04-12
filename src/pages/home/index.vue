<!--
 * @Description: 主页
 * @Author: HanYongHui
 * @Date: 2022-03-29 18:00:39
 * @LastEditTime: 2022-04-12 12:27:03
 * @LastEditors: HanYongHui
-->
<template>
  <template v-if="storeData.role === 2 && storeData.estateId">
    <!-- 用户且有楼盘详情浏览记录 -->
    <navigation-custom title="楼盘详情" theme="transparent" />
    <estate-detail :estateId="storeData.estateId" />
  </template>
  <template v-else>
    <navigation-custom title="楼盘" theme="transparent" />
    <image :src="imageBg" class="image-bg" />
    <view class="list">
      <estate-list v-for="item in list" :key="item.id" :item="item" />
      <load-more :loadType="loadType" />
    </view>
  </template>
</template>
<script lang="ts">
import { defineComponent, watch } from "vue";
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
import estateDetail from "../estate-detail/components/detail.vue";
import navigationCustom from "../../components/navigation-custom/index.vue";

export default defineComponent({
  name: "",
  components: {
    estateList,
    loadMore,
    navigationCustom,
    estateDetail,
  },
  setup() {
    const { storeData } = useUserInfoHooks();
    const { requestEstateList, list, loadType } = useEstateListHook();
    const imageBg: string =
      "https://ali-image.dabanjia.com/image/20220412/11/164973351689070.png";
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
      storeData,
      loadType,
      list,
      imageBg,
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