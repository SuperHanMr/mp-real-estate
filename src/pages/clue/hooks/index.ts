import { getSignupRecordDetail, SignupRecordDetail, MaterialItem } from "../../../api/clue"
import { reactive, toRefs } from "vue"
import { useParentWindowMessage } from "../../../hoosk/use-parent-window-message";
// const data = reactive < browerList: ClueBrowerList>

const signupDetailInfo = reactive<{ detailInfo: SignupRecordDetail }>({ detailInfo: {} as SignupRecordDetail })
export type imgList = {
  list: string[],
  bannerNum: number,
  tagList: tagItem[]
}
type tagItem = {
  name: string
  index: number,
  length: number,
  desc: string
}
let imgList = reactive<imgList>({ list: [], bannerNum: 0, tagList: [] } as imgList)
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