<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:41:39
 * @LastEditTime: 2022-04-08 14:52:49
 * @LastEditors: HanYongHui
-->
<template>
  <view class="login-warp">
    <image class="logo-image" src="../../images/logo.png" />
    <button v-if="!rawDataStr" @click="getUserInfo">微信授权</button>
    <button
      v-if="rawDataStr"
      open-type="getPhoneNumber"
      @getphonenumber="bindgetPhoneNumber"
    >
      微信手机号一键登录
    </button>
  </view>
</template>
<script lang="ts" setup>
import { defineComponent, ref, watch } from "vue";
import { useUserInfoHooks } from "../../hoosk/index";
import { useLoginHooks } from "./hooks/index";
const { storeData } = useUserInfoHooks();
const { requestRegister } = useLoginHooks();
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
    uni.switchTab({ url: "/pages/home/index" });
  });
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
    margin-top: 200rpx;
    width: 365rpx;
    height: 134rpx;
  }
  button {
    margin-top: 700rpx;
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
}
</style>