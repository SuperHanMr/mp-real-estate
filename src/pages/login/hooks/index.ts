/*
 * @Description: login
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:42:10
 * @LastEditTime: 2022-04-12 14:32:04
 * @LastEditors: HanYongHui
 */
import { reactive, toRefs } from "@vue/reactivity";
import { login, LoginRes, register, RegisterParams, queryBrowseRecord } from "../../../api/login";
const data = reactive<{ loginData: LoginRes }>({ loginData: {} as LoginRes })
export const useLoginHooks = () => {
  const requestLogin = async (code: string) => {
    const res = await login(code)
    return res
  }
  const requestRegister = async (parmas: RegisterParams) => {
    const res = await register(parmas)
    return res
  }

  const requsetBrowseRecord = async () => {
    const res = await queryBrowseRecord()
    return res
  }
  return {
    ...toRefs(data),
    requsetBrowseRecord,
    requestLogin,
    requestRegister,
  }
}
