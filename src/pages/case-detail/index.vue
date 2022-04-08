<!--
 * @Description: 楼盘详情
 * @Author: HanYongHui
 * @Date: 2022-03-31 21:00:01
 * @LastEditTime: 2022-04-02 18:34:44
 * @LastEditors: HanYongHui
-->
<template>
  <navigation-custom title="方案详情" :theme="theme" />
  <view class="case-detail-warp">
    <!-- <img class="bac-image" :src="imageUrl" mode="aspectFill" /> -->
    <swiper class="house-type_image--swiper" :autoplay="true" :current="currentIndex" @change="swiperChange">
      <swiper-item>
        <image class="bac-image" :src="imageUrl" mode="widthFix" />
      </swiper-item>
      <swiper-item>
        <image class="bac-image" src="https://ali-res-test.dabanjia.com/res/20220322/15/1647934285886_9412%2403.jpg" mode="widthFix" />
      </swiper-item>
      <swiper-item>
        <image class="bac-image" src="https://ali-res-test.dabanjia.com/res/20220322/15/1647934285886_9412%2403.jpg" mode="widthFix" />
      </swiper-item>
    </swiper>
    <view class="swiper-control">
      <view class="control-btn">
        <view :class="{active:currentIndex<=1}" @click="changeCurrent(1)">效果图</view>
        <view :class="{active:currentIndex>1}" @click="changeCurrent(2)">户型图</view>
      </view>
      <view class="swiper-num">
        3/30
      </view>
    </view>
    <view class="case-content-warp">

      <view class="case-detail_head">
        <view class="case-detail-title">
        <text class="title">墙体改一体 秒变二居室墙体改一体秒变二居室</text>
        <view>
        <view class="case-type_describe--info" v-for="(item, index) in 4" :key="index">
              <text>灰色系</text>
            </view>
        </view>
      </view>
      <view class="case-detail_head-content">
        <view class="case-detail_head--left">
          <view class="describe">
            <image src="../../images/estate-icon.png" />
            <text>北区1-3栋 </text>
          </view>
          <view class="describe">
            <image src="../../images/house-icon.png" />
            <text>1室1厅1卫｜面积：69.5㎡ ｜东北 </text>
          </view>
        </view>
        <view class="case-detail_head--right" @click="codeDialogShow = true">
          <image src="../../images/code-icon.png" />
          <text>户型二维码</text>
        </view>
      </view>
      </view>

      <view class="house-type-list">
        <view class="list-title">
          <view></view>
          <text>装修报价</text>
        </view>
        <view class="case-type-conetnt">
          <view class="case-type-warp" v-for="item in 6" :key="item">
            <image src="../../images/case-bg.png" class="case-bg" mode="" />
            <view  class="case-content">
              <text class="case-name">软装家具</text>
              <text class="case-desc">这里的文字不建议过多这里的文字不建议是的打开方式过多这里这里</text>
              <view class="case-price">
                <text class="price-symbol">¥</text>
                <text class="price-num">232.00</text>
              </view>
              <view class="case-btn">
                <image src="../../images/goods-pack.png"></image>
                <text>查看套餐所含全部商品</text>
              </view>
            </view>
          </view>
        </view>
        <load-more :loadType="loadType" />
      </view>
    </view>
  </view>
  <code-dialog
    style="width: 100%; height: 100%"
    codeUrl=""
    v-model:show="codeDialogShow"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  onLoad,
  onPullDownRefresh,
  onReachBottom,
  onPageScroll,
} from "@dcloudio/uni-app";
import navigationCustom from "@/components/navigation-custom/index.vue";
import { useUserInfoHooks } from "../../hoosk/index";
import loadMore from "@/components/load-more/index.vue";
import codeDialog from "@/components/code-dialog/index.vue";
export default defineComponent({
  name: "",
  components: {
    navigationCustom,
    loadMore,
    codeDialog,
  },
  setup() {
    const { storeData } = useUserInfoHooks();
    const imageUrl: string =
    "https://ali-res-test.dabanjia.com/res/20220211/14/1644561850441_1874%240be4eaff-1611-4087-9d91-57dbfe053ac0.jpg";
    const codeDialogShow = ref<boolean>(false);
    const loadType = ref<"succeed" | "error" | "load" | "complete">("succeed");
    const theme = ref<"white" | "black" | "transparent">("transparent");
    const currentIndex = ref<number>(0)
    onLoad((e) => {
      console.log("---onLoad---", e);
    });
    onPullDownRefresh(() => {
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 500);
    });
    onReachBottom(() => {
      if (loadType.value === "complete" || loadType.value === "load") {
        return;
      }
      loadType.value = "load";
      setTimeout(() => {
        loadType.value = "error";
      }, 1000);
    });
    onPageScroll((e) => {
      if (e.scrollTop > 64) {
        theme.value = "white";
      } else {
        theme.value = "transparent";
      }
    });
    type swiper = {
      detail:{
        current:number
      }
    }

    const swiperChange = (e:swiper)=>{
      console.log(e.detail.current)
      currentIndex.value = e.detail.current
    }
    const changeCurrent = (num:number) =>{
      currentIndex.value = num
    }
    return {
      imageUrl,
      loadType,
      theme,
      codeDialogShow,
      currentIndex,
      swiperChange,
      changeCurrent
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

.house-type_image--swiper{
  height: 562rpx;
}
.swiper-control{
  position: absolute;
  top: 362rpx;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  .control-btn{
    width: 204rpx;
    height: 44rpx;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(5px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 60px;
      line-height: 44rpx;

    view{
      display: inline-block;
      width: 50%;
      text-align: center;
      color: #fff;
      font-size: 20rpx;
      font-weight: 500;
      letter-spacing: 0.1px;
      vertical-align: top;
    }
    .active{
      background-color: #fff;
      border-radius: 120rpx;
      color: #333;
    }
  }
  .swiper-num{
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
.swiper-item{
  height: 562rpx;

}
  .bac-image {
    width: 100%;
    // height: 462rpx;
  }

  .case-content-warp {
    position: absolute;
    margin-top: -128rpx;
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
    .case-detail-title{
      padding-bottom: 40rpx;
      border-bottom: 0.5px solid #F1F1F1;
      // border-image:linear-gradient(270deg, rgba(223, 223, 223, 0) 0%, #000 100%);
      .title{
        margin-bottom: 16rpx;
        color: #222;
        font-size: 40rpx;
        font-weight: 500;
        line-height: 56rpx;
      }
      .case-type_describe--info{
        display: inline-block;
        height: 40rpx;
        padding: 0 12rpx;
        line-height: 40rpx;
        background: #F7F3F0;
        border-radius: 3px;
        margin-right: 16rpx;
        color: #B27436;
        font-size: 22rpx;
      }
    }
    .case-detail_head-content{
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
          width: 24rpx;
          height: 24rpx;
          margin-right: 11rpx;
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
    }
    :nth-child(2) {
      margin-left: 24rpx;
      font-weight: 500;
      font-size: 32rpx;
      line-height: 44rpx;
      color: #333333;
    }
  }
  .case-type-conetnt{
    padding: 8rpx 32rpx;
    .case-type-warp{
      position: relative;
      padding: 32rpx 40rpx;
      background: #FAFAFA;
      border-radius: 12px;
      box-sizing: border-box;
    margin: 24rpx 0;

      .case-name{
        margin-bottom: 1px;
        color: #333;
        font-weight: 500;
        font-size: 30rpx;
        letter-spacing: 0.1px;
      }
      .case-desc{
        width: 100%;
        color: #999;
        letter-spacing: 0.2px;
        font-size: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
      .case-price{
        margin-top: 32rpx;
        margin-bottom: 24rpx;
        .price-symbol{
          color: #333;
          font-size: 26rpx;
          margin-right: 8rpx;
        }
        .price-num{
          font-size: 40rpx;
          color: #333;
        }
      }
      .case-btn{
        width: 100%;
        height: 68rpx;
        text-align: center;
        background-color: #fff;
        border: 0.5px solid #EDEDED;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        image{
          width: 20rpx;
          height: 20rpx;
          margin-right: 12rpx;
          vertical-align: middle;
        }
        text{
          font-size: 24rpx;
          letter-spacing: 0.1px;
          color: #666;
        }
      }
      .case-bg{
        position: absolute;
        right: 0;
        top: 0;
        width: 188rpx;
        height: 174rpx;
      }
    }
  }





}
</style>