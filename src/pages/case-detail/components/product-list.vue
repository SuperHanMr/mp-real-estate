<!--
 * @Description: 方案详情 商品列表
 * @Author: HanYongHui
 * @Date: 2022-05-19 14:40:46
 * @LastEditTime: 2022-05-20 10:56:25
 * @LastEditors: HanYongHui
-->
<template>
  <view class="house-type-list">
    <view class="list-title">
      <view></view>
      <text>装修报价</text>
    </view>
    <view class="case-type-conetnt" v-if="caseDetail.caseBags">
      <view
        class="case-type-warp"
        v-for="(item, index) in caseDetail.caseBags"
        :key="index"
        :class="{
          'is-user': storeData.role === 2,
          'active-choose': item.isChoose,
        }"
        @click="chooseGoods(index)"
      >
        <image src="../../../images/case-bg.png" class="case-bg" />
        <image
          src="../../../images/choose-bg.png"
          v-if="item.isChoose"
          class="choose-bg"
        />
        <view class="case-content">
          <view class="case-name">
            <view class="icon-style pro-icon">商品</view>
            <view class="text">{{ item.caseBagName.caseBagName }}</view>
          </view>
          <view class="case-desc">{{ item.bagDesc.bagPackageDesc }}</view>
          <view class="case-price">
            <text class="price-symbol">¥</text>
            <text class="price-num price-font">{{
              item.buyItNow.buyItNow.toFixed(2)
            }}</text>
          </view>
          <view class="case-btn" @click.stop="lookProductDetail(item)">
            <image :src="item.isChoose ? goodsPackActive : goodsPack"></image>
            <text :class="{ active: item.isChoose }">查看套餐所含全部商品</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import { getCaseDetailHooks } from "../hooks/index";
import { useUserInfoHooks } from "../../../hoosk/index";
import goodsPack from "../../../images/goods-pack.png";
import goodsPackActive from "../../../images/goods-pack-active.png";
import type { CaseBags } from "../../../api/case";
const { storeData } = useUserInfoHooks();
const { caseDetail } = getCaseDetailHooks();
const chooseGoods = (index: number) => {
  caseDetail.value.caseBags[index].isChoose =
    !caseDetail.value.caseBags[index].isChoose;
};
const lookProductDetail = (item: CaseBags) => {
  uni.navigateTo({
    url: `/pages/product-bundle-detail/index?schemeId=${184}&caseBagName=${
      item.caseBagName.caseBagName
    }`,
  });
};
</script>
<style lang="scss" scoped>
.house-type-list {
  background: #ffffff;
  padding-top: 48rpx;
  margin-top: -20rpx;
  position: absolute;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
  width: 100%;
  .list-title {
    display: flex;
    align-items: center;
    :nth-child(1) {
      width: 6rpx;
      height: 28rpx;
      background: #333333;
      border-top-right-radius: 6rpx;
      border-bottom-right-radius: 6rpx;
    }
    :nth-child(2) {
      margin-left: 24rpx;
      font-weight: 500;
      font-size: 32rpx;
      line-height: 44rpx;
      color: #333333;
    }
  }
  .is-user {
    border: 0.5px solid #ececec;
  }
  view .active-choose {
    background: linear-gradient(281.11deg, #ffffff 0%, #fffbf7 100%);
    border: 0.5px solid #222;
    box-sizing: border-box;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.06);
  }
  .case-type-conetnt {
    padding: 8rpx 32rpx 250rpx;
    .case-type-warp {
      position: relative;
      padding: 32rpx 40rpx;
      background: #fafafa;
      border-radius: 24rpx;
      box-sizing: border-box;
      margin: 24rpx 0;

      .case-name {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .icon-style {
          width: 52rpx;
          height: 32rpx;
          line-height: 32rpx;
          text-align: center;
          border-radius: 6rpx;
          font-size: 20rpx;
          font-weight: 500;
          margin-right: 12rpx;
        }
        .pro-icon {
          background: #e9eff5;
          color: #586e85;
        }
        .con-icon {
          background: #eee8e5;
          color: #856858;
        }

        .text {
          margin-bottom: 1px;
          color: #333;
          font-weight: 500;
          font-size: 30rpx;
          letter-spacing: 0.1px;
        }
      }
      .case-desc {
        width: 100%;
        color: #999;
        letter-spacing: 0.2px;
        font-size: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
      .case-price {
        margin-top: 32rpx;
        margin-bottom: 24rpx;
        .price-symbol {
          color: #333;
          font-size: 26rpx;
          margin-right: 8rpx;
        }
        .price-num {
          font-size: 40rpx;
          color: #333;
        }
      }
      .active {
        font-weight: bold;
        color: #b88c58 !important;
      }
      .case-btn {
        width: 100%;
        height: 68rpx;
        text-align: center;
        background-color: #fff;
        border: 0.5px solid #ededed;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        image {
          width: 20rpx;
          height: 20rpx;
          margin-right: 12rpx;
          vertical-align: middle;
        }
        text {
          font-size: 24rpx;
          letter-spacing: 0.1px;
          color: #666;
        }
      }
      .case-bg {
        position: absolute;
        right: 0;
        top: 0;
        width: 188rpx;
        height: 174rpx;
      }
      .choose-bg {
        position: absolute;
        right: 0;
        top: 0;
        width: 50rpx;
        height: 30rpx;
      }
    }
  }
}
</style>