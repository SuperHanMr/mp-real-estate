/*
 * @Description: 公共数据
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:48:27
 * @LastEditTime: 2022-04-07 19:17:55
 * @LastEditors: HanYongHui
 */
import { reactive } from "vue";
type Store = {
  token: string,
  role: number,
  userName: string,
  userId: string,
  avatarUrl: string,
  statusBarHeight: number,

}
const storeData = reactive<Store>(
  {
    token: '',
    userName: '',
    userId: '',
  } as Store
)
export const useUserInfoHooks = () => {
  return {
    storeData
  }
}


