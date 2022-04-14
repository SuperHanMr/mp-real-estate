<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-04-12 12:11:32
 * @LastEditTime: 2022-04-14 11:08:58
 * @LastEditors: HanYongHui
-->

<template>
  <image :src="imageBg" class="image-bg" />
  <view class="list">
    <view :style="`height:${44 + storeData.statusBarHeight}px`"></view>
    <estate-list v-for="item in list" :key="item.id" :item="item" />
    <load-more :loadType="loadType" />
  </view>
</template>
<script lang="ts" setup>
import { defineComponent, watch } from "vue";
import { useEstateListHook } from "../hooks/index";
import { useUserInfoHooks } from "../../../hoosk/index";
import estateList from "./estate-list.vue";
const { storeData } = useUserInfoHooks();
const { requestEstateList, list, loadType } = useEstateListHook();
const imageBg: string =
  "https://ali-image.dabanjia.com/image/20220412/11/164973351689070.png";

requestEstateList();
</script>
<style lang="scss" scoped>
.list {
  height: 100%;
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