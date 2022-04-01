<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:41:39
 * @LastEditTime: 2022-03-31 20:49:48
 * @LastEditors: HanYongHui
-->
<template>
  <view class="login-warp">
    <image src="" mode="scaleToFill" />
    <button @click="getUserInfo">授权登录</button>
  </view>
</template>
<script lang="ts" setup>
import { defineComponent } from "vue";
import { useUserInfoHooks } from "../../hoosk/index";
const { storeData } = useUserInfoHooks();

/**
 * 1、调起微信授权弹窗
 * 2、拿到昵称和头像、私密信息串"encryptedData"
 * 3、上传私密信息串 判断是否已注册
 * 4、拿到token 存储跳转
 */
const getUserInfo = () => {
  uni.getUserProfile({
    desc: "用于完善资料",
    success: ({ userInfo, encryptedData }) => {
      console.log("------获取用户信息------", userInfo, encryptedData);
      storeData.userName = userInfo.nickName;
      storeData.avatarUrl = userInfo.avatarUrl;
      try {
        uni.setStorageSync("token", encryptedData);
        uni.switchTab({ url: "/pages/home/index" });
      } catch (e) {}
    },
  });
};
const login = () => {};
</script>
<style lang="scss" scoped>
.login-warp {
  button {
    width: 280rpx;
  }
}
</style>