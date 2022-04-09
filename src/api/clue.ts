import createRequest from "../utils/create-request"
const baseURL = import.meta.env.VITE_URL_BASE_API
const request = createRequest(baseURL as string)
export type ClueBrowerlistInfo = {
  page: number,
  rows: number,
  totalPage: number,
  totalRows: number,
  list: BrowerList
}
export type BrowerList = BrowerItem[]
export type BrowerItem = {
  id: number, //主键",
  userId: number, //浏览用户的id",
  userNickName: string, //浏览用户的昵称",
  phoneNum: string,  //浏览用户的手机号",
  consultantId: number, //分享页面的销售顾问的id",
  consultantName: string, //销售顾问姓名",
  consultantPhoneNum: string, //销售顾问手机号",
  estateId: number, //楼盘id",
  estateName: string, //楼盘名称",
  houseTypeId: number, //户型id",
  houseTypeName: number, //户型名称",
  schemeId: number,  //方案id",
  schemeName: string,  //方案名称",
  coverImg: string, //封面图片",
  browseTime: number,//浏览时间"
}

export type SignupParams = {
  page: number,
  rows: number,
  consultantId?: number,//销售顾问id
  userId?: number,//用户id
  type: number,//查询入口 （1-业务后台，2-小程序）
  estateId: number,//若为业务后台，需要添加此字段 全部楼盘传0，具体楼盘传具体id即可
}


export type SignupRecordListInfo = {
  page: number,
  rows: number,
  totalPage: number,
  totalRows: number,
  list: SignupRecordList
}

export type SignupRecordList = SignupRecordItem[]
export type SignupRecordItem = {
  id: number, //主键id,
  signNo: string, //报名编号,
  userId: number, //报名用户id,
  userNickName: string, //用户昵称,
  userPhoneNum: string, //用户手机号,
  consultantId: number, //销售员id,
  consultantName: string, //销售员姓名,
  consultantPhoneNum: string, //销售员手机号,
  schemeSnapshot: string, //报名方案快照,
  offerPrice: number,//报价,
  estateId: number, //楼盘id,
  estateName: string, //楼盘id,
  houseTypeId: number, //户型id,
  houseTypeName: string, //户型id,
  schemeId: number, //方案id,
  schemeName: string, //方案名称,
  coverImg: string, //方案封面图,
  signTime: number, //报名时间

}

export type SignupRecordDetail = {
  EffectSpace: [{
    spaceName: {
      spaceName: string //空间名称
    },
    effectImages: [{
      effectImageUrl: string //效果图地址
    }],
    designIdeas: {
      designIdeasContext: string //设计思路
    }
  }],
  productBagVOS: [{
    productBagName: {
      productBagName: string //输入不超过15个字符
    },
    buyItNow: {
      buyItNow: number //输入两位小数数字
    },
    bagDesc: {
      bagPackageDesc: string //套包简介
    },
    spuInfoVOS: [{
      createDate: Number //创建时间,
      skuInfoVOList: [{
        skuImageUrl: string //【商品SKU图】取【商品SKU图】,
        skuId: number //【SKUID】取商品【SKUID】,
        skuAttribute: string //【SKU属性】取商品销售规格中 SKU属性拼接,
        baseStateInfo: {
          code: number,
          stateDesc: string
        },
        minByCount: string //最小起购数量,
        unitStr: string //销售单位,
        salePrice: string //销售价
      }],
      baseStateInfo: {
        code: number //1：& 2：,
        stateDesc: string
      },
      spuImageUrl: string //【商品图】取【商品SPU缩略图】,
      spuName: string //【商品名称】取【商品名称】,
      categoryName: string //【商品品类】取商品品类【品类名称】,
      brandName: string //【品牌】取商品关联品牌【品牌名称】,
      supplierName: string //【供应商】取商品关联供应商【供应商名称】，无显示--,
      storeName: string //所属店铺】取商品关联店铺【店铺名称】
    }]
  }],
  planeImages: string[] //平面图,
  houseTypeImageUrls: string[] //户型图,
  coverPictureInfoVO: {
    coverImageUrl: string,
    designIdeas: string
  },
  houseWithSchemeInfo: {
    bedroomNum: number //室,
    livingroomNum: number //厅,
    kitchenNum: number //厨,
    toiletNum: number //卫,
    direction: string //朝向,
    floorArea: number //建筑面积,
    floorAreaInside: number //套内面积,
    status: number //状态(0 删除 1启用 2停用),
    houseTypeName: string //户型名称,
    specification: string //规格(三室一厅一厨一卫.....)
  },
  schemeTags: [{
    schemeTagName: string //方案标签名称,
    tagCode: string //方案code码值
  }],
  schemeName: string //方案名称
}




// 浏览列表接口
export function getClueBrowerList(params: any) {
  return request.get<ClueBrowerlistInfo>(`/em/applet/browseRecord/list`, params)
}
//报名列表接口
export function getSignupRecordList(params: SignupParams) {
  return request.get<SignupRecordListInfo>(`/em/applet/signUpRecord/list`, params)
}

//报名详情接口
export function getSignupRecordDetail(id: number) {
  return request.get<SignupRecordDetail>(`/em/applet/signUpRecord/detail/${id}`)
}