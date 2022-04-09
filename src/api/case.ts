/*
 * @Description: login and register
 * @Author: HanYongHui
 * @Date: 2022-04-06 16:48:34
 * @LastEditTime: 2022-04-07 18:24:48
 * @LastEditors: HanYongHui
 */
import createRequest from "../utils/create-request"
const baseURL = import.meta.env.VITE_URL_BASE_API
const request = createRequest(baseURL as string)
export type caseDetail = {
  //封面图
  coverPictureInfoVO: {
    coverImageUrl: string, //封面图url
    designIdeas: string,//封面图介绍
  },
  //效果图
  effectSpace: [
    {
      designIdeas: {
        designIdeasContext: string//效果空间介绍
      },
      effectImages: [
        {
          effectImageUrl: string
        }
      ],
      spaceName: {
        spaceName: string
      }
    }
  ],
  //户型图
  houseTypeImageUrls: [],
  //方案信息
  houseWithSchemeInfo: {
    //户型名称
    houseTypeName: string,
    //朝向
    direction: string,
    //户型
    specification: string,
    //面积
    floorAreaInside: number
  },
  //平面图
  planeImages: [],
  //套包
  productBagVOS: productItem[],
  //方案名称
  schemeName: string,
  //方案标签
  schemeTags: [
    {
      schemeTagName: string
    }
  ]
}
export type productItem = {
  bagDesc: {
    bagPackageDesc: string
  },
  buyItNow: {
    buyItNow: number
  },
  productBagName: {
    productBagName: string
  },
  spuInfoVOS: [],
  index: number
}

export type reportData = {
  estateId: number,
  schemeId: number,
  schemeSnapshot: string,
  offerPrice: number,
  consultantId?: number,
  consultantPhoneNum?: string,
  schemeName: string
}

export function caseDetail(caseId: number) {
  return request.get<caseDetail>('/em/applet/client/scheme/find/' + caseId)
}

export function reportRecord(params: reportData) {
  return request.post<{}>('/em/applet/signUpRecord', params)
}

export type houseDetail = {
  id: number,
  name: string,
  specification: string,
  direction: string,
  floorAreaInside: number,
  floorPlanFirst: string,
  floorPlans: string[],
  schemeSimpleItemVOS: houseCaseItem[]
}
export type houseCaseItem = {
  houseTypeId: number,
  schemeId: number,
  schemeName: string,
  schemeStyles: string[],
  coverPicture: {
    coverPictureUrl: string
  }
}
export function houseDetailHooks(houseId: number) {
  return request.get<houseDetail>('/em/applet/client/findHousesTypeInfo?housesTypeId=' + houseId)
}

// export function houseCaseListHooks(houseId: number) {
//   return request.get<houseCaseList>('/em/applet/client/findSchemeList?housesTypeId=' + houseId)
// }

// export type RegisterParams = {
//   code: string,
//   rawData: string,
//   signature: string,
// }
// export function register(params: RegisterParams) {
//   return request.post('/em/applet/wx/register', params)
// }
