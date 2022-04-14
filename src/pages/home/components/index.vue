<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-04-12 12:11:32
 * @LastEditTime: 2022-04-14 10:40:05
 * @LastEditors: HanYongHui
-->

<template>
  <image :src="imageBg" class="image-bg" />
  <view class="list">
    <view :style="`height:${44 + storeData.statusBarHeight}px`"></view>
    <estate-list v-for="item in list" :key="item.id" :item="item" />
    <view class="guide-dbj-mp" @click="" v-if="storeData.role === 2">
      <image class="logo-icon" src="../../../images/mini-logo.png" />
      <view class="dec">
        <text>打开“打扮家装修”小程序</text>
        <text>查看更多精彩案例</text>
      </view>
      <button class="opne-button">立即打开</button>
    </view>
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

.guide-dbj-mp {
  position: absolute;
  bottom: 32rpx;
  width: calc(100% - 64rpx);
  display: flex;
  align-items: center;
  height: 120rpx;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 10rpx;
  margin-left: 32rpx;

  .logo-icon {
    margin-left: 40rpx;
    height: 72rpx;
    width: 72rpx;
  }
  .dec {
    display: flex;
    flex-direction: column;
    margin-left: 16rpx;

    text:nth-child(1) {
      font-weight: bold;
      font-size: 26rpx;
      line-height: 36rpx;
      color: #ffffff;
    }
    text:nth-child(2) {
      font-weight: 400;
      font-size: 20rpx;
      line-height: 28rpx;
      color: #ffffff;
    }
  }

  .opne-button {
    padding: 0;
    background: linear-gradient(116.19deg, #f83112 16.48%, #fd6421 83.52%);
    border-radius: 16rpx;
    height: 56rpx;
    width: 140rpx;
    margin-left: auto;
    margin-right: 48rpx;
    font-weight: bold;
    font-size: 24rpx;
    line-height: 56rpx;

    color: #ffffff;
  }
  .close-icon {
  }
}
</style>