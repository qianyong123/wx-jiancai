 import request from './request'
 import qs from 'qs'
 
 export function getData (url, data, method='GET') {
    return request.request(url, qs.stringify(data),{'method':method})
   }
   //首页
//获取用户id
export const userInfo=(data)=>{
    return request.request(`/user/decodeUserInfo`, qs.stringify(data),{method:'post'})
}
//商品列表
export const commodityList=(data)=>{
    wx.showLoading({title: '加载中...'})
       return request.request(`/product/applets/list`, qs.stringify(data),{method:'get',headers:{nihao:'afsfs'}})
   }
//banner
export const indexBanner=(data)=>{
    return request.request(`/banner/show`, qs.stringify(data),{method:'get',})
}
//搜索商品/search/type
export const searchType=(data)=>{
    wx.showLoading({title: '加载中...'})
    return request.request(`/search/type`, qs.stringify(data),{method:'get',})
}
//关注、取消关注商品
export const productAttention=(data)=>{
    return request.request(`/product/attention`, qs.stringify(data),{method:'post',})
}
//搜索页面所有品牌信息
export const addFindAll=(data)=>{
    return request.request(`/dealer/brandList`, qs.stringify(data),{method:'get',})
}
//商品详情里面的登记信息  送样、预约
export const productDetail=(data)=>{
    return request.request(`/registration/save`, data,{method:'post',})
}



//分类页面列表
export const classSort=(data)=>{
    wx.showLoading({title: '加载中...'})
    return request.request(`/sort`, qs.stringify(data),{method:'get',})
}
//分类页面建材搜索商品列表
export const sortProduct=(data)=>{
    wx.showLoading({title: '加载中...'})
    return request.request(`/sortProduct`, qs.stringify(data),{method:'get',})
}
//服务公司详情
export const serviceCompanyDetail=(data)=>{
    wx.showLoading({title: '加载中...'})
    return request.request(`/serviceCompany/applets/detail/${data.id}`, qs.stringify(data),{method:'get',})
}
//设计公司详情
export const designCompanyDetail=(data)=>{
    wx.showLoading({title: '加载中...'})
    return request.request(`/designCompany/applets/detail/${data.id}`, qs.stringify(data),{method:'get',})
}
//经销商详情
export const dealerDateil=(data)=>{
    wx.showLoading({title: '加载中...'})
    return request.request(`/dealer/applets/detail/${data.id}`, qs.stringify(data),{method:'get',})
}



//社区文章列表
export const articleList=(data)=>{
    wx.showLoading({title: '加载中...'})
    return request.request(`/article/list`, qs.stringify(data),{method:'get',})
}
//文章详情
export const articleDetail=(data)=>{
    wx.showLoading({title: '加载中...'})
    return request.request(`/article/detail/${data.id}`, qs.stringify(data),{method:'get',})
}
//社区房价列表
export const houseList=(data)=>{
    wx.showLoading({title: '加载中...'})
    return request.request(`/house/list`, qs.stringify(data),{method:'get',})
}
//小区详情
export const houseDtail=(data)=>{
    wx.showLoading({title: '加载中...'})
    return request.request(`/house/detail/${data.id}`, qs.stringify(data),{method:'get',})
}


//我的关注商品 openId /incomingInformation/save
export const myAttention=(data)=>{
    wx.showLoading({title: '加载中...'})
    return request.request(`/user/myAttention`, qs.stringify(data),{method:'get',})
}
//申请入驻
export const applyEnter=(data)=>{
    wx.showLoading({title: '保存中...'})
    return request.request(`/incomingInformation/save`, data,{method:'post',})
}