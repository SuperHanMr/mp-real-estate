<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-03-31 17:47:35
 * @LastEditTime: 2022-04-12 12:04:52
 * @LastEditors: HanYongHui
-->
<template>
  <view class="house-item" @click="eventEstateDetail">
    <image class="cover-iamge" :src="item.url" mode="scaleToFill" />
    <view class="house-item_right">
      <view class="house-item_right--content">
        <text class="title">{{ item.name }}</text>
        <text class="house-item_address"
          >{{ item.provinceName }}{{ item.cityName }}{{ item.districtName
          }}{{ item.address }}</text
        >
        <text class="tag"
          >{{ item.houseTypeNum }}个户型｜{{ item.schemeNum }}个装修方案</text
        >
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { defineProps, watch, reactive } from "vue";
import type { PropType } from "vue";

type EstateItem = {
  id: number;
  name: string; //楼盘名称,
  url: string; //楼盘封面,
  houseTypeNum: number; //户型个数,
  schemeNum: number; //方案个数,
  provinceName: string; //省,
  cityName: string; //市,
  districtName: string; //区,
  address: string; //楼盘详细地址
};
const props = defineProps({
  item: {
    type: Object as PropType<EstateItem>,
    required: true,
  },
});
const eventEstateDetail = () => {
  uni.navigateTo({
    url: `/pages/estate-detail/index?id=${props.item.id}`,
  });
};
</script>
<style lang="scss" scoped>
.house-item {
  margin-bottom: 32rpx;
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
        width: 100%;
        font-weight: bold;
        font-size: 32rpx;
        line-height: 44rpx;
        color: #333333;
      }

      .house-item_address {
        width: calc(100% - 32rpx);
        margin-top: 6rpx;
        font-weight: 400;
        font-size: 24rpx;
        line-height: 34rpx;
        color: #666666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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