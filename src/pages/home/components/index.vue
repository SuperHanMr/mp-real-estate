<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-04-12 12:11:32
 * @LastEditTime: 2022-04-14 10:30:55
 * @LastEditors: HanYongHui
-->

<template>
  <image :src="imageBg" class="image-bg" />
  <view class="list">
    <view :style="`height:${44 + storeData.statusBarHeight}px`"></view>
    <estate-list v-for="item in list" :key="item.id" :item="item" />
    <view class="guide-dbj-mp" @click="">
      <image src="logo-icon" />
      <view class="dec">
        <text></text>
        <text></text>
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
  line-height: 120rpx;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);

  .logo-icon {
    margin-left: 40rpx;
    height: 72rpx;
    width: 72rpx;
  }
  .dec {
    display: flex;
    flex-direction: column;
    text:nth-child(1) {
    }

    text:nth-child(1) {
    }
  }

  .opne-button {
  }

  .close-icon {
  }
}
</style>