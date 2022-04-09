import axios, { AxiosInstance, AxiosRequestConfig, } from 'axios'
// @ts-ignore
import buildUrl from "axios/lib/helpers/buildURL";
// @ts-ignore
import settle from 'axios/lib/core/settle'
import { useUserInfoHooks } from "../hoosk/index";
const { storeData } = useUserInfoHooks()
type RequestInfo = {
  config: AxiosRequestConfig;
  resolve: (value: any) => void;
  reject: (value: any) => void;
}
interface BaseResponse<T> {
  code: number
  data?: T
  message: string
}
interface Request {
  get<T>(url: string, params?: object): Promise<BaseResponse<T>>;
  put<T>(url: string, params?: object): Promise<BaseResponse<T>>;
  post<T>(url: string, params?: object): Promise<BaseResponse<T>>;
  delete<T>(url: string, params?: object): Promise<BaseResponse<T>>;
}

function createRequest(baseURL: string): Request {
  console.log("create request baseURL:", baseURL);
  // 创建axios实例
  const service: AxiosInstance = axios.create({
    baseURL: baseURL || "/",
    timeout: 10000,
    withCredentials: true
  })
  function getRequestKey(config: AxiosRequestConfig) {
    return [
      config.method?.toLowerCase(),
      config.url,
      JSON.stringify(config.data),
      JSON.stringify(config.params)
    ].join("--");
  }
  let failRequestList: RequestInfo[] = [];
  let retryMap = new Map();
  function retryAllFailRequest() {
    failRequestList.forEach(info => {
      //每个请求最多重试3次
      let requestKey = getRequestKey(info.config);
      let retryTimes = retryMap.get(requestKey);
      if (!retryTimes) {
        retryTimes = 1;
        retryMap.set(requestKey, retryTimes);
      } else if (retryTimes >= 3) {
        retryMap.delete(requestKey);
        return;
      } else {
        retryMap.set(requestKey, retryTimes + 1);
      }
      service(info.config)
        .then(info.resolve)
        .catch(info.reject);
    });
    failRequestList = [];
  }

  // 请求拦截器
  service.interceptors.request.use(
    config => {
      // 设置登录Token
      const token = uni.getStorageSync('token')
      if (token) {
        (config as any).headers["applet-token"] = token
      }
      return config
    },
    error => {
      console.error("------request-error-----", error);
      return Promise.reject(error)
    }
  )
  // 响应拦截器
  service.interceptors.response.use(
    response => {
      if (response.data.code !== 1) {
        return Promise.reject(response)
      } else {
        console.log("------request-response-----", response);
        if (response.headers["applet-token"]) uni.setStorageSync('token', response.headers["applet-token"])
        return response
      }
    },
    error => {
      console.error("------response-error-----", error);
      // if (error.response.status === 401) {
      //   return new Promise((resolve, reject) => {
      //     failRequestList.push({
      //       config: error.config,
      //       resolve: resolve,
      //       reject: reject
      //     });
      //   })
      // }
      return Promise.reject(error.response);
    }
  )

  const doRequest = <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
    return new Promise((resolve, reject) => {
      service.request<BaseResponse<T>>(config).then(
        res => {
          resolve(res.data)
        },
        err => {
          switch (err.status) {
            case 401:
              // 跳转登录页
              uni.reLaunch({ url: '/pages/login/index' })
              break
            default:
              if (err.data && err.data.message) {
                uni.showToast({
                  title: err.data.message,
                  icon: 'error',
                  mask: true
                })
              } else {
                uni.showToast({
                  title: '系统错误',
                  icon: 'error',
                  mask: true
                })
              }
              break
          }
          reject(err)
        }
      )
    })
  }
  const request: Request = {
    get(url, params?) {
      return doRequest({ url: url, method: 'get', params: params });
    },
    post(url, params?) {
      return doRequest({ url: url, method: 'post', data: params });
    },
    put(url, params?) {
      return doRequest({ url: url, method: 'put', data: params });
    },
    delete(url, params?) {
      return doRequest({ url: url, method: 'delete', data: params });
    }
  }
  return request;
}
axios.defaults.adapter = function (config: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {


    uni.request({
      method: config.method?.toUpperCase() as any,
      url: config.baseURL + buildUrl(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.responseType === 'json' ? 'json' : config.responseType,
      responseType: config.responseType,
      // 是否验证证书
      sslVerify: true,
      complete: function complete(response: any) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          headers: response.header, // 注意此处 单复数
          config: config,
        }
        settle(resolve, reject, response)
      },
    })
  })
}

export default createRequest;