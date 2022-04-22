<template>
  <view class="container">
    <scroll-view scroll-y="true">
      <view class="header">
        {{ data.productBagName.productBagName }}
      </view>
      <view class="complain">
        {{ data.bagDesc.bagPackageDesc }}
      </view>
      <view class="list-container">
        <view
          class="item-container"
          v-for="(procuctItem, index) in data.spuInfoVOS"
          :key="index"
        >
          <image :src="procuctItem.spuImageUrl" />
          <view class="info">
            <view class="title">
              {{ procuctItem.spuName }}
            </view>
            <view
              v-if="
                procuctItem.firstTwoFrontCategories4String ||
                procuctItem.brandName !== '--'
              "
              class="icon"
            >
              <text
                class="text"
                v-if="procuctItem.firstTwoFrontCategories4String"
                >{{ procuctItem.firstTwoFrontCategories4String }}</text
              >
              <text
                class="text"
                v-if="
                  procuctItem.firstTwoFrontCategories4String &&
                  procuctItem.brandName !== '--'
                "
                >&nbsp;|&nbsp;</text
              >
              <text v-if="procuctItem.brandName !== '--'" class="text">{{
                procuctItem.brandName
              }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { MaterialItem } from "../../../api/clue";
import { getRecordDetail } from "../../clue/hooks/index";
import { getCaseDetailHooks } from "../../case-detail/hooks";
import { getBagInfo, BagParams } from "../../../api/clue";
export default defineComponent({
  name: "",
  components: {},
  setup() {
    const materialInfo = reactive<{ data: MaterialItem }>({
      data: {
        productBagName: {},
        bagDesc: {},
      } as MaterialItem,
    });
    const index = ref<number>(0);
    const source = ref<boolean>(false); //玉帛的页面跳转到此页面
    const spuHelperList = ref<Array<number>>([]);
    const bagPackageDesc = ref<string>("");
    const buyItNow = ref<number>(0);
    const productBagName = ref<string>("");
    const reqBagInfo = async () => {
      try {
        let params: BagParams = {
          spuHelperList: spuHelperList.value, //辅助list
          bagDesc: {
            bagPackageDesc: bagPackageDesc.value,
          },
          buyItNow: {
            buyItNow: buyItNow.value,
          },
          productBagName: {
            productBagName: productBagName.value,
          },
        };
        const data = await getBagInfo(params);
        console.log("data", data);
        if (!data.data) return;
        materialInfo.data = data.data;
      } catch (error) {
        console.log("error!", error);
      }
    };
    onLoad((e: any) => {
      source.value = e.source;
      index.value = +e.index;

      // })
      if (!source.value) {
        const { signupDetailInfo } = getRecordDetail();
        materialInfo.data =
          signupDetailInfo.detailInfo.productBagVOS[index.value];
      } else {
        const { caseDetail } = getCaseDetailHooks();
        // materialInfo.data = caseDetail.value.productBagVOS[index.value]
        buyItNow.value =
          caseDetail.value.productBagVOS[index.value].buyItNow.buyItNow;
        bagPackageDesc.value =
          caseDetail.value.productBagVOS[index.value].bagDesc.bagPackageDesc;
        productBagName.value =
          caseDetail.value.productBagVOS[
            index.value
          ].productBagName.productBagName;
        spuHelperList.value =
          caseDetail.value.productBagVOS[index.value].spuHelperList;
        reqBagInfo();
      }
    });
    onShow(() => {
      console.log("ddd");
    });
    return {
      ...toRefs(materialInfo),
    };
  },
});
</script>

<style>
page {
  background-color: #fff;
}
</style>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: #ffffff;

  .header {
    margin-top: 12rpx;
    padding-left: 40rpx;
    font-weight: bold;
    font-size: 40rpx;
    height: 40rpx;
    line-height: 40rpx;
    color: #333333;
    letter-spacing: 1rpx;
    padding-bottom: 8rpx;
    background-color: #ffffff;
  }

  .complain {
    padding: 0 20rpx 40rpx 40rpx;
    font-size: 26rpx;
    line-height: 44rpx;
    color: #999999;
    background-color: #ffffff;
    word-wrap: break-word;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.03);
  }

  .list-container {
    display: flex;
    flex-flow: column nowrap;
    padding: 48rpx 32rpx;

    .item-container {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: 32rpx;

      image {
        width: 176rpx;
        height: 176rpx;
        border-radius: 8rpx;
        margin-right: 24rpx;
      }

      .info {
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: space-between;
        height: 176rpx;

        .title {
          max-width: 486rpx;
          max-height: 84rpx;
          line-height: 42rpx;
          font-size: 28rpx;
          color: #333333;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .icon {
          .text {
            max-width: 238rpx;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 24rpx;
            line-height: 24rpx;
            color: #586e85;
            font-size: 22rpx;
          }

          display: flex;
          align-items: center;
          flex-flow: row nowrap;
          max-width: 486rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 24rpx;
          line-height: 24rpx;
          padding: 6rpx 8rpx;
          background: #f2f4f7;
          border-radius: 6rpx;
        }
      }
    }
  }
}
</style>
