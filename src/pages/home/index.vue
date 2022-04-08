<!--
 * @Description: 主页
 * @Author: HanYongHui
 * @Date: 2022-03-29 18:00:39
 * @LastEditTime: 2022-04-08 16:08:12
 * @LastEditors: HanYongHui
-->
<template>
  <view class="list">
    <estate-list v-for="item in 10" :key="item" :item="{}" />
    <load-more :loadType="loadType" />
  </view>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  onLoad,
  onShow,
  onPullDownRefresh,
  onReachBottom,
} from "@dcloudio/uni-app";
import estateList from "./components/estate-list.vue";
import loadMore from "../../components/load-more/index.vue";
import { useEstateListHook } from "./hooks/index";
export default defineComponent({
  name: "",
  components: {
    estateList,
    loadMore,
  },
  setup() {
    const loadType = ref<"succeed" | "error" | "load" | "complete">("succeed");
    const { requestEstateList, list } = useEstateListHook();
    const maxId = ref<number>(0);
    onLoad((e) => {
      console.log("---onLoad---", e);
      requestEstateList();
    });

    onShow(() => {});

    onPullDownRefresh(() => {
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 500);
    });

    onReachBottom(() => {
      if (loadType.value === "complete") {
        return;
      }
      loadType.value = "load";

      requestEstateList;
      setTimeout(() => {
        loadType.value = "error";
      }, 1000);
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
  height: 100%;
  width: 100%;
  background: #fff;
  padding-top: 32rpx;
}
</style>

<style>
page {
  background: #fff;
}
</style>