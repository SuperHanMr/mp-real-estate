import {
  getSignupRecordDetail,
  SignupRecordDetail,
  MaterialItem,
  BrowerDetail,
  getBrowerDetail,
  requestHouseCaseCheck,
} from "../../../api/clue"
import { reactive, toRefs } from "vue"
// const data = reactive < browerList: ClueBrowerList>

const signupDetailInfo = reactive<{ detailInfo: SignupRecordDetail }>({
  detailInfo: {
    coverPictureInfoVO: { coverImageUrl: '' },
    houseWithSchemeInfo: {},
  } as SignupRecordDetail
})

export const getRecordDetail = () => {
  const requestSignupDetail = async (id: number) => {
    try {
      const res = await getSignupRecordDetail(id)
      console.log("res", res)
      if (!res.data) return
      signupDetailInfo.detailInfo = res.data as SignupRecordDetail
      console.log("signupDetailInfo.detailInfo==", signupDetailInfo.detailInfo)
      console.log("productBagVOS.detailInfo==", signupDetailInfo.detailInfo.productBagVOS)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    requestSignupDetail,
    signupDetailInfo,
  }
}

const browerDetailInfo = reactive<{ detailInfo: BrowerDetail }>({
  detailInfo: {
    coverPictureInfoVO: { coverImageUrl: '' },
    houseWithSchemeInfo: {},
  } as BrowerDetail
})

export const getBrowerDetailInfo = () => {
  const requestBrowerDetail = async (schemeId: number) => {
    try {
      const res = await getBrowerDetail(schemeId)
      console.log("浏览详情res", res)
      if (!res.data) return
      browerDetailInfo.detailInfo = res.data as BrowerDetail
      console.log("BrowerDetailInfo.detailInfo", browerDetailInfo.detailInfo)
      console.log("productBagVOS.data===", browerDetailInfo.detailInfo.productBagVOS)

    } catch (error) {
      console.log("error", error)
    }
  }
  return {
    requestBrowerDetail,
    browerDetailInfo,
  }
}

export const reqhouseCaseCheck = () => {

  const houseCaseCheck = async ( caseId: number) => {
    let res = await requestHouseCaseCheck(caseId)
    console.log(res)
    if (res.data && res.data.status === 1) {
      uni.navigateTo({
        url: `/pages/case-detail/index?caseId=${caseId}`
      })
    } else {
      uni.showToast({
        title: "方案已被禁用或下架",
        icon: "none",
        duration: 1000
      })
    }
  }
  return {houseCaseCheck}
}