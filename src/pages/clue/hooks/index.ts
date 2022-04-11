import { getSignupRecordDetail, SignupRecordDetail, MaterialItem } from "../../../api/clue"
import { reactive, toRefs } from "vue"
// const data = reactive < browerList: ClueBrowerList>

const signupDetailInfo = reactive<{ detailInfo: SignupRecordDetail }>({
  detailInfo: {
    coverPictureInfoVO: { coverImageUrl:''},
    houseWithSchemeInfo: {},
  } as SignupRecordDetail })

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