/*
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-03-31 21:02:49
 * @LastEditTime: 2022-04-19 16:13:11
 * @LastEditors: HanYongHui
 */

import { ref, reactive, toRefs } from "vue";
import {
  EstateDetail, getEstateDetail,
  getHouseTypeList, HouseTypeList,
  getCodeImage
} from "../../../api/estate-detail";
import { addBrowseRecord, addBrowseType } from "../../../api/case";
import { switchHome } from "../../../hoosk/index";


export const useEstateDetailHook = (page?: string) => {
  const data = reactive<{
    estateDetail: EstateDetail,
    houseTypeList: HouseTypeList,
    codeImageUrl: string,
    codeDialogShow: boolean,

  }>(
    {
      estateDetail: {} as EstateDetail,
      houseTypeList: [],
      codeImageUrl: '',
      codeDialogShow: false,
    }
  )
  const reuqestEstateDetail = async (estateId: number) => {
    try {
      const res = await getEstateDetail(estateId)
      data.estateDetail = res.data as EstateDetail
      // 重复弹窗
      if (data.estateDetail.status !== 1 && page !== 'home') {
        switchHome(`该楼盘已下架`);
      }
      uni.stopPullDownRefresh()
    } catch (err) {
    }
  }
  const reuqestHouseTypeList = async (estateId: number) => {
    const res = await getHouseTypeList(estateId)
    data.houseTypeList = res.data || []
    uni.stopPullDownRefresh()
  }

  const requestCodeImage = async (pagePath: string, scene?: string) => {
    const res = await getCodeImage(pagePath, scene)
    data.codeImageUrl = res.data || ""
    data.codeDialogShow = true
  }

  const requestAddBrowseRecord = async (parmas: addBrowseType) => {
    const res = await addBrowseRecord(parmas)
  }

  return {
    ...toRefs(data),
    reuqestEstateDetail,
    reuqestHouseTypeList,
    requestCodeImage,
    requestAddBrowseRecord,
  }
}