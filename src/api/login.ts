/*
 * @Description: login and register
 * @Author: HanYongHui
 * @Date: 2022-04-06 16:48:34
 * @LastEditTime: 2022-04-14 11:16:21
 * @LastEditors: HanYongHui
 */
import createRequest from "../utils/create-request"
const baseURL = import.meta.env.VITE_URL_BASE_API
const request = createRequest(baseURL as string)
export type LoginRes = {
  name: string //名字,
  role: number //角色
  isRegister: number,
  id: string,
}

export function login(code: string) {
  return request.post<LoginRes>('/em/applet/wx/login', { code: code })
}


export type RegisterParams = {
  code: string,
  rawData: string,
  signature: string,
}
export function register(params: RegisterParams) {
  return request.post<LoginRes>('/em/applet/wx/register', params)
}


export type BrowseRecordRes = {
  browseTime: number,
  consultantId: number,
  consultantPhoneNum: number,
  estateId: number,
  houseTypeId: number,
  id: number,
  phoneNum: number,
  schemeId: number,
  userId: number,
  userNickName: string
}
export function queryBrowseRecord() {
  return request.get<BrowseRecordRes>('/em/applet/browseRecord/getLatest')
}
