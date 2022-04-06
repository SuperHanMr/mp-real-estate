<template>
  <view class="picture-preview">
    <view class="content">
      <swiper class="swiper" :current="0" @change="swiperChange">
        <swiper-item>
          <view class="swiper-item uni-bg-red">
          <image src="https://ali-res-test.dabanjia.com/res/20220322/15/1647934285886_9412%2403.jpg" mode="widthFix" />
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-red">
          <image src="https://ali-res-test.dabanjia.com/res/20220322/15/1647934285886_9412%2403.jpg" mode="widthFix" />
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-red">
          <image src="https://ali-res-test.dabanjia.com/res/20220322/15/1647934285886_9412%2403.jpg" mode="widthFix" />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="img-introduce">
      <view class="introduce-list">
        <scroll-view :scroll-x="true" class="scroll-list">
          <view>封面2</view>
          <view>客厅1</view>
          <view>卧室4</view>
          <view>卫生间1</view>
          <view>户型图3</view>
        </scroll-view>
      </view>
      <view class="introduce-content">
        <view class="content-text" :class="{'is-hidden':isHidden}">
          说明字段示例说明字段示例说明字段示例说明字说字说明字段示例明字段示例说明字段示例说明字说字明说明字段示例明字段示例说明字段示例说明字说字明说明字段示例说明字段示例说明字段示例说明字说字说明字段示例明字段示例说明字段示例说明字说字明说明字段示例明字段示例说明字段示例说明字说字明说明字段示例说明字段示例说明字段示例说明字说字
说明字段示例说明字段示例说明字段示例说明字说字
        </view>
        <view class="control-text">
        <view class="text-btn" @click="openIntorduce">{{isHidden?'展开':'收起'}}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, resolveDirective } from "vue";
export default defineComponent({

  setup(props){
    const controlText = ref<String>('展开')
    const isHidden = ref<Boolean>(true)
    const openIntorduce = () => {
      isHidden.value = !isHidden.value
    }
    const swiperChange = <T>(e:T) => {
      console.log(e)
    }
    return{
      controlText,
      isHidden,
      swiperChange,
      openIntorduce
    }
  }
})
</script>
<style lang="scss" scoped>
page{
  height: 100%;
}
.picture-preview{
  background-color: #000;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  .content{
    width: 100%;
    .swiper-item{
      image{
        width: 100%;
        max-height: 100%;
      }
    }
  }
  .img-introduce{
    position: absolute;
    bottom: 0;
    color: #fff;
    background: #1D1D1D;
    opacity: 0.9;
    backdrop-filter: blur(6px);
    border-radius: 32rpx;
    padding-top: 40rpx;
    width: 100%;
    .introduce-list{
      padding-left: 40rpx;
      margin-bottom: 48rpx;
    }
      .scroll-list{
        white-space: nowrap;
        view{
          display: inline-block;
          height: 56rpx;
          line-height: 56rpx;
          text-align: center;
          padding: 0 20rpx;
          border: 0.5px solid rgba(255, 255, 255, 0.15);
          box-sizing: border-box;
          border-radius: 6px;
          margin-right: 24rpx;
        }
    }
    .introduce-content{
      padding: 0 40rpx 152rpx;
      .content-text{
        font-size: 0.14rem;
        // line-height: 0.22rem;
        letter-spacing: 0.3px;
      }
      .is-hidden{
        overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      }
      .control-text{
        width: 100%;
        text-align: right;
        margin-top: 32rpx;
      }
      .text-btn{
        position: relative;
        width: 100rpx;
        height: 42rpx;
        text-align: center;
        line-height: 42rpx;
        margin-left: auto;
        padding: 0 24rpx;
        font-size: 24rpx;
        font-weight: 500;
        border: 0.5px solid rgba(255, 255, 255, 0.44);
box-sizing: border-box;
border-radius: 152rpx;
      }
    }

  }
}
</style>