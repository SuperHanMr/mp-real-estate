/*
 * @Description: 公共数据
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:48:27
 * @LastEditTime: 2022-03-31 15:16:26
 * @LastEditors: HanYongHui
 */
import { reactive } from "vue";
type Store = {
  token: string,
  role: string,
  userName: string,
  userId: string,
  avatarUrl: string,
}
const storeData = reactive<Store>(
  {
    token: '',
    role: '',
    userName: '',
    userId: '',
  } as Store
)
export const useUserInfoHooks = () => {
  return {
    storeData
  }
}


