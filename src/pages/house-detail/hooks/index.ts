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
const houseDetailData = reactive<{ houseDetail: houseDetail }>({ houseDetail: { schemeSimpleItemVOS: {} } as houseDetail })
const parentId = ref<findParentData>({} as findParentData)
const codeUrl = ref<string>('')
const enterNum = ref<number>(0)
export const getHouseDetailHooks = () => {
  const requestHouseDetail = async (houseId: number) => {
    let res = await houseDetailHooks(houseId)
    houseDetailData.houseDetail = res.data as houseDetail
    // requestCaseList(houseId)
    requestFindParentIds({ pageId: houseId, level: 2 })

  }
  const requestCode = async (id?: string) => {
    let url = 'pages/house-detail/index'
    let scene = 'houseId=' + id
    if (uni.getStorageSync('shareId')) {
      scene = scene + `&shareId=${uni.getStorageSync('shareId')}`
    }
    // if (storeData.consultantPhoneNum) {
    //   scene = scene + '&consultantPhoneNum' + storeData.consultantPhoneNum + '&consultantId' + storeData.consultantId
    // }
    let res = await getCodeImage(url, scene)
    if (res.data) codeUrl.value = res.data
  }
  //查询父级id
  const requestFindParentIds = async (params: findParentParams) => {
    let res = await findParentIds(params)
    if (res.data) parentId.value = res.data
    console.log(enterNum.value, "/////////")
    if (enterNum.value === 0) {
      requestAddBrowseRecord()
    }
  }
  const requestAddBrowseRecord = async () => {
    if (storeData.role === 1) {
      return
    }
    let params = {
      userId: +storeData.userId,
      userNickName: storeData.userName,
      consultantId: uni.getStorageSync('shareId') || '',
      estateId: parentId.value.estateId,
      houseTypeId: parentId.value.houseTypeId,
    }
    let res = await addBrowseRecord(params)
    enterNum.value++
    console.log(res)
    // if (res.data) parentId.value = res.data
  }
  const houseCaseCheck = async (houseId: number, caseId: number) => {
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
      setTimeout(() => {
        requestHouseDetail(houseId)
      }, 1000)
    }
  }
  return {
    ...toRefs(houseDetailData),
    codeUrl,
    enterNum,
    requestCode,
    requestHouseDetail,
    houseCaseCheck

  }
}
