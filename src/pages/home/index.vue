<!--
 * @Description: 主页
 * @Author: HanYongHui
 * @Date: 2022-03-29 18:00:39
 * @LastEditTime: 2022-05-16 14:36:31
 * @LastEditors: HanYongHui
-->
<template>
  <template v-if="storeData.isLogin">
    <template v-if="storeData.role === 2 && storeData.estateId">
      <!-- 用户且有楼盘详情浏览记录 -->
      <navigation-custom title="楼盘详情" :theme="theme" :isBack="false" />
      <estate-detail
        :estateId="storeData.estateId"
        ref="estateDetailDom"
        page-type="home"
      />
      <view v-if="storeData.role === 2 && showOpenDbjMp" class="guide-dbj-mp">
        <image class="logo-icon" src="../../images/mini-logo.png" />
        <view class="dec">
          <text>打开“打扮家装修”小程序</text>
          <text>查看更多精彩案例</text>
        </view>
        <button class="opne-button" @click="openDbjMp">立即打开</button>
        <view class="close-warp" @click.stop="showOpenDbjMp = false">
          <image src="../../images/close-icon.png" />
        </view>
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
  onShow,
  onPullDownRefresh,
  onReachBottom,
  onShareAppMessage,
} from "@dcloudio/uni-app";
import { useUserInfoHooks } from "../../hoosk/index";
import { useLoginHooks } from "../login/hooks/index";
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
    const { requsetBrowseRecord } = useLoginHooks();
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
    if (storeData.isLogin && storeData.role === 2) {
      uni.setTabBarItem({
        index: 1,
        text: "我的",
        iconPath: "/static/tab-image/my-un-icon.png",
        selectedIconPath: "/static/tab-image/my-icon.png",
      });
    }
    onShow(() => {
      if (storeData.role === 2 && storeData.isLogin) {
        // 查询浏览记录
        requsetBrowseRecord().then((res) => {
          storeData.estateId = res.data?.estateId || 0;
        });
      }
    });

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

    const showOpenDbjMp = ref<boolean>(false);
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
      showOpenDbjMp,
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
  border-radius: 16rpx;
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
      opacity: 0.8;
    }
  }

  .opne-button {
    padding: 0;
    background: linear-gradient(297.2deg, #e0a968 18.79%, #f0cca2 86.66%);
    border-radius: 8rpx;
    height: 56rpx;
    width: 140rpx;
    margin-left: auto;
    margin-right: 48rpx;
    font-weight: bold;
    font-size: 24rpx;
    line-height: 56rpx;
    color: #222;
  }
  .close-warp {
    position: absolute;
    width: 44rpx;
    height: 30rpx;
    top: 5rpx;
    right: 0;
    background: rgba(65, 52, 52, 0.23);
    border-top-right-radius: 10rpx;
    border-bottom-left-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      height: 15rpx;
      width: 15rpx;
    }
  }
}
</style>

<style>
page {
  background: #fff;
}
</style>