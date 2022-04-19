<template>
  <navigation-custom title="报名详情" :theme="theme"></navigation-custom>

  <view class="container">
    <view
      class="bgImg"
      :style="{
        backgroundImage: `url(${detailInfo.coverPictureInfoVO.coverImageUrl})`,
      }"
    ></view>
    <!-- <img class="bgImg" @click="toBack" :src="detailInfo.coverPictureInfoVO.coverImageUrl" alt=""> -->
    <view class="header-container">
      <view class="header-bg"></view>
      <view class="projectName">{{ detailInfo.schemeName }}</view>
      <view class="project-item">
        <image src="../../../images/developes_ic.png" mode=""></image>
        <text>{{ detailInfo.houseWithSchemeInfo.houseTypeName }}</text>
      </view>
      <view class="project-item">
        <image src="../../../images/house_type_ic.png" mode=""></image>
        <text>
          <text>
            <text>{{ detailInfo.houseWithSchemeInfo.specification }}</text>
            <text
              >&nbsp;| &nbsp;{{
                detailInfo.houseWithSchemeInfo.floorArea
              }}m²</text
            >
            <text
              >&nbsp;| &nbsp;{{
                detailInfo.houseWithSchemeInfo.direction
              }}</text
            >
          </text>
        </text>
      </view>
    </view>
    <view class="signup-detial-container">
      <view class="signupInfo-header">
        <view class="icon"></view>
        <text>报名信息</text>
      </view>
      <view class="signupInfo-content">
        <view class="content-item">
          <text class="left">报名用户</text>
          <view class="right">
            <text
              >{{ detailInfo.userNickName }}/{{ detailInfo.userPhone }}</text
            >
          </view>
        </view>

        <view class="content-item">
          <text class="left">报名编号</text>
          <view class="right">
            <text>{{ detailInfo.signNo }}</text>
            <view class="button" @click="duplicate(+detailInfo.signNo)"
              >复制</view
            >
          </view>
        </view>

        <view class="content-item">
          <text class="left">报名时间</text>
          <view class="right">
            <text>{{ formatDate(detailInfo.signUpTime) }}</text>
          </view>
        </view>
      </view>

      <view class="renovation-header">
        <view class="icon"></view>
        <text>装修报价</text>
      </view>
      <view class="renovation-content">
        <view
          v-for="(materialItem, index) in detailInfo.productBagVOS"
          :key="index"
          @click="gotoNextPage(index)"
        >
          <view class="updateMaterial-text">{{
            materialItem.productBagName.productBagName
          }}</view>
          <view class="content">{{ materialItem.bagDesc.bagPackageDesc }}</view>
          <view class="price">
            <text style="font-size: 26rpx">￥</text>
            <text>{{ handlePrice(materialItem.buyItNow.buyItNow) }}</text>
          </view>
          <view class="showMoreMaterial">
            <image class="iconImg" src="../../../images/code-icon.png" />
            <text>查看套餐所含全部商品</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import { onPageScroll, onLoad, onShow } from "@dcloudio/uni-app";
import { getRecordDetail } from "../hooks/index";
import moment from "moment";
import navigationCustom from "@/components/navigation-custom/index.vue";
import loadMore from "@/components/load-more/index.vue";
export default defineComponent({
  name: "",
  components: {
    navigationCustom,
    loadMore,
  },
  setup() {
    const { requestSignupDetail, signupDetailInfo } = getRecordDetail();
    const theme = ref<"white" | "black" | "transparent">("transparent");
    const id = ref<number>(0);
    const type = ref<string>("");
    onLoad((e: any) => {
      console.log("---onLoad---", e);
      id.value = +e.id;
      type.value = e.type;
      console.log(id.value);
      requestSignupDetail(e.id);
    });
    onPageScroll((e) => {
      if (e.scrollTop > 64) {
        theme.value = "white";
      } else {
        theme.value = "transparent";
      }
    });
    const duplicate = (num: number) => {
      uni.setClipboardData({
        data: `${num}`,
        success(res) {
          uni.showToast({
            title: "复制成功",
            icon: "none",
            duration: 1000,
          });
        },
      });
    };
    const gotoNextPage = (index: number) => {
      uni.navigateTo({
        url: `../material-upgrade/material-upgrade?index=${index}`,
      });
    };

    const toBack = () => {
      uni.navigateBack({});
    };

    const formatDate = (time: number) =>
      moment(time).format("YYYY-MM-DD  HH:mm:ss");
    const handlePrice = (price: number) => {
      if (!price) return "0.00";
      let list = String(price).split(".");
      if (list.length == 1) {
        return list[0] + "." + "00";
      } else {
        return list[0] + "." + list[1];
      }
    };
    // const sliceArray = (array: number[], size: number) => {
    // 	var result = [];
    // 	for (var i = 0; i < Math.ceil(array.length / size); i++) {
    // 		var start = i * size;
    // 		var end = start + size;
    // 		result.push(array.slice(start, end));
    // 	}
    // 	return result;
    // }
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2, 13, 14, 15, 16, 17, 18, 19, 20]
    // const array = sliceArray(arr, 4)
    // console.log("array====", array)

    return {
      theme,
      toBack,
      duplicate,
      gotoNextPage,
      ...toRefs(signupDetailInfo),
      formatDate,
      handlePrice,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;

  .bgImg {
    width: 100%;
    height: 462rpx;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .img {
      width: 100%;
      height: 100%;
    }
  }

  .header-container {
    width: 100%;
    margin-top: -32rpx;
    // height: 300rpx;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.81) 0%,
      rgba(242, 242, 242, 0.9) 100%
    );
    border: 2rpx solid #ffffff;
    box-sizing: border-box;
    border-radius: 32rpx 32rpx 0 0;
    padding: 48rpx 40rpx;
    position: relative;

    .header-bg {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 32rpx;
      border-radius: 32rpx 32rpx 0 0;
      filter: blur(12rpx);
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.81) 0%,
        rgba(242, 242, 242, 0.9) 100%
      );
    }

    .projectName {
      line-height: 56rpx;
      font-size: 40rpx;
      font-weight: 500;
      color: #222222;
      margin-bottom: 24rpx;
    }

    .project-item {
      display: flex;
      align-items: center;
      flex-flow: row nowrap;
      margin-bottom: 14rpx;

      image {
        width: 28rpx;
        height: 28rpx;
        margin-right: 8rpx;
      }

      text {
        display: inline-block;
        height: 34rpx;
        line-height: 34rpx;
        font-size: 24rpx;
        color: #333333;
      }
    }
  }

  .signup-detial-container {
    width: 100%;
    margin-top: -32rpx;
    height: 300rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 32rpx 32rpx 0 0;
    padding-top: 56rpx;

    .signupInfo-header,
    .renovation-header {
      display: flex;
      align-items: center;
      flex-flow: row nowrap;
      margin-bottom: 32rpx;

      .icon {
        width: 6rpx;
        height: 28rpx;
        background: #333333;
        border-radius: 0 8rpx 8rpx 0;
        margin-right: 34rpx;
      }

      text {
        display: inline-block;
        height: 44rpx;
        line-height: 44rpx;
        font-size: 32rpx;
        color: #333333;
        font-weight: 500;
      }
    }

    .signupInfo-content {
      margin: 0 32rpx 48rpx;
      box-sizing: border-box;
      border: 1rpx solid #e8e8e8;
      padding: 32rpx 24rpx;
      border-radius: 16rpx;

      .content-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20rpx;

        .left {
          font-size: 26rpx;
          height: 28rpx;
          line-height: 28rpx;
          color: #999999;
        }

        .right {
          display: flex;
          align-items: center;

          text {
            color: #333333;
            font-size: 26rpx;
            height: 28rpx;
            line-height: 28rpx;
            margin-right: 8rpx;
          }

          .button {
            width: 64rpx;
            height: 36rpx;
            line-height: 34rpx;
            border: 1rpx solid #eaeaea;
            box-sizing: border-box;
            border-radius: 8rpx;
            color: #111111;
            text-align: center;
            font-size: 20rpx;
          }
        }
      }

      .content-item:nth-last-child(1) {
        margin-bottom: 0;
      }
    }

    .renovation-content {
      margin: 0 32rpx 48rpx;
      background: #fafafa;
      border-radius: 16rpx;
      padding: 32rpx 40rpx;

      .updateMaterial-text {
        height: 42rpx;
        line-height: 42rpx;
        font-size: 30rpx;
        color: #333333;
        margin-bottom: 2rpx;
      }

      .content {
        max-width: 606rpx;
        height: 34rpx;
        line-height: 34rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 32rpx;
        font-size: 24rpx;
        color: #999999;
      }

      .price {
        height: 38rpx;
        line-height: 38rpx;
        font-size: 40rpx;
        margin-bottom: 24rpx;
        color: #333333;
      }

      .showMoreMaterial {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        border: 1rpx solid #ededed;
        border-radius: 8rpx;
        box-sizing: border-box;
        width: 606rpx;
        height: 68rpx;

        .iconImg {
          width: 20rpx;
          height: 20rpx;
          margin-right: 12rpx;
        }

        text {
          display: block;
          height: 34rpx;
          line-height: 34rpx;
          font-size: 24rpx;
          color: #666666;
        }
      }
    }
  }
}
</style>
