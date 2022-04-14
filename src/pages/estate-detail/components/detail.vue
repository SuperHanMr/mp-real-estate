
<template>
  <view class="estate-detail-warp">
    <img class="bac-image" :src="estateDetail.url" mode="aspectFill" />
    <view class="estate-content-warp">
      <view class="estate-detail_head">
        <view class="estate-detail_head--left">
          <text class="name">{{ estateDetail.name }}</text>
          <view class="describe">
            <image src="../../../images/estate-icon.png" />
            <text>{{ estateDetail.developerName }}</text>
          </view>
          <view class="describe">
            <image src="../../../images/estate-icon.png" />
            <text
              >{{ estateDetail.provinceName }}{{ estateDetail.cityName
              }}{{ estateDetail.districtName }}{{ estateDetail.address }}</text
            >
          </view>
        </view>
        <view class="estate-detail_head--right" @click="onClickCodeImage">
          <image src="../../../images/code-icon.png" />
          <text>楼盘二维码</text>
        </view>
      </view>

      <view class="house-type-list">
        <view class="list-title">
          <view></view>
          <text>全部户型（{{ houseTypeList.length }}）</text>
        </view>
        <view
          class="house-type-warp"
          v-for="item in houseTypeList"
          :key="item.id"
          @click="onClickHouseType(item.id)"
        >
          <view class="house-type_image">
            <image
              class="house-type_image--cover"
              :src="item.floorPlanFirst"
              mode="aspectFill"
            />
            <swiper class="house-type_image--swiper">
              <swiper-item v-for="urlItem in item.schemeURLList" :key="urlItem">
                <image :src="urlItem" mode="aspectFill" />
              </swiper-item>
            </swiper>
          </view>
          <view class="house-type_describe">
            <view class="house-type_describe--info">
              <text>{{ item.name }}</text>
              <text
                >{{ item.specification }}｜面积：{{ item.floorAreaInside }}㎡
                ｜朝向：{{ item.direction }}
              </text>
            </view>
            <view class="house-type_describe--number">
              <text>{{ item.schemeNum }}</text>
              <text>方案</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <code-dialog
    :codeUrl="codeImageUrl"
    from="楼盘"
    v-model:show="codeDialogShow"
  />
</template>
<script lang="ts" setup>
import { defineComponent, defineProps, ref, watch, defineExpose } from "vue";
import { useEstateDetailHook } from "../hooks/index";
import { useUserInfoHooks } from "../../../hoosk/index";
import codeDialog from "../../../components/code-dialog/index.vue";
const {
  reuqestEstateDetail,
  reuqestHouseTypeList,
  requestCodeImage,
  estateDetail,
  houseTypeList,
  codeImageUrl,
  codeDialogShow,
} = useEstateDetailHook();
const props = defineProps({
  estateId: {
    type: Number,
    required: true,
  },
});
if (props.estateId) {
  reuqestEstateDetail(props.estateId);
  reuqestHouseTypeList(props.estateId);
}
watch(
  () => props.estateId,
  () => {
    reuqestEstateDetail(props.estateId);
    reuqestHouseTypeList(props.estateId);
  }
);

const refreshPage = () => {
  reuqestEstateDetail(props.estateId);
  reuqestHouseTypeList(props.estateId);
};
defineExpose({
  refreshPage,
});

const onClickHouseType = (id: number) => {
  uni.navigateTo({
    url: "/pages/house-detail/index?houseId=" + id,
  });
};

const { storeData } = useUserInfoHooks();
// 分享二维码
const onClickCodeImage = () => {
  let shareId: number;
  if (storeData.role === 2) {
    shareId = uni.getStorageSync("shareId") || 0;
  } else {
    shareId = +storeData.userId;
  }
  requestCodeImage(
    "pages/estate-detail/index",
    `estateId=${props.estateId}&shareId=${shareId}`
  );
};
</script>
<style lang="scss" scoped>
.estate-detail-warp {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;

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
      width: calc(100% - 184rpx - 24rpx);
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
        // display: flex;
        // align-items: center;
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
    margin-top: 32rpx;
    padding: 0 32rpx;
    .house-type_image {
      display: flex;
      .house-type_image--cover {
        width: 216rpx;
        height: 216rpx;
        border-radius: 16rpx;
        border: 1rpx solid #e8e8e8;
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
      margin-top: 24rpx;
      display: flex;

      .house-type_describe--info {
        width: 570rpx;
        display: flex;
        flex-direction: column;

        text:nth-child(1) {
          width: 100%;
          font-weight: bold;
          font-size: 30rpx;
          line-height: 42rpx;
          color: #333333;
        }
        text:nth-child(2) {
          width: 100%;
          margin-top: 8rpx;
          font-weight: 400;
          font-size: 24rpx;
          line-height: 34rpx;
          color: #666666;
        }
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