<!--
 * @Description: 楼盘详情
 * @Author: HanYongHui
 * @Date: 2022-03-31 21:00:01
 * @LastEditTime: 2022-05-25 18:09:35
 * @LastEditors: HanYongHui
-->
<template>
  <navigation-custom title="方案详情" :theme="theme" :shareBtn="fromShare" />
  <view class="case-detail-warp">
    <swiper
      class="house-type_image--swiper"
      :current="currentIndex"
      @change="swiperChange"
    >
      <swiper-item v-for="(item, index) of imgList.list" :key="index">
        <image class="bac-image" :src="item" @click="toImage(index)" />
      </swiper-item>
    </swiper>
    <view class="swiper-control">
      <view class="control-btn">
        <view
          :class="{ active: currentIndex <= imgList.bannerNum }"
          @click="changeCurrent(0)"
          >效果图</view
        >
        <view
          :class="{ active: currentIndex > imgList.bannerNum }"
          @click="changeCurrent(imgList.bannerNum + 1)"
          >户型图</view
        >
      </view>
      <view class="swiper-num">
        {{ currentIndex + 1 }}/{{ imgList.list.length }}
      </view>
    </view>
    <view class="case-content-warp">
      <view class="case-detail_head">
        <view class="case-detail-title">
          <text class="title">{{ caseDetail.schemeName }}</text>
          <view>
            <view
              class="case-type_describe--info"
              v-for="(item, index) in caseDetail.schemeTags"
              :key="index"
            >
              <text>{{ item.schemeTagName }}</text>
            </view>
          </view>
        </view>
        <view class="case-detail_head-content">
          <view class="case-detail_head--left">
            <view class="describe">
              <image src="../../images/estate-icon.png" />
              <text>{{ caseDetail.houseWithSchemeInfo.houseTypeName }} </text>
            </view>
            <view class="describe">
              <image class="special" src="../../images/house-icon.png" />
              <text
                >{{ caseDetail.houseWithSchemeInfo.specification }}｜面积：{{
                  caseDetail.houseWithSchemeInfo.floorAreaInside
                }}㎡ ｜{{ caseDetail.houseWithSchemeInfo.direction }}
              </text>
            </view>
          </view>
          <view class="case-detail_head--right" @click="getCodeImage">
            <image src="../../images/code-icon.png" />
            <text>方案二维码</text>
          </view>
        </view>
      </view>
      <product-list :schemeId="caseId" />
    </view>

    <view class="report" v-if="storeData.role === 2">
      <view class="report-text">精选装修套餐 限时参团享优惠</view>
      <view class="report-shadow"></view>
      <view class="report-btn" @click="report">
        <text class="text">立即报名</text>
        <!-- <view class="symbol"> ¥<text class="num">0</text> </view> -->
        <image src="../../images/report-btn-bg.png" />
      </view>
    </view>
  </view>
  <code-dialog
    style="width: 100%; height: 100%"
    :codeUrl="codeUrl"
    from="方案"
    v-model:show="codeDialogShow"
  />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { signUpRecord } from "../../api/case";
import {
  onLoad,
  onPullDownRefresh,
  onPageScroll,
  onShareAppMessage,
} from "@dcloudio/uni-app";
import navigationCustom from "@/components/navigation-custom/index.vue";
import { useUserInfoHooks, switchHome } from "../../hoosk/index";
import codeDialog from "@/components/code-dialog/index.vue";
import { getCaseDetailHooks } from "./hooks/index";
import ProductList from "./components/product-list.vue";
export default defineComponent({
  name: "",
  components: {
    navigationCustom,
    codeDialog,
    ProductList,
  },
  setup() {
    const { storeData } = useUserInfoHooks();
    const theme = ref<"white" | "black" | "transparent">("transparent");
    //轮播banner激活控制
    const currentIndex = ref<number>(0);
    const caseId = ref<number>(0);
    const fromShare = ref<Boolean>(false);
    const {
      requestCaseDetail,
      requestReport,
      requestCode,
      requestFindParentIds,
      enterNum,
      caseDetail,
      imgList,
      codeUrl,
      codeDialogShow,
      parentId,
    } = getCaseDetailHooks();
    onLoad((e: any) => {
      console.log("---onLoad---", e);
      if (e.scene) {
        // 二维码  分享进入
        const scene = decodeURIComponent(e.scene).split("&");
        console.log("二维码分享进入", scene);
        caseId.value = +scene[0].split("=")[1];
        const sahreId = +scene[1].split("=")[1];
        uni.setStorageSync("shareId", +sahreId ? sahreId : "");
        fromShare.value = sahreId ? true : false;
      } else {
        caseId.value = +e.caseId;
        fromShare.value = e.shareId ? true : false;
        if (e.shareId) {
          uni.setStorageSync("shareId", +e.shareId ? e.shareId : "");
        }
      }
      enterNum.value = 0;
      requestCaseDetail(caseId.value);
      requestFindParentIds({ pageId: caseId.value, level: 3 });
    });

    const getCodeImage = () => {
      let shareId: number;
      if (storeData.role === 2) {
        shareId = uni.getStorageSync("shareId") || 0;
      } else {
        shareId = +storeData.userId;
      }
      requestCode(`caseId=${caseId.value}&shareId=${shareId}`);
    };
    onShareAppMessage(() => {
      let shareId: number;
      if (storeData.role === 2) {
        shareId = uni.getStorageSync("shareId") || 0;
      } else {
        shareId = +storeData.userId;
      }
      return {
        imageUrl: imgList.list[0],
        title: caseDetail.value.schemeName,
        path: `/pages/case-detail/index?caseId=${caseId.value}&shareId=${shareId}`,
      };
    });
    onPullDownRefresh(() => {
      requestCaseDetail(caseId.value);
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 500);
    });
    onPageScroll((e) => {
      if (e.scrollTop > 64) {
        theme.value = "white";
      } else {
        theme.value = "transparent";
      }
    });
    const swiperChange = (e: any) => {
      currentIndex.value = e.detail.current;
    };
    const changeCurrent = (num: number) => {
      currentIndex.value = num;
    };

    const toImage = (index: number) => {
      uni.navigateTo({
        url: "/pages/picture-preview/index?index=" + index,
      });
    };
    const report = async () => {
      let caseBags: any = [];
      caseDetail.value.caseBags.forEach((item) => {
        if (item.isChoose) {
          caseBags.push({
            bagDesc: item.bagDesc,
            buyItNow: item.buyItNow,
            caseBagName: item.caseBagName,
            caseInfo: item.caseInfo,
          });
        }
      });
      if (caseBags.length) {
        let data = {
          userId: storeData.userId,
          estateId: parentId.value.estateId,
          schemeId: caseId.value,
          schemeSnapshot: JSON.stringify({ caseBags: caseBags }),
          offerPrice: 0,
          schemeName: caseDetail.value.schemeName,
          consultantId: uni.getStorageSync("shareId") || "",
          houseTypeId: parentId.value.houseTypeId,
        };
        console.log(signUpRecord);
        let res = await signUpRecord(data as any);
        switch (res.code) {
          case 1:
            uni.showToast({
              title: "报名成功",
              icon: "success",
              mask: true,
            });
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              });
            }, 1000);
            break;
          case 204:
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
            break;
          default:
            break;
        }

        console.log(res);
      } else {
        uni.showToast({
          title: "请选择装修报价",
          icon: "none",
          duration: 1000,
        });
      }
    };

    return {
      caseId,
      theme,
      codeDialogShow,
      currentIndex,
      storeData,
      caseDetail,
      imgList,
      codeUrl,
      fromShare,
      swiperChange,
      changeCurrent,
      toImage,
      report,
      getCodeImage,
    };
  },
});
</script>
<style lang="scss" scoped>
.case-detail-warp {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;

  .house-type_image--swiper {
    height: 562rpx;
  }
  .swiper-control {
    position: absolute;
    top: 446rpx;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    .control-btn {
      width: 204rpx;
      height: 44rpx;
      background: rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(5px);
      /* Note: backdrop-filter has minimal browser support */
      border-radius: 60px;
      line-height: 44rpx;

      view {
        display: inline-block;
        width: 50%;
        text-align: center;
        color: #fff;
        font-size: 20rpx;
        font-weight: 500;
        letter-spacing: 0.1px;
        vertical-align: top;
      }
      .active {
        background-color: #fff;
        border-radius: 120rpx;
        color: #333;
      }
    }
    .swiper-num {
      position: absolute;
      right: 32rpx;
      height: 44rpx;
      line-height: 44rpx;
      padding: 0 20rpx;
      color: #fff;
      font-size: 20rpx;
      letter-spacing: 0.1px;
      background: rgba(0, 0, 0, 0.22);
      border-radius: 120px;
    }
  }
  .swiper-item {
    // height: 562rpx;
  }
  .bac-image {
    width: 100%;
    // height: 462rpx;
    // min-height: 470rpx;
    height: 100%;
  }

  .case-content-warp {
    position: absolute;
    margin-top: -37rpx;
    width: 100%;
  }

  .case-detail_head {
    width: 100%;

    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.81) 0%,
      rgba(242, 242, 242, 0.9) 100%
    );
    border: 1px solid #ffffff;
    box-sizing: border-box;
    backdrop-filter: blur(20px);
    padding: 40rpx 40rpx 60rpx 40rpx;
    border-top-right-radius: 40rpx;
    border-top-left-radius: 40rpx;
    // display: flex;
    .case-detail-title {
      padding-bottom: 40rpx;
      border-bottom: 0.5px solid #f1f1f1;
      // border-image:linear-gradient(270deg, rgba(223, 223, 223, 0) 0%, #000 100%);
      .title {
        margin-bottom: 16rpx;
        color: #222;
        font-size: 40rpx;
        font-weight: 500;
        line-height: 56rpx;
      }
      .case-type_describe--info {
        display: inline-block;
        height: 40rpx;
        padding: 0 12rpx;
        line-height: 40rpx;
        background: #f7f3f0;
        border-radius: 3px;
        margin-right: 16rpx;
        color: #b27436;
        font-size: 22rpx;
      }
    }
    .case-detail_head-content {
      display: flex;
      padding-top: 13rpx;
      // height: 116rpx;
      // align-items: center;
    }
    .case-detail_head--left {
      display: flex;
      flex-direction: column;

      .describe {
        margin-top: 14rpx;
        display: flex;
        align-items: center;
        image {
          width: 22rpx;
          height: 22rpx;
          margin-right: 11rpx;
        }
        .special {
          width: 20rpx;
          height: 22rpx;
        }
        text {
          font-weight: 400;
          font-size: 24rpx;
          line-height: 34rpx;
          color: #333;
        }
      }
    }

    .case-detail_head--right {
      margin-left: auto;
      background: #ffffff;
      border: 1prx solid #e9e9e9;
      box-sizing: border-box;
      box-shadow: 0px 6rpx 18rpx rgba(0, 0, 0, 0.04);
      width: 184rpx;
      height: 122rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10rpx 30rpx 10rpx 10rpx;
      flex-direction: column;
      image {
        height: 48rpx;
        width: 48rpx;
      }
      text {
        margin-top: 4rpx;
        font-weight: 400;
        font-size: 20rpx;
        line-height: 28rpx;
        color: #333333;
      }
    }

    .case-detail_head--right:active {
      background: #f5f5f5;
    }
  }
}

.report {
  position: fixed;
  background: #fff;
  width: calc(100% - 64rpx);
  margin-left: 32rpx;
  bottom: 82rpx;
  z-index: 1;
  .report-text {
    height: 88rpx;
    line-height: 88rpx;
    padding: 0 24rpx;
    background: linear-gradient(124.17deg, #333333 29.41%, #222222 81.43%);
    border-radius: 8px;
    color: #fff;
    font-size: 28rpx;
  }
  .report-shadow {
    position: absolute;
    top: 0;
    right: 60rpx;
    height: 88rpx;
    transform: skewX(-15deg);
    background: linear-gradient(126.14deg, #f0cca2 30.84%, #e0a968 87.02%);
    width: 200rpx;
    box-shadow: #222;
  }
  .report-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 104rpx;
    background: linear-gradient(126.14deg, #f0cca2 30.84%, #e0a968 87.02%);
    width: 248rpx;
    color: #222;
    border-radius: 16rpx;
    box-sizing: border-box;
    padding: 16rpx 30rpx;
    image {
      position: absolute;
      width: 248rpx;
      height: 104rpx;
      z-index: 11;
      top: 0;
      left: 0;
    }
    text {
      letter-spacing: 0.1px;
    }
    .text {
      font-weight: bold;
      font-size: 30rpx;
      display: block;
      text-align: center;
      line-height: 87rpx;
    }
    view {
      font-size: 20rpx;
      letter-spacing: 0, 1px;
      text-align: center;
      .num {
        font-size: 26rpx;
        display: inline-block;
        margin-left: 4rpx;
      }
    }
  }
}
</style>