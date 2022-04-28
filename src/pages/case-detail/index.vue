<!--
 * @Description: 楼盘详情
 * @Author: HanYongHui
 * @Date: 2022-03-31 21:00:01
 * @LastEditTime: 2022-04-19 16:43:12
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

      <view class="house-type-list">
        <view class="list-title">
          <view></view>
          <text>装修报价</text>
        </view>
        <view class="case-type-conetnt">
          <view
            class="case-type-warp"
            v-for="(item, index) in caseDetail.productBagVOS"
            :key="index"
            :class="{
              'is-user': storeData.role === 2,
              'active-choose': hasGoods(index),
            }"
            @click="chooseGoods(item, index)"
          >
            <image src="../../images/case-bg.png" class="case-bg" mode="" />
            <image
              src="../../images/choose-bg.png"
              v-if="hasGoods(index)"
              class="choose-bg"
              mode=""
            />
            <view class="case-content">
               <view class="case-name">
                <view class="icon-style pro-icon">商品</view>
                <view class="text">{{item.productBagName.productBagName }}</view>
              </view>
              <view class="case-desc">{{ item.bagDesc.bagPackageDesc }}</view>
              <view class="case-price">
                <text class="price-symbol">¥</text>
                <text class="price-num price-font">{{
                  item.buyItNow.buyItNow.toFixed(2)
                }}</text>
              </view>
              <view class="case-btn" @click.stop="toCheckGood(index,"product")">
                <image
                  :src="hasGoods(index) ? goodsPackActive : goodsPack"
                ></image>
                <text :class="{ active: hasGoods(index) }"
                  >查看套餐所含全部商品</text
                >
              </view>
            </view>
          </view>
          <!-- 二期 施工包 -->
          <view
            class="case-type-warp"
            v-for="(item2, index2) in caseDetail.constructionBags"
            :key="index2"
            :class="{
              'is-user': storeData.role === 2,
              'active-choose': hasGoods(index2),
            }"
            @click="chooseGoods(item2, index2)"
          >
            <image src="../../images/case-bg.png" class="case-bg" mode="" />
            <image
              src="../../images/choose-bg.png"
              v-if="hasGoods(index2)"
              class="choose-bg"
              mode=""
            />
            <view class="case-content">
              <view class="case-name">
                <view class="icon-style con-icon">施工</view>
                <!-- 产品袋名 -->
                <view class="text">{{item2.constructionBagName.constructionBagName }}</view>
              </view>
              <!-- 套包简介 -->
              <view class="case-desc">{{ item2.bagDesc.bagPackageDesc }}</view>
              <view class="case-price">
                <text class="price-symbol">¥</text>
                <text class="price-num price-font">{{
                  item2.buyItNow.buyItNow.toFixed(2)
                }}</text>
              </view>
              <view class="case-btn" @click.stop="toCheckGood(index2,"construct")">
                <image
                  :src="hasGoods(index2) ? goodsPackActive : goodsPack"
                ></image>
                <text :class="{ active: hasGoods(index2) }"
                  >查看套餐所含全部施工项</text
                >
              </view>
            </view>
          </view>

          <view class="report" v-if="storeData.role === 2">
            <view class="report-text">精选装修套餐 限时参团享优惠</view>
            <view class="report-shadow"></view>
            <view class="report-btn" @click="report">
              <text class="text">立即报名</text>
              <view class="symbol">
                ¥<text class="num">{{ goodPrice.toFixed(2) }}</text>
              </view>
              <image src="../../images/report-btn-bg.png" mode="" />
            </view>
          </view>
        </view>
        <!-- <load-more :loadType="loadType" /> -->
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
import { defineComponent, computed, ref, watch, onMounted } from "vue";
import {
  onLoad,
  onPullDownRefresh,
  onReachBottom,
  onPageScroll,
  onShareAppMessage,
} from "@dcloudio/uni-app";
import navigationCustom from "@/components/navigation-custom/index.vue";
import { useUserInfoHooks, switchHome } from "../../hoosk/index";
import loadMore from "@/components/load-more/index.vue";
import codeDialog from "@/components/code-dialog/index.vue";
import { getCaseDetailHooks } from "./hooks/index";
import { productItem } from "../../api/case";
import goodsPack from "../../images/goods-pack.png";
import goodsPackActive from "../../images/goods-pack-active.png";
export default defineComponent({
  name: "",
  components: {
    navigationCustom,
    loadMore,
    codeDialog,
  },
  setup() {
    const { storeData } = useUserInfoHooks();
    const loadType = ref<"succeed" | "error" | "load" | "complete">("succeed");
    const theme = ref<"white" | "black" | "transparent">("transparent");
    //轮播banner激活控制
    const currentIndex = ref<number>(0);
    const caseId = ref<number>(0);
    const fromShare = ref<Boolean>(false);
    const goodList = ref<productItem[]>([]);
    const goodPrice = computed(() => {
      let num = 0;
      goodList.value.forEach((item) => {
        num = num + item.buyItNow.buyItNow;
      });
      return num;
    });
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
      goodList.value = [];
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
    type swiper = {
      detail: {
        current: number;
      };
    };
    watch(caseDetail, () => {
      // goodList.value.push(caseDetail.value.productBagVOS[0])
      chooseGoods(caseDetail.value.productBagVOS[0], 0);
      //分享进入的  需要查询一下房屋是否启用
      if (
        caseDetail.value.houseWithSchemeInfo.status !== 1 ||
        caseDetail.value.estateState !== 1
      ) {
        switchHome("该方案已下架");
      }
    });
    const swiperChange = (e: swiper) => {
      currentIndex.value = e.detail.current;
    };
    const changeCurrent = (num: number) => {
      currentIndex.value = num;
    };
    const chooseGoods = (item: productItem, index: number) => {
      if (storeData.role !== 2) {
        return;
      }
      let has = goodList.value.findIndex((item) => {
        return item.index === index;
      });
      if (has >= 0) {
        goodList.value.splice(has, 1);
      } else {
        item.index = index;
        goodList.value.push(item);
      }
    };
    const hasGoods = (index: number) => {
      let num = goodList.value.findIndex((item) => {
        return item.index === index;
      });
      return num >= 0;
    };
    const toImage = (index: number) => {
      uni.navigateTo({
        url: "/pages/picture-preview/index?index=" + index,
      });
    };
    const report = () => {
      if (goodList.value.length === 0) {
        return;
      }
      let data = {
        userId: storeData.userId,
        estateId: 0,
        schemeId: caseId.value,
        schemeSnapshot: JSON.stringify(goodList.value),
        offerPrice: goodPrice.value * 100,
        schemeName: caseDetail.value.schemeName,
        consultantId: uni.getStorageSync("shareId") || "",
        houseTypeId: 0,
      };
      console.log(data, "报名");
      requestReport(data, () => {
        goodList.value = [];
      });
    };

    const toCheckGood = (index: number,type: string) => {
      // if(type=="product"){
      //   uni.navigateTo({
      //     url:
      //       "/pages/clue/material-upgrade/material-upgrade?index=" +
      //       index +
      //       "&source=true",
      //   });
      // }else{
      //   uni.navigateTo({
      //     url:
      //     "/pages/clue/dismantle-detail/dismantle-detail?index="+
      //     index +
      //     "&source=true"
      //   })
      // }
      uni.navigateTo({
        url:
        "/pages/clue/dismantle-detail/dismantle-detail?index="+
        index +
        "&source=true"
      })
    };
    return {
      // imageUrl,
      loadType,
      theme,
      codeDialogShow,
      currentIndex,
      storeData,
      caseDetail,
      imgList,
      goodPrice,
      codeUrl,
      goodsPackActive,
      goodsPack,
      fromShare,
      swiperChange,
      changeCurrent,
      chooseGoods,
      toImage,
      hasGoods,
      report,
      toCheckGood,
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

.house-type-list {
  background: #ffffff;
  padding-top: 48rpx;
  margin-top: -20rpx;
  position: absolute;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
  width: 100%;
  .list-title {
    display: flex;
    align-items: center;
    :nth-child(1) {
      width: 6rpx;
      height: 28rpx;
      background: #333333;
      border-top-right-radius: 6rpx;
      border-bottom-right-radius: 6rpx;
    }
    :nth-child(2) {
      margin-left: 24rpx;
      font-weight: 500;
      font-size: 32rpx;
      line-height: 44rpx;
      color: #333333;
    }
  }
  .is-user {
    border: 0.5px solid #ececec;
  }
  view .active-choose {
    background: linear-gradient(281.11deg, #ffffff 0%, #fffbf7 100%);
    border: 0.5px solid #222;
    box-sizing: border-box;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.06);
  }
  .case-type-conetnt {
    padding: 8rpx 32rpx 250rpx;
    .case-type-warp {
      position: relative;
      padding: 32rpx 40rpx;
      background: #fafafa;
      border-radius: 24rpx;
      box-sizing: border-box;
      margin: 24rpx 0;

      .case-name {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .icon-style{
          width: 52rpx;
          height: 32rpx;
          line-height: 32rpx;
          text-align: center;
          border-radius: 6rpx;
          font-size: 20rpx;
          font-weight: 500;
          margin-right: 12rpx;
        }
        .pro-icon{
          background: #E9EFF5;
          color: #586E85;
        }
        .con-icon{
          background: #EEE8E5;
          color: #856858;
        }

        .text{
          margin-bottom: 1px;
          color: #333;
          font-weight: 500;
          font-size: 30rpx;
          letter-spacing: 0.1px;
        }
      }
      .case-desc {
        width: 100%;
        color: #999;
        letter-spacing: 0.2px;
        font-size: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
      .case-price {
        margin-top: 32rpx;
        margin-bottom: 24rpx;
        .price-symbol {
          color: #333;
          font-size: 26rpx;
          margin-right: 8rpx;
        }
        .price-num {
          font-size: 40rpx;
          color: #333;
        }
      }
      .active {
        font-weight: bold;
        color: #b88c58 !important;
      }
      .case-btn {
        width: 100%;
        height: 68rpx;
        text-align: center;
        background-color: #fff;
        border: 0.5px solid #ededed;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        image {
          width: 20rpx;
          height: 20rpx;
          margin-right: 12rpx;
          vertical-align: middle;
        }
        text {
          font-size: 24rpx;
          letter-spacing: 0.1px;
          color: #666;
        }
      }
      .case-bg {
        position: absolute;
        right: 0;
        top: 0;
        width: 188rpx;
        height: 174rpx;
      }
      .choose-bg {
        position: absolute;
        right: 0;
        top: 0;
        width: 50rpx;
        height: 30rpx;
      }
    }
    .report {
      position: fixed;
      bottom: 82rpx;
      width: calc(100% - 64rpx);
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
  }
}
</style>