var Fly = require("flyio/dist/npm/wx")
const request=new Fly()
// 配置请求基地址
// request.config.baseURL =` http://94.191.13.156:8080/api`
request.config.baseURL =`http://192.168.2.109:8080/api`

import qs from 'qs'

request.interceptors.request.use(
    (request) => {
      // 给所有请求添加自定义header
    //   request.headers['token'] = wx.getStorageSync('token')
      request.headers['token'] ='dfdf54654'
      // request.headers['content-type']='application/x-www-form-urlencoded'
      // wx.showLoading({title: '加载中...'})
      return request
    }
   )
   
   request.interceptors.response.use(
    (response, promise) => {
      wx.hideLoading()
      return promise.resolve(response.data)
    },
    (err, promise) => {
      wx.hideLoading()
      // wx.showToast({
      //   title: err.response.data.msg,
      //   icon: 'none'
      // })
      return promise.resolve()
    }
   )
   
   /***
   * 请求数据
   * @param url
   * @param data
   * @param method
   * @returns {FlyPromise<any>}
   */
  export default request
  
  
