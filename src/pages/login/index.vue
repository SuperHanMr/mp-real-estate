<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:41:39
 * @LastEditTime: 2022-04-12 10:50:24
 * @LastEditors: HanYongHui
-->
<template>
  <view class="login-warp">
    <image class="logo-image" src="../../images/logo.png" />

    <view class="bottom-warp">
      <button v-if="!rawDataStr" @click="login">微信授权</button>
      <button
        v-if="rawDataStr"
        open-type="getPhoneNumber"
        @getphonenumber="bindgetPhoneNumber"
      >
        微信手机号一键登录
      </button>
      <view class="agreement-warp" @click="isAgreement = !isAgreement">
        <image :src="chooseIcon" />
        <text>登录/注册即代表您已同意</text>
        <text @click.stop="clickEvent('serverAgreement')"
          >《打扮家平台服务协议》</text
        >
        <text @click.stop="clickEvent('privacyAgreement')">、《隐私政策》</text>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed, defineComponent, reactive, ref, watch } from "vue";
import unSelectIcon from "../../images/no-select-icon.png";
import selectIcon from "../../images/select-icon.png";

import { useUserInfoHooks } from "../../hoosk/index";
import { useLoginHooks } from "./hooks/index";
const { storeData } = useUserInfoHooks();
const { requestLogin, requestRegister } = useLoginHooks();
const rawDataStr = ref<string>("");
const signatureStr = ref<string>("");

const getUserInfo = () => {
  uni.getUserProfile({
    desc: "用于完善资料",
    success: ({ rawData, signature }) => {
      console.log("------获取用户信息------", signature, rawData);
      rawDataStr.value = rawData;
      signatureStr.value = signature;
    },
  });
};
const bindgetPhoneNumber = (res: any) => {
  requestRegister({
    code: res.detail.code as string,
    signature: signatureStr.value,
    rawData: rawDataStr.value,
  }).then((res) => {
    // 小程序注册 都是用户
    storeData.role = 2;
    storeData.isLogin = true;
    uni.switchTab({ url: "/pages/home/index" });
  });
};
const isRegister = ref<number>(0);
const login = () => {
  console.log("storeData", storeData);
  if (!isAgreement.value) {
    uni.showToast({
      title: "请勾选服务协议",
      icon: "error",
      mask: true,
    });
    return;
  }
  switch (storeData.isRegister) {
    case 0:
      // 未注册
      getUserInfo();
      break;
    case 1:
      break;
    case 2:
      // 处理封禁
      break;
  }
};

const isAgreement = ref<boolean>(true);
const chooseIcon = computed(() => {
  return isAgreement.value ? selectIcon : unSelectIcon;
});

const clickEvent = (type: string) => {
  switch (type) {
    case "serverAgreement":
      break;
    case "privacyAgreement":
      break;
  }
};
</script>
<style lang="scss" scoped>
.login-warp {
  height: 100%;
  width: 100%;
  background-image: url("https://ali-image.dabanjia.com/image/20220407/10/164929927492708.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .logo-image {
    margin-top: 328rpx;
    width: 365rpx;
    height: 134rpx;
  }

  .bottom-warp {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 42rpx;
    button {
      width: 614rpx;
      height: 92rpx;
      background: linear-gradient(117.02deg, #fa3b34 24.56%, #ff6a33 92.21%);
      border-radius: 24rpx;
      font-weight: bold;
      font-size: 30rpx;
      line-height: 92rpx;
      text-align: center;
      color: #ffffff;
    }

    .agreement-warp {
      margin-top: 124rpx;
      padding: 40rpx 0;
      display: flex;
      align-items: center;

      image {
        width: 28rpx;
        height: 28rpx;
        margin-right: 12rpx;
      }
      text:nth-child(2) {
        font-weight: 400;
        font-size: 20rpx;
        line-height: 28rpx;
        color: #999999;
      }
      text:nth-child(3) {
        font-weight: bold;
        font-size: 20rpx;
        line-height: 28rpx;
        color: #333;
      }

      text:nth-child(4) {
        font-weight: bold;
        font-size: 20rpx;
        line-height: 28rpx;
        color: #333;
      }
    }
  }
}
</style>