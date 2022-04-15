/*
 * @Description: 公共数据
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:48:27
 * @LastEditTime: 2022-04-15 11:37:31
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
    role: 2,
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
  uni.showToast({
    title: message,
    icon: "error",
    mask: true,
  });
  setTimeout(() => {
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
  }, 1000)
}

