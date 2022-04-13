/*
 * @Description: 楼盘详情
 * @Author: HanYongHui
 * @Date: 2022-04-08 16:42:31
 * @LastEditTime: 2022-04-12 14:54:33
 * @LastEditors: HanYongHui
 */

import createRequest from "../utils/create-request"
const baseURL = import.meta.env.VITE_URL_BASE_API
const request = createRequest(baseURL as string)
export type EstateDetail = {
  id: number //id,
  url: string //封面,
  name: string //楼盘名称,
  developerName: string //开发商名称,
  address: string //楼盘详细地址,
  provinceName: string //省,
  cityName: string //市,
  districtName: string //区,
  provinceId: number //省id,
  cityId: number //市id,
  districtId: number //区id,
  status: number //启用状态(0删除 1为启用  2 启用),
  createTime: number //create_time,
  houseTypeNum: number //户型个数
}
export function getEstateDetail(houseId: number) {
  return request.get<EstateDetail>(`/em/applet/sales/findHousesInfo`, { housesId: houseId })
}

// 查询户型列表
export type HouseTypeList = {
  id: number //主键,
  name: string //户型名称,
  specification: string //规格(三室一厅一厨一卫.....),
  direction: string //朝向,
  floorArea: number //建筑面积,
  floorAreaInside: number //套内面积,
  floorPlanFirst: string //第一个 户型图,
  schemeNum: number //方案个数,
  schemeURLList: string[] //方案封面图
}[]

export function getHouseTypeList(houseId: number) {
  return request.get<HouseTypeList>(`/em/applet/sales/findHousesTypeList`, { housesId: houseId })
}

// 获取分享二维码
export function getCodeImage(pagePath: string, scene?: string) {
  let params = {
    page: pagePath,
    scene: scene,
    envVersion: import.meta.env.VITE_URL_BASE_API === "https://est-stage.meiwu365.com"
  }
  return request.get<string>(`/em/applet/share/getWxCodeForEM`, params)
}

