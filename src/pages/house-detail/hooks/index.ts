import { defineComponent, reactive, ref, toRefs } from "vue";

import { houseDetail, houseDetailHooks } from "../../../api/case";
const houseDetailData = reactive<{ houseDetail: houseDetail }>({ houseDetail: {} as houseDetail })
// const houseListData = reactive<{ listData: houseCaseList }>({ listData: {} as houseCaseList })
export const getHouseDetailHooks = () => {
  const requestHouseDetail = async (houseId: number) => {
    let res = await houseDetailHooks(houseId)
    houseDetailData.houseDetail = res.data as houseDetail
    // requestCaseList(houseId)
  }
  // const requestCaseList = async (houseId: number) => {
  //   let res = await houseCaseListHooks(houseId)
  //   houseListData.listData = res.data as houseCaseList
  // }
  return {
    ...toRefs(houseDetailData),
    // ...toRefs(houseListData),
    requestHouseDetail,
  }
}
