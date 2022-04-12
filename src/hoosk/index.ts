/*
 * @Description: 公共数据
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:48:27
 * @LastEditTime: 2022-04-12 10:51:27
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
  isLogin: boolean,

}
const storeData = reactive<Store>(
  {
    token: '',
    userName: '',
    userId: '',
    role: 2,
    isLogin: false,
  } as Store
)
export const useUserInfoHooks = () => {
  return {
    storeData
  }
}


