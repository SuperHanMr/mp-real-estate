/*
 * @Description: 楼盘列表
 * @Author: HanYongHui
 * @Date: 2022-04-08 15:51:40
 * @LastEditTime: 2022-04-13 10:36:51
 * @LastEditors: HanYongHui
 */

import createRequest from "../utils/create-request"
const baseURL = import.meta.env.VITE_URL_BASE_API
const request = createRequest(baseURL as string)


export type EstateList = {
  id: number,
  name: string //楼盘名称,
  url: string //楼盘封面,
  houseTypeNum: number //户型个数,
  schemeNum: number //方案个数,
  provinceName: string //省,
  cityName: string //市,
  districtName: string //区,
  address: string //楼盘详细地址
}[]

export function getEstateList(maxId: number) {
  return request.get<EstateList>(`/em/applet/client/findHouses`, { maxId: maxId, pageSize: 10 })
}