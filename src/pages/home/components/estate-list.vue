<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-03-31 17:47:35
 * @LastEditTime: 2022-04-01 17:27:58
 * @LastEditors: HanYongHui
-->
<template>
  <view class="house-item" @click="eventEstateDetail">
    <image class="cover-iamge" :src="imageUrl" mode="scaleToFill" />
    <view class="house-item_right">
      <view class="house-item_right--content">
        <text class="title">北京新天地五期北京</text>
        <text class="house-item_address">北京朝阳区管庄朝阳路5号院</text>
        <text class="tag">10个户型｜130个装修方案</text>
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
const imageUrl: string =
  "https://ali-res-test.dabanjia.com/res/20220211/14/1644561846245_7512%240002.jpg";
const eventEstateDetail = () => {
  uni.navigateTo({ url: "/pages/estate-detail/index?id=111" });
};
</script>
<style lang="scss" scoped>
.house-item {
  margin-bottom: 32rpx;
  background: #fff;
  display: flex;

  .cover-iamge {
    margin-left: 32rpx;
    width: 204rpx;
    height: 152rpx;
    border-radius: 8rpx;
  }

  .house-item_right {
    width: calc(100% - 32rpx - 204rpx - 28rpx);
    margin-left: 28rpx;
    padding-bottom: 32rpx;
    border-bottom: 1rpx solid #f4f4f4;
    .house-item_right--content {
      height: 152rpx;
      display: flex;
      flex-direction: column;
      position: relative;
      .title {
        font-weight: bold;
        font-size: 32rpx;
        line-height: 44rpx;
        color: #333333;
      }

      .house-item_address {
        margin-top: 6rpx;
        font-weight: 400;
        font-size: 24rpx;
        line-height: 34rpx;
        color: #666666;
      }
      .tag {
        position: absolute;
        bottom: 0;
        display: inline-block;
        background: #f2f4f7;
        border-radius: 6rpx;
        height: 36rpx;
        line-height: 36rpx;
        padding: 0 8rpx;
        color: #586e85;
        font-size: 22rpx;
      }
    }
  }
}
</style>