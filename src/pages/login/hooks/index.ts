/*
 * @Description: login
 * @Author: HanYongHui
 * @Date: 2022-03-31 11:42:10
 * @LastEditTime: 2022-04-07 19:14:36
 * @LastEditors: HanYongHui
 */
import { login, LoginRes, register, RegisterParams } from "../../../api/login";

export const useLoginHooks = () => {

  const requestLogin = async (code: string) => {
    return login(code)
  }
  const requestRegister = async (parmas: RegisterParams) => {
    const res = await register(parmas)
    return res
  }

  return {
    requestLogin,
    requestRegister,
  }
}
