<!--
 * @Description: 线索
 * @Author: HanYongHui
 * @Date: 2022-03-29 18:00:33
 * @LastEditTime: 2022-03-29 20:06:07
 * @LastEditors: HanYongHui
-->
<template>
  <view class="container">
		<view class="top-tab">
			<view class="item"
				v-for="(tabItem,index) in tabList"
				:key="index"
				:class="{selected:index == currentIndex}"
				@click="changTab(index)"
			>
				{{tabItem.tabName}}
			</view>
		</view>
		<!-- 	:indicator-dots="true"
			:autoplay="true"
			:interval="3000" -->
		<swiper
			class="swiper"
			@change="swiperChange"
			:duration="200"
			:current="currentIndex"
			>
			<swiper-item>
				<!-- <view class="swiper-item"></view> -->
				<scroll-view class="scroll-view"  scroll-y="true" >
					<view class="list-container">
						<view class="item-container" v-for="listItem in 5" :key="listItem">
							<view class="header">
								<view >
									<view class="projectName">
										新天地五期新天地
									</view>
									<view class="customerName">
										报名用户： 小可爱
									</view>
								</view>
							</view>
							<view class="caseInfo-container">
								<image class="caseImg" src="../../images/code-icon.png" />
								<view class="caseInfo">
									<view class="caseName">
										时尚简约，打造都市白领最爱公寓红红火火恍恍惚惚或或或或或或
									</view>
									<view class="address">
										北区1-3栋  1室户型
									</view>
								</view>
							</view>

							<view class="bottomInfo">
								<view class="itemInfo">
									<view class="left">报名时间</view>
									<view class="right">2021-08-21  07:37:12</view>
								</view>
								<view class="itemInfo">
									<view class="left"> 总价</view>
									<view class="right" style="font-weight: 500;">￥1000.00</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<!-- <view class="swiper-item"></view> -->
				<scroll-view scroll-y="true" >
					<view>bbbbbbbb</view>
				</scroll-view>
			</swiper-item>
		</swiper>




		<!-- <view class="clue-browse" @click="clueBrowse">
			B端线索浏览页面
		</view> -->
	</view>
</template>
<script lang="ts">
import { defineComponent,ref,watch} from "vue";
export default defineComponent({
  name: "",
  components: {},
  setup() {
		const clueBrowse=()=>{
			uni.navigateTo({
				url:"browse-list/browse-list"
			})
		}
		const currentIndex=ref<number>(0)
		const tabList=[
			{tabName:"报名记录",key:1},
			{tabName:"浏览记录",key:2},
		]
		const changTab=(index:number)=>{
			currentIndex.value =index
			console.log("获取数据！！！！！",index,currentIndex)
		}
		const swiperChange=(e:any)=>{
			let index= e.target.current ||e.detail.current;
			currentIndex.value =index
		}
		watch(currentIndex,()=>{})
    return {
			clueBrowse,
			currentIndex,
			tabList,
			changTab,
			swiperChange,
		};
  },
});
</script>
<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding-top: 0;
		// background-color: skyblue;
		.top-tab{
			display: flex;
			align-items: center;
			flex-flow: row nowrap;
			margin: 14rpx 24rpx;
			background: #F5F6F6;
			height: 68rpx;
			box-sizing: border-box;
			padding: 4rpx;
			border-radius: 16rpx;
			.item{
				width: 347rpx;
				text-align: center;
				// background: #FFFFFF;
				line-height: 60rpx;
				height: 60rpx;
				color: #999999;
				border-radius: 12rpx;
			}
			.selected{
				background-color: #FFFFFF;
				color: #252529;
			}
		}
	}
	.swiper{
		display: flex;
		flex: 1;
		flex-direction: column;
		// background-color: pink;
		swiper-item{
			height: 100%;
			overflow: auto;
			.scroll-view{
				flex: 1;
				overflow: auto;
				.list-container{
					display: flex;
					flex-flow: column nowrap;
					align-items: center;
					margin: 0 32rpx;
					.item-container{
						width: 686rpx;
						border-radius: 24rpx;
						border: 0.5px solid #E8E8E8;
						box-sizing: border-box;
						margin-bottom: 24rpx;
						display: flex;
						align-items: flex-start;
						flex-flow: column nowrap;
						.header{
							width: 686rpx;
							height: 142rpx;
							border-radius: 24rpx 24rpx 0 0;
							background-color: skyblue;
							display: flex;
							padding: 0 24rpx;
							box-sizing: border-box;
							align-items: center;
							view{
								display: flex;
								flex-flow: column nowrap;
								.projectName{
									height: 40rpx;
									line-height: 40rpx;
									font-size: 32rpx;
									font-weight: 500;
									color: #FFFFFF;
								}
								.customerName{
									height: 34rpx;
									line-height: 34rpx;
									font-size: 24rpx;
									color: #FFFFFF;
									margin-top: 12rpx;
								}
							}
						}
						.caseInfo-container{
							display: flex;
							align-items: center;
							flex-flow: row nowrap;
							margin: 24rpx;
							.caseImg{
								width: 144rpx;
								height: 108rpx;
								border-radius: 8rpx;
								background-color: pink;
								margin-right: 16rpx;
							}
							.caseInfo{
								.caseName{
									margin-bottom: 12rpx;
									max-width: 490rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									color: #333333;
									font-size: 28rpx;
									font-weight: 500;
								}
								.address{
									height: 30rpx;
									line-height: 30rpx;
									font-size: 22rpx;
									color: #999999;
								}
							}
						}
						.bottomInfo{
							margin: 0 24rpx 24rpx;
							padding: 24rpx;
							width: 638rpx;
							box-sizing: border-box;
							background: #FAFAFA;
							border-radius: 16rpx;
							.itemInfo{
								display: flex;
								align-items: center;
								justify-content: space-between;
								flex-flow: row nowrap;
								margin-bottom: 20rpx;
								.left{
									height: 28rpx;
									line-height: 28rpx;
									color: #999999;
									font-size: 24rpx;
								}
								.right{
									height: 28rpx;
									line-height: 28rpx;
									color: #333333;
									font-size: 24rpx;
								}
							}
							.itemInfo:nth-last-child(1){
								margin-bottom: 0;
							}

						}
					}
				}
			}
		}
	}

	.clue-browse{
		width: 200rpx;
		height: 90rpx;
		background-color: pink;
	}
</style>