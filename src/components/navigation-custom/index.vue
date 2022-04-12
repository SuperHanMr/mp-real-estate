<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-04-01 16:13:40
 * @LastEditTime: 2022-04-12 18:24:42
 * @LastEditors: HanYongHui
-->
<template>
  <view
    class="navigation-bar"
    :class="{
      white: theme === 'white',
      transparent: theme === 'transparent',
    }"
    :style="`padding-top: ${storeData.statusBarHeight}px;`"
  >
    <view class="navigation-bar_content">
      <view class="back-icon" @click="backPage" v-if="isBack">
        <image :src="backIcon" />
      </view>
      <view class="share-btn" @click="onClickShare" v-if="shareBtn">
        <image :src="homeIcon" />
      </view>
      <text class="title" :style="`color:${titleColor}`">{{ title }}</text>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { defineComponent, defineProps, computed } from "vue";
import type { PropType } from "vue";
import whiteBackIcon from "../../images/back-icon.png";
import blackBackIcon from "../../images/black-back-icon.png";
import blackHomeIcon from "../../images/back-home-black.png";
import withekHomeIcon from "../../images/back-home-withe.png";

import { useUserInfoHooks } from "../../hoosk/index";
const { storeData } = useUserInfoHooks();
type Theme = "white" | "black" | "transparent";
const props = defineProps({
  backgroundColor: {
    type: String,
  },
  title: {
    type: String,
  },
  theme: {
    type: String as PropType<Theme>,
    default: "white",
  },
  isBack: {
    type: Boolean,
    default: true,
  },

  titleColor: {
    type: String,
  },

  shareBtn: {
    type: Boolean,
  },
});

const backIcon = computed(() => {
  return props.theme === "transparent" ? whiteBackIcon : blackBackIcon;
});

const homeIcon = computed(() => {
  return props.theme === "transparent" ? withekHomeIcon : blackHomeIcon;
});
const backPage = () => {
  // uni.navigateBack({ delta: 1 });
  let pages = getCurrentPages();
  // console.log(pages.length,'当前栈深度')
  if (pages.length < 2) {
    uni.switchTab({
      url: "/pages/home/index",
    });
  } else {
    uni.navigateBack({
      delta: 1,
    });
  }
};

const onClickShare = () => {
  uni.switchTab({
    url: "/pages/home/index",
  });
};
</script>
<style lang="scss" scoped>
.navigation-bar {
  z-index: 99;
  position: fixed;
  top: 0;
  width: 100%;
  background: transparent;
  transition: 0.3s;
  .navigation-bar_content {
    width: 100%;
    height: 44px;
    display: flex;
    line-height: 44px;
    position: relative;
    display: flex;
    justify-content: center;
    line-height: 44px;
    font-size: 34rpx;
    font-weight: bold;

    .back-icon {
      left: 0;
      position: absolute;
      height: 44px;
      width: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      image {
        width: 18rpx;
        height: 34rpx;
      }
    }

    .share-btn {
      left: 0;
      position: absolute;
      height: 44px;
      width: 44px;
      display: flex;
      align-items: center;
      justify-content: center;

      image {
        width: 64rpx;
        height: 64rpx;
      }
    }

    text {
      color: #fff;
    }
  }
}

.white {
  background-color: #fff;
  text {
    color: #333 !important;
  }
}

.transparent {
  color: #fff;
  background-color: transparent;
}
</style>