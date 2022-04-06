<template>
  <view class="container">
		<scroll-view scroll-y="true" >
			<view class="header">
				材料升級
			</view>
			<view class="complain">
				这是材料升级的说明文案这是材料升级的说明文案这是材料升级的说明文案这是材料升级的说明文案这是材料升级的说明文案这是材料升级的说明文案这是材料升级的说明文案这是材料升级的说明文案这是材料升级的说明文案这是材料升级的说明文案这是材料升级的说明文案这是材料升级的
			</view>
			<view class="list-container">
				<view class="item-container" v-for="item in 5" :key="item">
					<image src="../../../images/code-icon.png" mode=""></image>
					<view class="info">
						<view class="title">
							室内玄关柜家居中式轻奢创意亚克力摆 件家装必备公寓件家装必备公寓件家室内玄关柜家居中式轻奢创意亚克力摆 件家装必备公寓件家装必备公寓件家..
						</view>
						<view class="icon">
							创意摆件｜苏里曼
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "",
  components: {},
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100%;
		overflow: scroll;
		background: #FFFFFF;
		.header{
			padding-left: 40rpx;
			font-weight: bold;
			font-size: 40rpx;
			height: 40rpx;
			line-height: 40rpx;
			color: #333333;
			letter-spacing: 1rpx;
			padding-bottom: 8rpx;
			background-color: #FFFFFF;
		}
		.complain{
			padding: 0 20rpx 40rpx 40rpx;
			font-size: 26rpx;
			line-height: 44rpx;
			color: #999999;
			background-color: #FFFFFF;
		}
		.list-container{
			display: flex;
			flex-flow: column nowrap;
			padding: 48rpx 32rpx;
			.item-container{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				margin-bottom: 32rpx;
				image{
					width: 176rpx;
					height: 176rpx;
					border-radius: 8rpx;
					background-color: pink;
					margin-right: 24rpx;
				}
				.info{
					display: flex;
					flex-flow: column nowrap;
					align-items: flex-start;
					justify-content: space-between;
					height: 176rpx;
					.title{
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
					.icon{
						height: 24rpx;
						line-height: 24rpx;
						padding: 6rpx 8rpx;
						color:  #586E85;
						background: #F2F4F7;
						border-radius: 6rpx;
						font-size: 22rpx;
					}
					
				}
			}
		}
		
	}
</style>
