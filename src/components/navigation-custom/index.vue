<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-04-01 16:13:40
 * @LastEditTime: 2022-04-01 17:46:44
 * @LastEditors: HanYongHui
-->
<template>
  <view
    class="navigation-bar"
    :style="`padding-top: ${storeData.statusBarHeight}px;`"
  >
    <view class="navigation-bar_content">
      <slot name="content"></slot>
    </view>
    <view :style="`height:${44}px`"></view>
  </view>
</template>
<script lang="ts" setup>
import { defineComponent } from "vue";
import { useUserInfoHooks } from "../../hoosk/index";
const { storeData } = useUserInfoHooks();
</script>
<style lang="scss" scoped>
.navigation-bar {
  z-index: 99;
  position: fixed;
  top: 0;
  width: 100%;
  .navigation-bar_content {
    width: 100%;
    height: 44px;
    display: flex;
    line-height: 44px;
  }
}
</style>