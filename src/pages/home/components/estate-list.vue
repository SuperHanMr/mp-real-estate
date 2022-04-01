<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-03-31 17:47:35
 * @LastEditTime: 2022-03-31 21:17:04
 * @LastEditors: HanYongHui
-->
<template>
  <view class="house-item" @click="eventEstateDetail">
    <image class="cover-iamge" src="" mode="scaleToFill" />
    <view class="house-item_right">
      <text>楼盘名称楼盘名称楼盘名称楼盘名称</text>
      <text>户型信息</text>
      <view class="house-item_address">
        <image src="" mode="scaleToFill" />
        <text>北京朝阳冠状朝阳路5好苑</text>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { defineProps, watch, reactive } from "vue";
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const eventEstateDetail = () => {
  uni.navigateTo({ url: "/pages/estate-detail/index?id=111" });
};
</script>
<style lang="scss" scoped>
.house-item {
  margin-bottom: 24rpx;
  background: #fff;
  display: flex;
  align-items: center;

  .cover-iamge {
    width: 160rpx;
    height: 160rpx;
  }

  .house-item_right {
    margin-left: 24rpx;
    display: flex;
    flex-direction: column;
  }

  .house-item_address {
    display: flex;
    align-items: center;

    image {
      width: 20rpx;
      height: 20rpx;
    }
  }
}
</style>