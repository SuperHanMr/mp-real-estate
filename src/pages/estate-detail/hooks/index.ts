/*
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-03-31 21:02:49
 * @LastEditTime: 2022-04-12 15:40:51
 * @LastEditors: HanYongHui
 */

import { ref, reactive, toRefs } from "vue";
import {
  EstateDetail, getEstateDetail,
  getHouseTypeList, HouseTypeList,
  getCodeImage
} from "../../../api/estate-detail";
import { addBrowseRecord, addBrowseType } from "../../../api/case";


export const useEstateDetailHook = () => {
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
      codeDialogShow: false
    }
  )
  const reuqestEstateDetail = async (estateId: number) => {
    const res = await getEstateDetail(estateId)
    data.estateDetail = res.data as EstateDetail
  }
  const reuqestHouseTypeList = async (estateId: number) => {
    const res = await getHouseTypeList(estateId)
    data.houseTypeList = res.data || []
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