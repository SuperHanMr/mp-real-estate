<template>
  <view class="container">
    <scroll-view scroll-y="true">
      <view class="complain">
        方案说明这个增项是做什么用的，方案说明这个增项是做什么的！！！！
      </view>

      <view class="list-container">
        <view class="item-container">
          <view class="itemHeader"> 施工项 </view>
          <view class="table">
            <view class="table-header">
              <view class="left">工艺名称</view>
              <view class="right">工艺说明</view>
            </view>
            <view class="table-body">
              <view class="item">
                <view class="item-left">贴门槛石（大理石或瓷砖)</view>
                <view class="item-right">水泥砂浆铺贴，不含大理石或瓷砖</view>
              </view>
              <view class="item">
                <view class="item-left">窗台石铺贴辅材</view>
                <view class="item-right">石材铺贴使用现场水泥沙子等辅材 ，不含铺设人工及大理石费用，安装由厂商负责。</view>
              </view>
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
import {getCaseDetailHooks} from "../../case-detail/hooks"
export default defineComponent({
  name: "",
  components: {},
  setup() {
    const index = ref<number>(0);
    const source = ref<boolean>(false); //玉帛的页面跳转到此页面
    const bagPackageDesc = ref<string>("");
    const buyItNow = ref<number>(0);
    const productBagName = ref<string>("");
    const spuHelperList =ref<Array<number>>([])
    onLoad((e: any) => {
      source.value = e.source;
      index.value = +e.index;
      if(!source){

      }else{
        const { caseDetail } = getCaseDetailHooks();
        buyItNow.value =
          caseDetail.value.productBagVOS[index.value].buyItNow.buyItNow;
        bagPackageDesc.value =
          caseDetail.value.productBagVOS[index.value].bagDesc.bagPackageDesc;
        productBagName.value =
          caseDetail.value.productBagVOS[
            index.value
          ].productBagName.productBagName;
      }
    });
    onShow(() => {
      console.log("ddd");
    });
    return {

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

  .complain {
    margin-top: 12rpx;
    padding:0 40rpx;
    font-size: 28rpx;
    line-height: 40rpx;
    color: #333333;
    letter-spacing: 1rpx;
    background-color: #ffffff;
  }



  .list-container {
    display: flex;
    flex-flow: column nowrap;
    padding: 48rpx 32rpx;

    .item-container {
      // display: flex;
      // flex-flow: row nowrap;
      // align-items: center;
      margin-bottom: 32rpx;
      .itemHeader{
        font-size: 32rpx;
        font-weight: 500;
        margin-bottom: 32rpx;
      }
      .table{
        // width: 200px;
        // height: 150px;
        border: 2rpx solid #e4e2e2;
        .table-header{
          display: flex;
          align-self: center;
          flex-flow: row nowrap;
          height: 60rpx;
          .left{
            width: 291rpx;
            height: 70rpx;
            line-height: 56rpx;
            padding: 8rpx;
            font-size: 24rpx;
            font-weight: bold;
            color: #333333;
            box-sizing: border-box;
            border-right: 2rpx solid #e4e2e2;
            border-bottom: 2rpx solid #e4e2e2;
          }
          .right{
            width: 400rpx;
            height: 70rpx;
            line-height: 56rpx;
            padding: 8rpx;
            font-size: 24rpx;
            font-weight: bold;
            color: #333;
            box-sizing: border-box;
            border-bottom: 2rpx solid #e4e2e2;
          }
        }
        .table-body .item{
          display: flex;
          align-self: center;
          flex-flow: row nowrap;
          .item-left{
            width: 300rpx;
            line-height: 38rpx;
            padding: 8rpx;
            font-size: 24rpx;
            color: #999;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border-right: 2rpx solid #e4e2e2;
            border-bottom: 2rpx solid #e4e2e2;
          }

          .item-right{
            width: 400rpx;
            line-height: 38rpx;
            font-size: 24rpx;
            color: #999;
            display: flex;
            align-items: center;
            padding: 8rpx;
            border-bottom: 2rpx solid #e4e2e2;
          }

        }
        .table-body .item:nth-last-child(1){
           .item-left{
            border-bottom: none;
          }
          .item-right{
            border: none;
          }
        }
      }

    }
  }
}
</style>
