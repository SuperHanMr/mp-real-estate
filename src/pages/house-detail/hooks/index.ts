import { defineComponent, reactive, ref, toRefs } from "vue";

import {
  houseDetail,
  houseDetailHooks,
  requestHouseCaseCheck,
  findParentIds,
  findParentParams,
  findParentData,
  addBrowseRecord,
} from "../../../api/case";
import { getCodeImage } from "../../../api/estate-detail";
import { useUserInfoHooks } from "../../../hoosk/index";

const { storeData } = useUserInfoHooks();
const houseDetailData = reactive<{ houseDetail: houseDetail }>({ houseDetail: {} as houseDetail })
const parentId = ref<findParentData>({} as findParentData)
const codeUrl = ref<string>('')
export const getHouseDetailHooks = () => {
  const requestHouseDetail = async (houseId: number) => {
    let res = await houseDetailHooks(houseId)
    houseDetailData.houseDetail = res.data as houseDetail
    // requestCaseList(houseId)
    requestFindParentIds({ pageId: houseId, level: 2 })
  }
  const requestCode = async (id?: string) => {
    let url = 'sub-home/pages/decorate-scene/decorate-scene'
    let scene = '?houseId=' + id
    if (storeData.consultantPhoneNum) {
      scene = scene + '&consultantPhoneNum' + storeData.consultantPhoneNum + '&consultantId' + storeData.consultantId
    }
    let res = await getCodeImage(url, scene)
    console.log(res.data)
    if (res.data) codeUrl.value = res.data
  }
  //查询父级id
  const requestFindParentIds = async (params: findParentParams) => {
    let res = await findParentIds(params)
    if (res.data) parentId.value = res.data
    requestAddBrowseRecord()
  }
  const requestAddBrowseRecord = async () => {
    let params = {
      userId: +storeData.userId,
      userNickName: storeData.userName,
      consultantId: uni.getStorageSync('shareId') || '',
      estateId: parentId.value.estateId,
      houseTypeId: parentId.value.houseTypeId,
    }
    let res = await addBrowseRecord(params)
    console.log(res)
    // if (res.data) parentId.value = res.data
  }
  const houseCaseCheck = async (houseId: number, caseId: number) => {
    let res = await requestHouseCaseCheck(caseId)
    console.log(res)
    if (res.data && res.data.status === 1) {
      uni.navigateTo({
        url: `/pages/case-detail/index?caseId=${caseId}&houseId=${houseId}`
      })
    } else {
      uni.showToast({
        title: "方案已被禁用或下架",
        icon: "none",
        duration: 1000
      })
      requestHouseDetail(houseId)
    }
  }
  return {
    ...toRefs(houseDetailData),
    codeUrl,
    requestCode,
    requestHouseDetail,
    houseCaseCheck
  }
}
