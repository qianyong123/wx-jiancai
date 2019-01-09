 import request from './request'
 import qs from 'qs'
 
 export function getData (url, data, method='GET') {
    return request.request(url, qs.stringify(data),{'method':method})
   }
   //首页
//商品列表
export const commodityList=(data)=>{
       return request.request(`/product/list`, qs.stringify(data),{method:'get',headers:{nihao:'afsfs'}})
   }
//banner
export const indexBanner=(data)=>{
    return request.request(`/banner/show`, qs.stringify(data),{method:'get',})
}