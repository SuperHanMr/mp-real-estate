/*
 * @Description: login
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:42:10
 * @LastEditTime: 2022-04-07 19:14:36
 * @LastEditors: HanYongHui
 */
import { defineComponent, reactive, ref, toRefs } from "vue";

import { caseDetail, reportRecord, reportData } from "../../../api/case";
import { getCodeImage } from "../../../api/estate-detail";

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
export const getCaseDetailHooks = () => {

  const requestCaseDetail = async (caseId: number) => {
    caseDetailData.caseDetail = { houseWithSchemeInfo: {} } as caseDetail
    console.log(caseDetailData.caseDetail, ">>>>>>>")
    try {
      const data = await caseDetail(caseId)
      caseDetailData.caseDetail = data.data as caseDetail
      console.log(caseDetailData.caseDetail, ">>>>>>>")
      addImage(caseDetailData.caseDetail)
    } catch { }

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
  const requestReport = async (reportData: reportData) => {
    let res = await reportRecord(reportData)
    // return res.code
    if (res.code === 1) {
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

    }
  }
  const requestCode = async (sence?: string) => {
    let url = '/pages/case-detail/index'
    let res = await getCodeImage(url, sence)
    // console.log(res.data)
    if (res.data) codeUrl.value = res.data
  }
  // const requestRegister = async (parmas: RegisterParams) => {
  //   const res = await register(parmas)
  //   return res
  // }

  return {
    ...toRefs(caseDetailData),
    imgList,
    codeUrl,
    requestCaseDetail,
    requestReport,
    requestCode
    // requestRegister,
  }
}
