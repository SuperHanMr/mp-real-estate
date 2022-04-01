<!--
 * @Description: 楼盘详情
 * @Author: HanYongHui
 * @Date: 2022-03-31 21:00:01
 * @LastEditTime: 2022-04-01 19:13:26
 * @LastEditors: HanYongHui
-->
<template>
  <!-- <navigation-custom>
    <template #content>
      <view class="navigation-content">
        <image @click="backPage" src="" />
        <text>楼盘详情</text>
      </view>
    </template>
  </navigation-custom> -->

  <img class="bac-image" :src="imageUrl" />

  <view class="estate-detail-warp">
    <view class="estate-detail_head">
      <view class="estate-detail_head--left">
        <text class="name">北京新天地五期</text>
        <view class="describe">
          <image src="../../images/estate-icon.png" />
          <text>华润置地华润集团</text>
        </view>
        <view class="describe">
          <image src="../../images/estate-icon.png" />
          <text>北京朝阳区管庄朝阳路5号院</text>
        </view>
      </view>
      <view class="estate-detail_head--right" @click="backPage">
        <image src="../../images/code-icon.png" />
        <text>楼盘二维码</text>
      </view>
    </view>

    <view class="house-type-list">
      <view class="list-title">
        <view></view>
        <text>全部户型（10）</text>
      </view>
      <view class="house-type-warp">
        <view class="house-type_image">
          <image
            class="house-type_image--cover"
            :src="imageUrl"
            mode="scaleToFill"
          />
          <swiper class="house-type_image--swiper">
            <swiper-item>
              <image :src="imageUrl" mode="scaleToFill" />
            </swiper-item>
          </swiper>
        </view>
        <view class="house-type_describe">
          <view class="house-type_describe--info">
            <text>北区1-3栋 1室户型</text>
            <text>1室1厅1卫｜面积：69.5㎡ ｜东北 </text>
          </view>
          <view class="house-type_describe--number">
            <text>5</text>
            <text>方案</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import navigationCustom from "../../components/navigation-custom/index.vue";
import { useUserInfoHooks } from "../../hoosk/index";
export default defineComponent({
  name: "",
  components: {
    // navigationCustom,
  },
  setup() {
    const { storeData } = useUserInfoHooks();

    const backPage = () => {
      uni.navigateBack({ delta: 1 });
    };
    const imageUrl: string =
      "https://ali-res-test.dabanjia.com/res/20220211/14/1644561850441_1874%240be4eaff-1611-4087-9d91-57dbfe053ac0.jpg";
    return { backPage, imageUrl };
  },
});
</script>
<style lang="scss" scoped>
.navigation-content {
  position: relative;
  text-align: center;
  width: 100%;

  image {
    position: absolute;
    width: 44px;
    height: 44px;
    background: #000;
    left: 0;
    top: 0;
  }

  text {
    line-height: 44px;
    font-size: 34rpx;
    font-weight: bold;
    color: #fff;
  }
}
.bac-image {
  position: absolute;
  top: 0;
  width: 100%;
  height: 462rpx;
}

.estate-detail-warp {
  // position: absolute;
  width: 100%;
  padding-top: calc(177rpx * 2);
  background: #fff;

  .estate-detail_head {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.81) 0%,
      rgba(242, 242, 242, 0.9) 100%
    );
    padding: 40rpx 40rpx 0 40rpx;
    border-top-right-radius: 40rpx;
    border-top-left-radius: 40rpx;
    height: 250rpx;
    display: flex;
    align-items: center;

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
      image {
        height: 48rpx;
        width: 48rpx;
      }
      text {
        font-weight: 400;
        font-size: 20rpx;
        line-height: 28rpx;
        color: #333333;
      }
    }
  }
}

.house-type-list {
  background: #ffffff;
  padding-top: 48rpx;
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
        :nth-child(1) {
          width: 100%;
          font-weight: bold;
          font-size: 30rpx;
          line-height: 42rpx;
          color: #333333;
        }
        :nth-child(2) {
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