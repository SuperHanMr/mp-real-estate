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
		<swiper
			class="swiper"
			@change="swiperChange"
			:duration="200"
			:current="currentIndex"
			>
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
					@scrolltolower="onLoadMore"
				>
					<view class="list-container" v-if="currentIndex==0">
						<view class="item-container"
							v-for="(signupItem,index2) in signupList"
							:key="index2"
							@click="gotoRegistrationDetailPage(signupItem.id)"
						>
							<view class="header">
								<img class="img" src="../../images/clue_item_bg.png" alt="">
								<view>
									<view class="projectName">{{signupItem.estateName}}</view>
									<!-- 报名用户字段只有销售端出现 -->
									<view class="customerName">报名用户：{{signupItem.userNickName}}</view>
								</view>
							</view>
							<view class="caseInfo-container">
								<image class="caseImg" :src="signupItem.coverImg" />
								<view class="caseInfo">
									<view class="caseName">{{signupItem.schemeName}}</view>
									<view class="address">{{signupItem.houseTypeName}}</view>
								</view>
							</view>

							<view class="bottomInfo" v-if="item1.key==1">
								<view class="itemInfo">
									<view class="left">报名时间</view>
									<view class="right">{{formatDate(signupItem.signTime)}}</view>
								</view>
								<view class="itemInfo">
									<view class="left"> 总价</view>
									<view class="right" style="font-weight: 500;">￥{{signupItem.offerPrice}}</view>
								</view>
							</view>
						</view>
					</view>

					<view class="list-container" v-if="currentIndex==1">
						<view class="item-container"
							v-for="(bowerItem,index3) in browerList"
							:key="index3"
							@click="gotoRegistrationDetailPage(bowerItem.id)"
						>
							<view class="header" >
								<img class="img" src="../../images/clue_item_bg.png" alt="">
								<view>
									<view class="projectName">{{bowerItem.estateName}}</view>
									<!-- 报名用户字段只有销售端出现 -->
									<view class="customerName">报名用户： {{bowerItem.userNickName}}</view>
								</view>
							</view>
							<view class="caseInfo-container">
								<image class="caseImg" :src="bowerItem.coverImg" />
								<view class="caseInfo">
									<view class="caseName">{{bowerItem.schemeName}}</view>
									<view class="address">{{bowerItem.houseTypeName}}</view>
								</view>
							</view>
							<view class="bottomInfo">
								<view class="itemInfo">
									<view class="left">浏览时间</view>
									<view class="right">{{formatDate(bowerItem.browseTime)}}</view>
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
import { computed, defineComponent,reactive,ref,watch} from "vue";
import { onLoad, onShow, onHide } from "@dcloudio/uni-app";
import {
	getClueBrowerList,
	getSignupRecordList,
	SignupParams,
	BrowerItem,
	SignupRecordList,
	SignupRecordItem
} from "../../api/clue"

export default defineComponent({
  name: "",
  components: {},
  setup() {
		const currentIndex=ref<number>(0)
		const browerList = ref<Array<BrowerItem>>([])
		const signupList =ref<Array<SignupRecordItem>>([])
		const triggerd =ref<boolean>(false)
		const loading = ref<boolean>(false)
		const tabList=[
			{tabName:"报名记录",key:1},
			{tabName:"浏览记录",key:2},
		]
		type Query = {
			page: number[],
			rows: number[],
			totalPage:number[],
			totalRows:number[],
		}
		const bgImg = "../../images/clue_item_bg.png"
		const queryData = reactive<Query>(
			{
				page:[1,1],
				rows:[10,10],
				totalPage:[1,1],
				totalRows:[1,1]

			} as Query
		)
		const reqSignupRecordList = async()=>{
			try {
				let params:SignupParams={
					page: queryData.page[0],
					rows: queryData.rows[0],
					consultantId: 1,//销售顾问id
					userId: 1,//用户id
					type: 2,//查询入口 （1-业务后台，2-小程序）
					estateId: 0,//若为业务后台，需要添加此字段 全部楼盘传0，具体楼盘传具体id即可
				}
				loading.value = true
				const res= await getSignupRecordList(params)
				triggerd.value = false
				if(!res.data) return
				signupList.value=signupList.value.concat(res.data.list)
				queryData.totalPage[0] = res.data.totalPage
				queryData.rows[0] = res.data.rows
				loading.value = false
			} catch (error) {
				console.log("error!!",error)
			}
		}
		const reqBrowerList= async()=>{
		// debugger
			try {
				let params={
					page:queryData.page[1],
					rows:queryData.rows[1],
					level:3
				}
				loading.value =true
				const res = await getClueBrowerList(params)
				triggerd.value = false
				if(!res.data) return
				browerList.value = browerList.value.concat(res.data.list)
				queryData.totalPage[1] = res.data.totalPage
				queryData.rows[1] = res.data.rows
				loading.value = false
			} catch (error) {
				console.log("error!!",error)
			}
		}
		onShow(()=>{
			if(currentIndex.value==0){
				reqSignupRecordList()
			}else{
				reqBrowerList()
			}
		})
		watch(currentIndex,()=>{
			if(currentIndex.value==0){
				if(signupList.value.length) return
				reqSignupRecordList()
			}else{
				if(browerList.value.length) return
				reqBrowerList()
			}
		})

		const changTab=(index:number)=>{
			currentIndex.value =index
		}
		const swiperChange=(e:any)=>{
			let index= e.target.current ||e.detail.current;
			currentIndex.value =index
		}

		const gotoRegistrationDetailPage =(id:number)=>{
			console.log("去报名详情页面！！！",id)
			console.log("userId")
			uni.navigateTo({
				url:`signup-detail/signup-detail?id=${id}`
			})
		}
		const formatDate = (time: number) =>
       moment(time).format("YYYY-MM-DD  HH:mm:ss")

		// 上拉加载
		const onLoadMore=()=>{
			console.log("上拉加载！！！")
			if(loading.value) return
			if(currentIndex.value==0){
				if(queryData.page[0]>=queryData.totalPage[0])return
				queryData.page[0]++
				reqSignupRecordList()
			}else{
				if(queryData.page[1]>=queryData.totalPage[1]) return
				queryData.page[1]++
				reqBrowerList()
			}
		}
		// 下拉刷新
		const onRefresh=()=>{
			console.log("下拉刷新！！！")
			if(loading.value) return
			triggerd.value = true
			if(currentIndex.value ==0){
				signupList.value=[]
				queryData.page[0] = 1
				queryData.totalPage[0] = 1
				reqSignupRecordList()
			}else{
				browerList.value =[]
				queryData.page[1]=1
				queryData.totalPage[1]=1
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
			triggerd,
			loading,
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
		swiper-item{
			height: 100%;
			overflow: auto;
			.scroll-view{
				flex: 1;
				height: 100%;
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
							display: flex;
							padding: 0 24rpx;
							box-sizing: border-box;
							align-items: center;
							position: relative;
							.img{
								position: absolute;
								width: 686rpx;
								height: 142rpx;
								left: -1rpx;
								z-index: -1;
							}
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