/*
 * @Description: login
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:42:10
 * @LastEditTime: 2022-04-08 14:16:37
 * @LastEditors: HanYongHui
 */
import { reactive, toRefs } from "@vue/reactivity";
import { login, LoginRes, register, RegisterParams } from "../../../api/login";
const data = reactive<{ loginData: LoginRes }>({ loginData: {} as LoginRes })
export const useLoginHooks = () => {
  const requestLogin = async (code: string) => {
    const res = await login(code)
    // data.loginData = res.data as LoginRes
    // console.log('requestLogin', data.loginData)
    return res
  }
  const requestRegister = async (parmas: RegisterParams) => {
    const res = await register(parmas)
    return res
  }
  return {
    ...toRefs(data),
    requestLogin,
    requestRegister,
  }
}
