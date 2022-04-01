<template>
  <view
    class="nav"
    :class="{'navbar':opacity<100}"
  >
    <view
      class="navi-header-state"
      :style="{height:tophight,backgroundColor:bgcolor,opacity:opacity}"
    >
    </view>
    <view
      class="navi-header navbar-height"
      :style="{backgroundColor:bgcolor,opacity:opacity}"
    >
      <view :style="{color:titleColor}">
        {{title}}
      </view>
    </view>
    <view
      class="navi-back navbar-height"
      :style="{top:tophight}"
    >
      <slot name="back">
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
// export default {
//   name: "custom-navbar",
//   data() {
//     return {
//       tophight: 0,
//       navBarHeight: "88px",
//       backTop: 0,
//       backHeight: 0,
//     };
//   },
//   props: {
//     bgcolor: {
//       type: String,
//       default: "#F8F8F8",
//     },
//     titleColor: {
//       type: String,
//       default: "#000000",
//     },
//     title: {
//       type: String,
//       default: "",
//     },
//     opacity: {
//       type: Number,
//       default: 100,
//     },
//     showBack: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   methods: {},

//   mounted() {
//     const systemInfo = uni.getSystemInfoSync();
//     //状态栏高度
//     this.tophight = systemInfo.statusBarHeight + "px";
//     // 获取胶囊按钮的位置
//     // const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
//     // this.backTop = 0 + 'px';
//     // this.backHeight = 0 + 'px';
//     console.log("**********", this.backHeight);
//     // 导航栏高度 = 状态栏到胶囊的间距（ 胶囊距上距离 - 状态栏高度 ）*2  +  胶囊高度
//     // this.navBarHeight =
//     // 	systemInfo.statusBarHeight +
//     // 	"px";
//   },
//   onLoad() {},
// };

import {defineComponent,ref} from "vue"
export default defineComponent({
	 name: "custom-navbar",
	 components:{},
	 setup(props){
     console.log("props===",props)
    //获取状态栏高度
    const systemInfo =ref<any>({})
    const tophight = ref<number>(0)
    tophight.value = systemInfo.value.statusBarHeight

    return {}
	 }
})
</script>





<style lang="scss" scoped>
	.navi-back {
	  position: absolute;
	  left: 24rpx;
	  width: 50%;
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: flex-start;
	}

	.navbar {
	  position: fixed;
	  top: 0;
	  left: 0;
	  right: 0;
	  z-index: 999;
	}

	.navi-header-state {
	  display: flex;
	  flex-direction: row;
	  width: 100%;
	}

	.navi-header {
	  display: flex;
	  flex-direction: row;
	  width: 100%;
	  align-items: center;
	  justify-content: center;
	  position: relative;

	  .select-city {
	    width: 30rpx;
	    height: 20rpx;
	  }
	}
</style>