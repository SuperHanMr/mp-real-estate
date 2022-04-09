/*
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-03-31 21:02:49
 * @LastEditTime: 2022-04-09 15:22:38
 * @LastEditors: HanYongHui
 */

import { ref, reactive, toRefs } from "vue";
import {
  EstateDetail, getEstateDetail,
  getHouseTypeList, HouseTypeList,
  getCodeImage
} from "../../../api/estate-detail";

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

  return {
    ...toRefs(data),
    reuqestEstateDetail,
    reuqestHouseTypeList,
    requestCodeImage,
  }
}