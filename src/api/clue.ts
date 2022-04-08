import createRequest from "../utils/create-request";
const baseURL = import.meta.env.VITE_URL_DESIGN
const request = createRequest(baseURL as string)

export type ClueBrowerList = ClueBrowerItem[]

export type ClueBrowerItem = {
  id: number, //主键",
  userId: number, //浏览用户的id",
  userNickName: string, //浏览用户的昵称",
  phoneNum: string,  //浏览用户的手机号",
  consultantId: number, //分享页面的销售顾问的id",
  consultantName: string, //销售顾问姓名",
  consultantPhoneNum: string, //销售顾问手机号",
  estateId: number, //楼盘id",
  estateName: number, //楼盘名称",
  houseTypeId: number, //户型id",
  houseTypeName: number, //户型名称",
  schemeId: number,  //方案id",
  schemeName: string,  //方案名称",
  coverImg: string, //封面图片",
  browseTime: number,//浏览时间"
}

export function getClueBrowerList() {
  return request.get<ClueBrowerList>(`/em/applet/browseRecord/list`)
}