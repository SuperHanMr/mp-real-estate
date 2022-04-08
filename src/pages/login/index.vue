<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:41:39
 * @LastEditTime: 2022-04-07 19:30:40
 * @LastEditors: HanYongHui
-->
<template>
  <view class="login-warp">
    <image class="logo-image" src="../../images/logo.png" />
    <button @click="getUserInfo">微信授权</button>

    <!-- <button @click="getUserInfo">微信手机号一键登录</button> -->
  </view>
</template>
<script lang="ts" setup>
import { defineComponent } from "vue";
import { useUserInfoHooks } from "../../hoosk/index";
import { useLoginHooks } from "./hooks/index";
const { storeData } = useUserInfoHooks();
const { requestLogin, requestRegister } = useLoginHooks();

/**
 * 1、调起微信授权弹窗
 * 2、拿到昵称和头像
 * 3、上传私密信息串 判断是否已注册
 * 4、拿到token 存储跳转
 */

uni.login({
  provider: "weixin",
  success: ({ code }) => {
    requestLogin(code)
      .then((res) => {
        storeData.userName = res.data?.name || "";
        storeData.role = res.data?.role || 0;
        uni.switchTab({ url: "/pages/home/index" });
      })
      .catch((err) => {
        const { code } = err.data;
        console.log("异常", code);
      });
  },
});

const getUserInfo = () => {
  uni.getUserProfile({
    desc: "用于完善资料",
    success: ({ userInfo, rawData, signature }) => {
      console.log("------获取用户信息------", userInfo, signature, rawData);
      // storeData.userName = userInfo.nickName;
      // storeData.avatarUrl = userInfo.avatarUrl;
      // try {
      //   uni.setStorageSync("token", encryptedData);
      //   uni.switchTab({ url: "/pages/home/index" });
      // } catch (e) {}
      // requestLogin(code);
    },
  });
};
const login = () => {};
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