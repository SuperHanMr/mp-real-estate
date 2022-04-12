import { getSignupRecordDetail, SignupRecordDetail, MaterialItem, BrowerDetail, getBrowerDetail, } from "../../../api/clue"
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
      console.log("signupDetailInfo.data==", signupDetailInfo.detailInfo)
      console.log("productBagVOS.data==", signupDetailInfo.detailInfo.productBagVOS)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    requestSignupDetail,
    ...toRefs(signupDetailInfo)
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
    ...toRefs(browerDetailInfo)
  }
}