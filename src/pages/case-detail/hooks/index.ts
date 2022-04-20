/*
 * @Description: login
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:42:10
 * @LastEditTime: 2022-04-20 10:51:28
 * @LastEditors: HanYongHui
 */
import { defineComponent, reactive, ref, toRefs } from "vue";

import {
  caseDetail,
  reportRecord,
  reportData,
  findParentIds,
  findParentParams,
  findParentData,
  addBrowseRecord,
  houseDetailHooks,
} from "../../../api/case";
import { getCodeImage } from "../../../api/estate-detail";
import { useUserInfoHooks, switchHome } from "../../../hoosk/index";
const { storeData } = useUserInfoHooks();
const caseDetailData = reactive<{ caseDetail: caseDetail }>({ caseDetail: { houseWithSchemeInfo: {} } as caseDetail })
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
const codeUrl = ref<string>('')
const parentId = ref<findParentData>({} as findParentData)
const enterNum = ref<number>(0)
const codeDialogShow = ref<boolean>(false)



export const getCaseDetailHooks = () => {
  const requestCaseDetail = async (caseId: number) => {
    try {
      caseDetailData.caseDetail = { houseWithSchemeInfo: {} } as caseDetail
      console.log(caseDetailData.caseDetail, ">>>>>>>")
      const data = await caseDetail(caseId)
      caseDetailData.caseDetail = data.data as caseDetail
      console.log(caseDetailData.caseDetail, ">>>>>>>")
      addImage(caseDetailData.caseDetail)
    } catch (err) {
      if (err.data.code === 410) {
        switchHome("该方案已下架")
      }
    }



  }
  const addImage = (data: caseDetail) => {
    imgList.list = []
    imgList.tagList = []
    imgList.bannerNum = 0
    imgList.list.push(data.coverPictureInfoVO.coverImageUrl)
    let num = 1
    imgList.tagList.push({
      name: '封面',
      index: 0,
      length: 1,
      desc: data.coverPictureInfoVO.designIdeas
    })
    data.effectSpace.forEach(item => {
      item.effectImages.forEach(el => {
        imgList.list.push(el.effectImageUrl)
        imgList.bannerNum++
      })
      imgList.tagList.push({
        name: item.spaceName.spaceName,
        index: num,
        length: item.effectImages.length,
        desc: item.designIdeas.designIdeasContext
      })
      num = num + item.effectImages.length
    })
    imgList.list = imgList.list.concat(data.planeImages)
    imgList.list = imgList.list.concat(data.houseTypeImageUrls)
    imgList.tagList.push({
      name: '户型图',
      index: num,
      length: data.planeImages.length + data.houseTypeImageUrls.length,
      desc: ''
    })
    console.log(imgList)
  }
  const requestReport = async (reportData: reportData, callBack: VoidFunction) => {
    reportData.estateId = parentId.value.estateId
    reportData.houseTypeId = parentId.value.houseTypeId
    let res = await reportRecord(reportData)
    // return res.code
    switch (res.code) {
      case 1:
        uni.showToast({
          title: '报名成功',
          icon: 'success',
          mask: true
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 1000)
        break;
      case 204:
        let pages = getCurrentPages()
        // console.log(pages.length,'当前栈深度')
        if (pages.length < 2) {
          uni.switchTab({
            url: '/pages/home/index'
          });
        } else {
          uni.navigateBack({
            delta: 1
          })
        }
        break;
      default:
        break;
    }
  }

  //查询父级id
  const requestFindParentIds = async (params: findParentParams) => {
    let res = await findParentIds(params)
    if (res.data) parentId.value = res.data
    if (enterNum.value === 0) {
      requestAddBrowseRecord(params.pageId)

    }

  }
  const requestAddBrowseRecord = async (caseId: number) => {
    if (storeData.role === 1) {
      return
    }
    let params = {
      userId: +storeData.userId || 12,
      userNickName: storeData.userName || '丢你个二维码',
      consultantId: uni.getStorageSync('shareId') || '',
      estateId: parentId.value.estateId,
      houseTypeId: parentId.value.houseTypeId,
      schemeId: caseId,
      schemeName: caseDetailData.caseDetail.schemeName
    }
    console.log(params, '浏览记录')
    let res = await addBrowseRecord(params)
    enterNum.value++
    console.log(res)
    // if (res.data) parentId.value = res.data
  }
  const requestCode = async (sence?: string) => {
    let url = 'pages/case-detail/index'
    let res = await getCodeImage(url, sence)
    // console.log(res.data)
    if (res.data) {
      codeUrl.value = res.data
      codeDialogShow.value = true
    }
  }
  return {
    ...toRefs(caseDetailData),
    imgList,
    codeUrl,
    enterNum,
    codeDialogShow,
    requestCaseDetail,
    requestReport,
    requestCode,
    requestFindParentIds,
    // requestRegister,
  }
}
