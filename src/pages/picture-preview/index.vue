<template>
<!-- <navigation-custom title="相册" theme="transparent" /> -->

  <view class="picture-preview">
    <view class="back">
      <image :src="whiteBack" alt="" @click="backPage"/>
    </view>
    <view class="content">
      <swiper class="swiper"
        :current="currentIndex"
        @change="swiperChange"
        :style="{ height: swiperHeight + 'px' }"
      >
        <swiper-item v-for="(item,index) of imgList.list" :key="index">
          <view class="swiper-item uni-bg-red">
          <image :id="'content-wrap' + index" :src="item" mode="widthFix" />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="img-introduce">
      <view class="introduce-list">
        <scroll-view :scroll-x="true" class="scroll-list">
          <view v-for="(item,index) of imgList.tagList" :class="{active:currentTagIndex===index}" :key="index" @click="toTagImage(index)">{{item.name}}</view>
        </scroll-view>
      </view>
      <view class="introduce-content">
        <view class="content-text" id="content-text" :class="{'is-hidden':isHidden}">
          {{imgList.tagList[currentTagIndex].desc}}
        </view>
        <view class="control-text">
        <view class="text-btn" v-if="hasControl" @click="openIntorduce">{{isHidden?'展开':'收起'}}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { defineComponent, ref, onMounted, nextTick, computed } from "vue";
import {getCaseDetailHooks} from "../case-detail/hooks/index"
import whiteBack from "../../images/back-icon.png"
export default defineComponent({

  setup(props,context){
    const hasControl = ref<Boolean>(false)
    const controlText = ref<String>('展开')
    const isHidden = ref<Boolean>(true)
    const currentIndex = ref<number>(0)
    const swiperHeight = ref<number>(0)
    const currentTagIndex = computed(()=>{
      return imgList.tagList.findIndex(item=>{
        return currentIndex.value>=item.index&&currentIndex.value<item.index+item.length
      })
    })

    const {imgList} = getCaseDetailHooks()

    onLoad((e)=>{
      e.index?currentIndex.value = +e.index:""
    })

    onMounted(()=>{
        nextTick(()=>{
        setSwiperHeight()
      })
    })

    const openIntorduce = () => {
      isHidden.value = !isHidden.value
    }
    const swiperChange = (e:any) => {
      isHidden.value = true
      currentIndex.value = e.detail.current
      // swiperHeight.value = currentIndex.value*200
      nextTick(()=>{
        setSwiperHeight()
      })
    }
    const setSwiperHeight =() => {
      let element = "#content-wrap" + currentIndex.value;
      let query = uni.createSelectorQuery();
      console.log(query)
      query.select(element).boundingClientRect(()=>{});
      query.select('#content-text').boundingClientRect(()=>{})
      query.exec((res) => {
          console.log(res)
        if (res && res[0]) {
          console.log(res[0].height)
          swiperHeight.value = res[0].height;
        }
        if(res&&res[1]){
          hasControl.value = res[1].height/18>4
          console.log(res[1].height,">>>>>>>>")
        }
      });
    }

    const toTagImage = (index:number) => {
      currentIndex.value = imgList.tagList[index].index
    }
    const backPage = () => {
      uni.navigateBack({ delta: 1 });
    };
    // nextTick(()=>{
    //     setSwiperHeight()
    //   })
    return{
      controlText,
      isHidden,
      currentIndex,
      imgList,
      currentTagIndex,
      swiperHeight,
      whiteBack,
      hasControl,
      swiperChange,
      openIntorduce,
      toTagImage,
      backPage
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
  .back{
    position: absolute;
    top: 88rpx;
    height: 88rpx;
    line-height: 88rpx;
    left: 34rpx;
    display: flex;
    align-items: center;
    image{
      width: 24rpx;
      height: 48rpx;
    }
  }
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
          color: #FFFFFF;
          opacity: 0.6;
        }
        .active{
          opacity: 1;
          border: 0.5px solid #FFFFFF;
        }
    }
    .introduce-content{
      padding: 0 40rpx 152rpx;
      .content-text{
        font-size: 28rpx;
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