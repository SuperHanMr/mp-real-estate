<!--
 * @Description: 楼盘详情
 * @Author: HanYongHui
 * @Date: 2022-03-31 21:00:01
 * @LastEditTime: 2022-04-02 18:34:44
 * @LastEditors: HanYongHui
-->
<template>
  <navigation-custom title="户型详情" :theme="theme" :share='fromShare'/>
  <view class="estate-detail-warp">
    <!-- <img class="bac-image" :src="imageUrl" mode="aspectFill" /> -->
    <swiper class="house-type_image--swipe" :current="0">
      <swiper-item v-for="(item,index) of houseDetail.floorPlans" :key="index">
        <image class="bac-image" :src="item" mode="widthFix" />
      </swiper-item>
      <!-- <swiper-item>
        <image class="bac-image" src="https://ali-res-test.dabanjia.com/res/20220322/15/1647934285886_9412%2403.jpg" mode="widthFix" />
      </swiper-item>
      <swiper-item>
        <image class="bac-image" src="https://ali-res-test.dabanjia.com/res/20220322/15/1647934285886_9412%2403.jpg" mode="widthFix" />
      </swiper-item> -->
    </swiper>
    <view class="estate-content-warp">
      <view class="estate-detail_head">
        <view class="estate-detail_head--left">
          <text class="name">{{houseDetail.name}}</text>
          <view class="describe">
            <text>{{houseDetail.specification}}｜面积：{{houseDetail.floorAreaInside}}㎡ ｜{{houseDetail.direction}} </text>
          </view>
        </view>
        <view class="estate-detail_head--right" @click="codeDialogShow = true">
          <image src="../../images/code-icon.png" />
          <text>户型二维码</text>
        </view>
      </view>

      <view class="house-type-list">
        <view class="list-title">
          <view></view>
          <text>全部方案（{{houseDetail.schemeSimpleItemVOS.length}}）</text>
        </view>
        <view class="house-type-warp" v-for="(item,index) in houseDetail.schemeSimpleItemVOS" @click="toCasedetail(item.schemeId,houseDetail.id)" :key="index">
          <image class="left-img" src="../../images/case-left.png" v-if="storeData.role===2" mode="" />
          <view class="house-type_image">
            <image
              class="house-type_image--cover"
              :src="item.coverPicture.coverPictureUrl"
              mode="aspectFill"
            />
            <!-- <swiper class="house-type_image--swiper">
              <swiper-item>
                <image :src="imageUrl" mode="aspectFill" />
              </swiper-item>
            </swiper> -->
          </view>
          <view class="house-type_describe">
            <view class="house-type_describe--title" >{{item.schemeName}}</view>
          </view>
          <view class="house-type_describe">
            <view class="house-type_describe--info" v-for="(el, index) in item.schemeStyles" :key="index">
              <text>{{el}}</text>
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
    v-model:show="codeDialogShow"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {
  onLoad,
  onPullDownRefresh,
  onReachBottom,
  onPageScroll,
} from "@dcloudio/uni-app";
import navigationCustom from "@/components/navigation-custom/index.vue";
import { useUserInfoHooks } from "../../hoosk/index";
import {getHouseDetailHooks} from "./hooks/index"
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
    const {requestHouseDetail,requestCode,houseCaseCheck,enterNum,houseDetail,codeUrl} = getHouseDetailHooks()
    const loadType = ref<"succeed" | "error" | "load" | "complete">("succeed");
    const houseId = ref<number>(0)
        const fromShare = ref<Boolean>(false)

    onLoad((e) => {
      console.log("---onLoad---", e);
      if(e.houseId){
        houseId.value = +e.houseId
        requestHouseDetail(+e.houseId)
        requestCode(e.houseId)
      }
      if(e.shardId&&storeData.role===2){
        // storeData.consultantId = +e.shardId
        fromShare.value =true
        uni.setStorageSync('shareId',e.shardId)
      }
    });
    onMounted(()=>{
      console.log(11111)
      enterNum.value = 0
    })
    onPullDownRefresh(() => {
      requestHouseDetail(houseId.value)
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

    const theme = ref<"white" | "black" | "transparent">("transparent");
    onPageScroll((e) => {
      if (e.scrollTop > 64) {
        theme.value = "white";
      } else {
        theme.value = "transparent";
      }
    });
    const codeDialogShow = ref<boolean>(false);
    const toCasedetail = (caseId:number,houseId:number)=>{
      houseCaseCheck(houseId,caseId)
    }
    return {
      toCasedetail,
      houseDetail,
      fromShare,
      storeData,
      loadType,
      theme,
      codeDialogShow,
      codeUrl,
      };
  },
});
</script>
<style lang="scss" scoped>
.estate-detail-warp {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  .house-type_image--swipe{
    height: 562rpx;
    background-color: #eee;
  }
  .bac-image {
    width: 100%;
    height: 462rpx;
  }

  .estate-content-warp {
    position: absolute;
    margin-top: -50rpx;
    width: 100%;
  }
  .estate-detail_head {
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
    display: flex;

    .estate-detail_head--left {
      display: flex;
      flex-direction: column;
      .name {
        font-weight: bold;
        font-size: 36rpx;
        line-height: 50rpx;
        color: #222222;
      }
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
          color: #666666;
        }
      }
    }

    .estate-detail_head--right {
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

    .estate-detail_head--right:active {
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
  padding-bottom: 88rpx;
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

  .house-type-warp {
    position: relative;
    margin-top: 100rpx;
    padding: 0 32rpx;
    .left-img{
      position: absolute;
      left: 32rpx;
      top: -62rpx;
      height: 90rpx;
      width: 310rpx;
    }
    .house-type_image {
      display: flex;
      position: relative;
      z-index: 1;
      .house-type_image--cover {
        width: 100%;
        height: 364rpx;
        border-radius: 24rpx;
        // border: 1rpx solid #e8e8e8;
      }

      .house-type_image--swiper {
        margin-left: 16rpx;
        width: 454rpx;
        height: 216rpx;
        border-radius: 16rpx;
        overflow: hidden;

        image {
          width: 100%;
          height: 100%;
          border-radius: 16rpx;
        }
      }
    }

    .house-type_describe {
      margin-top: 14rpx;
      display: flex;
      flex-wrap: wrap;
      .house-type_describe--info {
        // width: 570rpx;
        display: flex;
        flex-direction: column;
        background: #F7F3F0;
        border-radius: 3px;
        padding: 6rpx 8rpx;
        height: 36rpx;
        line-height: 36rpx;
        margin-right: 12rpx;
        text {
          font-size: 22rpx;
          color: #B27436;
        }
      }
      .house-type_describe--title{
        margin-top: 10rpx;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
        font-size: 32rpx;
        font-weight: 500;
      }
      .house-type_describe--number {
        margin-left: auto;
        width: 76rpx;
        height: 86rpx;
        background: #f7f7f7;
        border-radius: 8rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #333333;
        flex-direction: column;
        :nth-child(1) {
          font-size: 30rpx;
          line-height: 42rpx;
        }
        :nth-child(2) {
          font-size: 20rpx;
          line-height: 28rpx;
        }
      }
    }
  }
}
</style>