<!--
 * @Description: 线索
 * @Author: HanYongHui
 * @Date: 2022-03-29 18:00:33
 * @LastEditTime: 2022-03-29 20:06:07
 * @LastEditors: HanYongHui
-->
<template>
  <view>
		线索
		<view class="clue-browse" @click="clueBrowse">
			B端线索浏览页面
		</view>
	</view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "",
  components: {},
  setup() {
		const clueBrowse=()=>{
			uni.navigateTo({
				url:"browse-list/browse-list"
			})
		}
    return {
			clueBrowse
		};
  },
});
</script>
<style lang="scss" scoped>
	.clue-browse{
		width: 200rpx;
		height: 90rpx;
		background-color: pink;
	}
</style>