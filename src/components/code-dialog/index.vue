<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-04-02 16:29:52
 * @LastEditTime: 2022-04-18 18:17:17
 * @LastEditors: HanYongHui
-->
<template>
  <view
    class="dialog-warp"
    @click="close"
    :style="!show ? 'display: none;' : ''"
  >
    <view class="dialog_content">
      <view class="code-content">
        <view class="share-title">装修就找打扮家</view>
        <image class="share-b" src="../../images/fuhao-icon.png" />
        <image class="code" :src="codeUrl" mode="aspectFit"></image>
        <view class="code-tip">
          <text>扫描二维码，查看{{ from }}详情</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { defineComponent, defineProps, defineEmits } from "vue";
import {
  onLoad,
  onPullDownRefresh,
  onReachBottom,
  onPageScroll,
} from "@dcloudio/uni-app";
const props = defineProps({
  codeUrl: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    default: "户型",
  },
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:show"]);
const close = () => {
  console.log("updateupdateupdate");
  emit("update:show", false);
};
</script>
<style lang="scss" scoped>
.dialog-warp {
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  // transition: 0.3s;

  .dialog_content {
    width: 648rpx;
    background: #f9f9f9;
    border-radius: 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url("https://ali-image.dabanjia.com/image/20220418/18/165027690701414.png");
    background-size: contain;
    padding-bottom: 46rpx;
    background-repeat: no-repeat;

    .code-content {
      margin-top: 88rpx;
      width: 580rpx;
      height: 730rpx;
      background: #ffffff;
      border-radius: 20px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      .share-logo {
        position: absolute;
        left: 50%;
        top: 6rpx;
        height: 164rpx;
        width: 164rpx;
        transform: translate(-50%, -50%);
      }

      .share-title {
        margin-top: 60rpx;
        font-size: 44rpx;
        color: #333333;
        font-weight: 500;
      }

      .share-b {
        position: absolute;
        top: 92rpx;
        right: 98rpx;
        width: 50rpx;
        height: 44rpx;
      }

      .code {
        width: 360rpx;
        height: 360rpx;
        margin-top: 102rpx;
      }

      .code-tip {
        margin-top: 40rpx;
        font-weight: 400;
        color: #333333;
        font-size: 24rpx;
      }
    }
  }
}
</style>