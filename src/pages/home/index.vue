<!--
 * @Description: 主页
 * @Author: HanYongHui
 * @Date: 2022-03-29 18:00:39
 * @LastEditTime: 2022-04-14 12:36:33
 * @LastEditors: HanYongHui
-->
<template>
  <template v-if="storeData.isLogin">
    <template v-if="storeData.role === 2 && storeData.estateId">
      <!-- 用户且有楼盘详情浏览记录 -->
      <navigation-custom title="楼盘详情" :theme="theme" :isBack="false" />
      <estate-detail :estateId="storeData.estateId" ref="estateDetailDom" />
      <view class="guide-dbj-mp" @click="openDbjMp" v-if="storeData.role === 2">
        <image class="logo-icon" src="../../images/mini-logo.png" />
        <view class="dec">
          <text>打开“打扮家装修”小程序</text>
          <text>查看更多精彩案例</text>
        </view>
        <button class="opne-button">立即打开</button>
      </view>
    </template>
    <template
      v-if="
        storeData.role == 1 || (storeData.role === 2 && !storeData.estateId)
      "
    >
      <!-- 楼盘列表 -->
      <navigation-custom
        title="楼盘"
        theme="transparent"
        :isBack="false"
        titleColor="#333"
      />
      <estate-list />
    </template>
  </template>
</template>
<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import {
  onLoad,
  onPageScroll,
  onPullDownRefresh,
  onReachBottom,
  onShareAppMessage,
} from "@dcloudio/uni-app";
import { useUserInfoHooks } from "../../hoosk/index";
import { useEstateListHook } from "./hooks/index";
import estateDetail from "../estate-detail/components/detail.vue";
import navigationCustom from "../../components/navigation-custom/index.vue";
import estateList from "./components/index.vue";

export default defineComponent({
  name: "",
  components: {
    navigationCustom,
    estateList,
    estateDetail,
  },
  setup() {
    const { storeData } = useUserInfoHooks();
    const { requestEstateList, loadType } = useEstateListHook();
    const estateDetailDom = ref<any>(null);
    onLoad((e) => {});
    watch(
      () => storeData.isLogin,
      () => {
        if (storeData.role === 2) {
          uni.setTabBarItem({
            index: 1,
            text: "我的",
            iconPath: "/static/tab-image/my-un-icon.png",
            selectedIconPath: "/static/tab-image/my-icon.png",
          });
        }
      }
    );

    const theme = ref<"white" | "black" | "transparent">("transparent");
    onPageScroll((e) => {
      if (e.scrollTop > 64) {
        theme.value = "white";
      } else {
        theme.value = "transparent";
      }
    });

    onPullDownRefresh(() => {
      if (!storeData.estateId) {
        requestEstateList();
      }
      if (storeData.role === 2 && storeData.estateId) {
        estateDetailDom.value?.refreshPage();
      }
    });
    onReachBottom(() => {
      if (!storeData.estateId) {
        if (loadType.value === "complete") {
          return;
        }
        loadType.value = "load";
        requestEstateList(true);
      }
    });

    onShareAppMessage(() => {
      return {
        title: "楼盘详情",
        path: `/pages/home/index?shareId=${storeData.userId}`,
      };
    });

    const openDbjMp = () => {
      uni.navigateToMiniProgram({
        appId: "wx2e14a7847b8047b5",
        path: "pages/home/index/index",
        success: (result) => {},
        fail: (error) => {},
      });
    };
    return {
      storeData,
      theme,
      estateDetailDom,
      openDbjMp,
    };
  },
});
</script>
<style lang="scss" scoped>
.list {
  padding-top: 128rpx;
  height: calc(100% - 128rpx);
  width: 100%;
  position: absolute;
}

.image-bg {
  width: 100%;
  position: absolute;
  top: 0;
  height: 268rpx;
}

.guide-dbj-mp {
  position: fixed;
  bottom: 32rpx;
  width: calc(100% - 64rpx);
  display: flex;
  align-items: center;
  height: 120rpx;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 10rpx;
  margin-left: 32rpx;

  .logo-icon {
    margin-left: 40rpx;
    height: 72rpx;
    width: 72rpx;
  }
  .dec {
    display: flex;
    flex-direction: column;
    margin-left: 16rpx;

    text:nth-child(1) {
      font-weight: bold;
      font-size: 26rpx;
      line-height: 36rpx;
      color: #ffffff;
    }
    text:nth-child(2) {
      font-weight: 400;
      font-size: 20rpx;
      line-height: 28rpx;
      color: #ffffff;
    }
  }

  .opne-button {
    padding: 0;
    background: linear-gradient(116.19deg, #f83112 16.48%, #fd6421 83.52%);
    border-radius: 16rpx;
    height: 56rpx;
    width: 140rpx;
    margin-left: auto;
    margin-right: 48rpx;
    font-weight: bold;
    font-size: 24rpx;
    line-height: 56rpx;

    color: #ffffff;
  }
  .close-icon {
  }
}
</style>

<style>
page {
  background: #fff;
}
</style>