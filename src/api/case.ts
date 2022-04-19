/*
 * @Description: login and register
 * @Author: HanYongHui
 * @Date: 2022-04-06 16:48:34
 * @LastEditTime: 2022-04-19 14:30:28
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
  // 楼盘状态
  estateState: number,
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
    floorAreaInside: number,
    // 户型Id
    housesId: number,
    // 户型状态
    status: number,
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
  ],
}




export type productItem = {
  spuHelperList: number[],//辅助list
  bagDesc: {
    bagPackageDesc: string
  },
  buyItNow: {
    buyItNow: number
  },
  productBagName: {
    productBagName: string
  },
  spuInfoVOS: [{
    spuId: number,
    createDate: number, //创建时间,
    skuInfoVOList: [{
      skuImageUrl: string, //【商品SKU图】取【商品SKU图】,
      skuId: number, //【SKUID】取商品【SKUID】,
      skuAttribute: string, //【SKU属性】取商品销售规格中 SKU属性拼接,
      baseStateInfo: {
        code: number, //1：& 2：,
        stateDesc: string,
      },
      minByCount: string, //最小起购数量,
      unitStr: string, //销售单位,
      salePrice: string, //销售价
    }],
    baseStateInfo: {
      code: number, //1：& 2：,
      stateDesc: string,
    },
    spuImageUrl: string, //【商品图】取【商品SPU缩略图】,
    spuName: string, //【商品名称】取【商品名称】,
    categoryName: string, //【商品品类】取商品品类【品类名称】,
    brandName: string, //【品牌】取商品关联品牌【品牌名称】,
    supplierName: string, //【供应商】取商品关联供应商【供应商名称】，无显示--,
    storeName: string, //所属店铺】取商品关联店铺【店铺名称】
  }],
  index: number
}

export type reportData = {
  houseTypeId: number,
  userId: string,
  estateId: number,
  schemeId: number,
  schemeSnapshot: string,
  offerPrice: number,
  consultantId?: string,
  schemeName: string
}

export function caseDetail(caseId: number) {
  return request.get<caseDetail>('/em/applet/client/scheme/find/' + caseId)
}

export function reportRecord(params: reportData) {
  return request.post<{}>('/em/applet/signUpRecord', params)
}
export type findParentParams = {
  pageId: number, level: number
}
export type findParentData = {
  estateId: number, houseTypeId: number
}
export function findParentIds(params: findParentParams) {
  return request.get<findParentData>('/em/applet/sales/findParentIds', params)
}

export type addBrowseType = {
  userId: number,
  userNickName: string,
  consultantId?: string,
  estateId: number,
  houseTypeId?: number,
  schemeId?: number,
  schemeName?: string
}

export function addBrowseRecord(params: addBrowseType) {
  return request.post<{}>('/em/applet/browseRecord/addBrowseRecord', params)
}

export type houseDetail = {
  id: number,
  name: string,
  specification: string,
  direction: string,
  floorAreaInside: number,
  floorPlanFirst: string,
  floorPlans: string[],
  schemeSimpleItemVOS: houseCaseItem[],
  status: number,
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

export function requestHouseCaseCheck(houseId: number) {
  return request.get<{ status: number }>('/em/applet/client/checkScheme?schemeId=' + houseId)
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
