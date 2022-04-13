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
				v-for="(tabItem, index) in tabList"
				:key="index"
				:class="{ selected: index == currentIndex }"
				@click="changTab(index)">
				{{ tabItem.tabName }}
			</view>
		</view>
		<swiper
			class="swiper"
			@change="swiperChange"
			:duration="200"
			:current="currentIndex">
			<swiper-item v-for="item1 in tabList" :key="item1.key">
				<scroll-view
					class="scroll-view"
					:enable-back-to-top="true"
					lower-threshold="100"
					scroll-y="true"
					refresher-background="#FFF"
					:refresher-triggered="triggerd"
					@refresherrefresh="onRefresh"
					refresher-enabled="true"
					@scrolltolower="onLoadMore">
					<view class="list-container" v-if="currentIndex == 0 && signupList && signupList.length">
						<view class="item-container"
							v-for="(signupItem, index2) in signupList"
							:key="index2"
							@click="gotoRegistrationDetailPage(signupItem.id, 0, 'signup')">
							<view class="header">
								<img class="img" src="../../images/clue_item_bg.png" alt="">
								<view>
									<view class="projectName">{{ signupItem.estateName }}</view>
									<view class="customerName" v-if="storeData.role == 1">
										报名用户：{{ signupItem.userNickName }}/{{ signupItem.userPhoneNum }}</view>
								</view>
							</view>
							<view class="caseInfo-container">
								<image class="caseImg" :src="signupItem.coverImg" />
								<view class="caseInfo">
									<view class="caseName">{{ signupItem.schemeName }}</view>
									<view class="address">{{ signupItem.houseTypeName }}</view>
								</view>
							</view>

							<view class="bottomInfo" v-if="item1.key == 1">
								<view class="itemInfo">
									<view class="left">报名时间</view>
									<view class="right">{{ formatDate(signupItem.signTime) }}</view>
								</view>
								<view class="itemInfo">
									<view class="left"> 总价</view>
									<view class="right" style="font-weight: 500;">
										￥{{ handlePrice(signupItem.offerPrice / 100) }}
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="list-container" v-if="currentIndex == 1 && browerList && browerList.length">
						<view class="item-container"
							v-for="(browerItem, index3) in browerList"
							:key="index3"
							@click="gotoRegistrationDetailPage(browerItem.schemeId, browerItem.estateId || 0, 'brower')">
							<view class="header">
								<img class="img" src="../../images/clue_item_bg.png" alt="">
								<view>
									<view class="projectName">{{ browerItem.estateName }}</view>
									<view class="customerName" v-if="storeData.role == 1">
										报名用户： {{ browerItem.userNickName }}/{{ browerItem.phoneNum }}
									</view>
								</view>
							</view>
							<view class="caseInfo-container">
								<image class="caseImg" :src="browerItem.coverImg" />
								<view class="caseInfo">
									<view class="caseName">{{ browerItem.schemeName }}</view>
									<view class="address">{{ browerItem.houseTypeName }}</view>
								</view>
							</view>
							<view class="bottomInfo">
								<view class="itemInfo">
									<view class="left">浏览时间</view>
									<view class="right">{{ formatDate(browerItem.browseTime) }}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script lang="ts" >
import moment from "moment";
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { onLoad, onShow, onHide } from "@dcloudio/uni-app";
import {
	getClueBrowerList,
	getSignupRecordList,
	SignupParams,
	BrowerParams,
	BrowerItem,
	SignupRecordItem,
} from "../../api/clue"
import {reqhouseCaseCheck} from "../clue/hooks/index"
import { useUserInfoHooks } from "../../hoosk/index";

export default defineComponent({
	name: "",
	components: {},
	setup() {
		const { storeData } = useUserInfoHooks()
		console.log("storeData", storeData)
		const currentIndex = ref<number>(0)
		const browerList = ref<Array<BrowerItem>>([])
		const signupList = ref<SignupRecordItem[]>([])
		const triggerd = ref<boolean>(false)
		const loading = ref<boolean>(false)
		const {houseCaseCheck} =reqhouseCaseCheck()
		const tabList = [
			{ tabName: "报名记录", key: 1 },
			{ tabName: "浏览记录", key: 2 },
		]
		type Query = {
			page: number[],
			rows: number[],
			totalPage: number[],
			totalRows: number[],
		}
		const bgImg = "../../images/clue_item_bg.png"
		const queryData = reactive<Query>(
			{
				page: [1, 1],
				rows: [10, 10],
				totalPage: [1, 1],
				totalRows: [1, 1]

			} as Query
		)
		const reqSignupRecordList = async () => {
			try {
				let params: SignupParams = {
					page: queryData.page[0],
					rows: queryData.rows[0],
					type: 2,//查询入口 （1-业务后台，2-小程序）
				}
				//role 1.销售 2.C端用户
				if (storeData.role == 1) {
					params.consultantId = +storeData.userId
				} else {
					params.userId = +storeData.userId
				}
				loading.value = true
				const res = await getSignupRecordList(params)
				triggerd.value = false
				loading.value = false
				if (res.data && res.data.list) {
					signupList.value = [...signupList.value, ...res.data?.list]
					// debugger
					queryData.totalPage[0] = res.data.totalPage
					queryData.rows[0] = res.data.rows
				}
			} catch (error) {
				console.log("error!!", error)
			}
		}
		const reqBrowerList = async () => {
			// debugger
			try {
				let params: BrowerParams = {
					page: queryData.page[1],
					rows: queryData.rows[1],
					level: 3,//（1-楼盘，2-户型，3-方案）
				}
				if (storeData.role == 1) {
					params.consultantId = +storeData.userId
				} else {
					params.userId = +storeData.userId
				}
				loading.value = true
				const res = await getClueBrowerList(params)
				triggerd.value = false
				loading.value = false
				if (res.data && res.data.list) {
					browerList.value = [...browerList.value, ...res.data?.list]
					queryData.totalPage[1] = res.data.totalPage
					queryData.rows[1] = res.data.rows
				}
			} catch (error) {
				console.log("error!!", error)
			}
		}
		onLoad((e:any) => {
			if (currentIndex.value == 0) {
				reqSignupRecordList()
			} else {
				reqBrowerList()
			}
		})
		watch(currentIndex, () => {
			if (currentIndex.value == 0) {
				if (signupList.value.length) return
				reqSignupRecordList()
			} else {
				if (browerList.value.length) return
				reqBrowerList()
			}
		})

		const changTab = (index: number) => {
			currentIndex.value = index
		}

		const swiperChange = (e: any) => {
			let index = e.target.current || e.detail.current;
			currentIndex.value = index
		}
		const handlePrice = (price: number) => {
			if (!price) return '0.00'
			let list = String(price).split(".")
			if (list.length == 1) {
				return list[0] + '.' + '00'
			} else {
				return list[0] + '.' + list[1]
			}
		}

		const gotoRegistrationDetailPage = (id: number, estateId: number, type: string) => {
			console.log("去报名详情页面！！！", id)

			if (type == "signup") {
				// 去报名详情页面
				uni.navigateTo({
					url: `signup-detail/signup-detail?id=${id}&type=${type}`
				})
			} else {
				// 去方案详情页面
				houseCaseCheck(id)
				// uni.navigateTo({
				// 	url: `../case-detail/index?caseId=${id}`
				// })
			}
		}
		const formatDate = (time: number) =>
			moment(time).format("YYYY-MM-DD  HH:mm:ss")

		// 上拉加载
		const onLoadMore = () => {
			console.log("上拉加载！！！")
			if (loading.value) return
			if (currentIndex.value == 0) {
				if (queryData.page[0] >= queryData.totalPage[0]) return
				queryData.page[0]++
				reqSignupRecordList()
			} else {
				if (queryData.page[1] >= queryData.totalPage[1]) return
				queryData.page[1]++
				reqBrowerList()
			}
		}
		// 下拉刷新
		const onRefresh = () => {
			console.log("下拉刷新！！！")
			if (loading.value) return
			triggerd.value = true
			if (currentIndex.value == 0) {
				signupList.value = []
				queryData.page[0] = 1
				queryData.totalPage[0] = 1
				reqSignupRecordList()
			} else {
				browerList.value = []
				queryData.page[1] = 1
				queryData.totalPage[1] = 1
				reqBrowerList()
			}
		}
		return {
			bgImg,
			currentIndex,
			tabList,
			changTab,
			swiperChange,
			gotoRegistrationDetailPage,
			formatDate,
			// dataList,
			browerList,
			signupList,
			onLoadMore,
			onRefresh,
			handlePrice,
			triggerd,
			loading,
			storeData,
		};
	},
});
</script>
<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding-top: 0;

	// background-color: skyblue;
	.top-tab {
		display: flex;
		align-items: center;
		flex-flow: row nowrap;
		margin: 14rpx 24rpx;
		background: #F5F6F6;
		height: 68rpx;
		box-sizing: border-box;
		padding: 4rpx;
		border-radius: 16rpx;

		.item {
			width: 347rpx;
			text-align: center;
			// background: #FFFFFF;
			line-height: 60rpx;
			height: 60rpx;
			color: #999999;
			border-radius: 12rpx;
		}

		.selected {
			background-color: #FFFFFF;
			color: #252529;
		}
	}
}

.swiper {
	display: flex;
	flex: 1;
	flex-direction: column;

	swiper-item {
		height: 100%;
		overflow: auto;

		.scroll-view {
			flex: 1;
			height: 100%;

			.list-container {
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				margin: 0 32rpx;

				.item-container {
					width: 686rpx;
					border-radius: 24rpx;
					border: 0.5px solid #E8E8E8;
					box-sizing: border-box;
					margin-bottom: 24rpx;
					display: flex;
					align-items: flex-start;
					flex-flow: column nowrap;

					.header {
						width: 686rpx;
						height: 142rpx;
						border-radius: 24rpx 24rpx 0 0;
						display: flex;
						padding: 0 24rpx;
						box-sizing: border-box;
						align-items: center;
						position: relative;

						.img {
							position: absolute;
							width: 686rpx;
							height: 142rpx;
							left: -2rpx;
							z-index: -1;
							border-radius: 24rpx 24rpx 0 0;
						}

						view {
							display: flex;
							flex-flow: column nowrap;

							.projectName {
								height: 40rpx;
								line-height: 40rpx;
								font-size: 32rpx;
								font-weight: 500;
								color: #FFFFFF;
							}

							.customerName {
								height: 34rpx;
								line-height: 34rpx;
								font-size: 24rpx;
								color: #FFFFFF;
								margin-top: 12rpx;
							}
						}
					}

					.caseInfo-container {
						display: flex;
						align-items: center;
						flex-flow: row nowrap;
						margin: 24rpx;

						.caseImg {
							width: 144rpx;
							height: 108rpx;
							border-radius: 8rpx;
							background-color: pink;
							margin-right: 16rpx;
						}

						.caseInfo {
							.caseName {
								margin-bottom: 12rpx;
								max-width: 490rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								color: #333333;
								font-size: 28rpx;
								font-weight: 500;
							}

							.address {
								height: 30rpx;
								line-height: 30rpx;
								font-size: 22rpx;
								color: #999999;
							}
						}
					}

					.bottomInfo {
						margin: 0 24rpx 24rpx;
						padding: 24rpx;
						width: 638rpx;
						box-sizing: border-box;
						background: #FAFAFA;
						border-radius: 16rpx;

						.itemInfo {
							display: flex;
							align-items: center;
							justify-content: space-between;
							flex-flow: row nowrap;
							margin-bottom: 20rpx;

							.left {
								height: 28rpx;
								line-height: 28rpx;
								color: #999999;
								font-size: 24rpx;
							}

							.right {
								height: 28rpx;
								line-height: 28rpx;
								color: #333333;
								font-size: 24rpx;
							}
						}

						.itemInfo:nth-last-child(1) {
							margin-bottom: 0;
						}

					}
				}
			}
		}
	}
}

.clue-browse {
	width: 200rpx;
	height: 90rpx;
	background-color: pink;
}
</style>