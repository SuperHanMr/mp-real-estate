/*
 * @Description: 公共数据
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:48:27
 * @LastEditTime: 2022-04-19 14:39:38
 * @LastEditors: HanYongHui
 */
import { reactive } from "vue";
type Store = {
  loginCode: string,
  isRegister: number,
  token: string,
  role: number,
  userName: string,
  userId: string,
  avatarUrl: string,
  statusBarHeight: number,
  consultantId: number,
  consultantPhoneNum: string,
  // 是否登录
  isLogin: boolean,
  // 用户浏览的楼盘详情Id
  estateId: number,
}
const storeData = reactive<Store>(
  {
    token: '',
    userName: '',
    userId: '',
    role: -1,
    isLogin: false,
    estateId: 0,
  } as Store
)
export const useUserInfoHooks = () => {
  return {
    storeData
  }
}


export function switchHome(message?: string) {
  uni.showModal({
    title: '提示',
    content: message,
    showCancel: false,
    success: () => {
      let pages = getCurrentPages()
      if (pages.length < 2) {
        uni.switchTab({
          url: '/pages/home/index'
        });
      } else {
        uni.navigateBack({
          delta: 1
        })
      }
    }
  })
}

