import { defineComponent, reactive, ref, toRefs } from "vue";

import { houseDetail, houseDetailHooks } from "../../../api/case";
import { getCodeImage } from "../../../api/estate-detail";

const houseDetailData = reactive<{ houseDetail: houseDetail }>({ houseDetail: {} as houseDetail })
// const houseListData = reactive<{ listData: houseCaseList }>({ listData: {} as houseCaseList })
const codeUrl = ref<string>('')
export const getHouseDetailHooks = () => {
  const requestHouseDetail = async (houseId: number) => {
    let res = await houseDetailHooks(houseId)
    houseDetailData.houseDetail = res.data as houseDetail
    // requestCaseList(houseId)
  }
  const requestCode = async (id?: string) => {
    let url = 'sub-home/pages/decorate-scene/decorate-scene'
    let scene = '?houseId=' + id
    let res = await getCodeImage(url, scene)
    console.log(res.data)
    if (res.data) codeUrl.value = res.data
  }
  return {
    ...toRefs(houseDetailData),
    codeUrl,
    requestCode,
    requestHouseDetail,
  }
}
