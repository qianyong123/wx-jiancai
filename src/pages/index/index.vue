<template>
  <div class="index" >
    <div class="index-top">
        <div class="sousuo">        
          <div class="sousuo-input"  @click="seekInput">
              <i-icon class="icon" type="search" size="18" color="#BBBBAA"/>
              <div style="color:#BBBBAA;">你想找什么？</div>
          </div>
        </div>
        <img :src="indexBanner" alt="">
    </div>
    <div class="product-type" @click.stop="indextype">
        <div class="product-item" v-for="item in productList" :key="item.id">
            <img style="width:100rpx;height:100rpx;" :src="item.img" alt="">
            <div style="margin-top:10px;">{{item.text}}</div>
        </div>
    </div>
    <div class="tabs">
        <i-tabs :current="current_scroll" color="#1DB389" scroll @change="handleChangeScroll">
          <i-tab
            key="0"
            title="热销产品"
             @click="changName('',0,0)"></i-tab>  
            <i-tab
            v-for="tab in tabsList"
            :key="tab.id"
            @click="changName(tab.name,1,tab.id)"
            :title="tab.name"></i-tab>          
        </i-tabs>
    </div>
   <div v-if="total>0" class="commList">
        <item 
        v-for="(item,index) in commList"
        :key="index"
        @productAttentions='productAttentions'
        :index='index'
        :text="item"></item>
    </div>
    <div v-else class="nodata">没有数据</div>
    <div v-if="noProduct" class="noProduct">亲，没有更多了！</div>
  </div>
</template>

<script>
import qs from 'qs'
import {
  userInfo,
  commodityList,
  indexBanner,
  productAttention,
  findProductType
  } from '../../utils/api.js'
import item from '@/components/item'
import card from '@/components/card'
import { setInterval, clearInterval } from 'timers';

export default {
  data () {
    return {
      indexBanner:'',
      noProduct:false,//没有更多了
      productList:[
        {id:1,img:'/static/tabBar/zhuangxiu.png',text:'装修建材'},
        {id:2,img:'/static/tabBar/gongsi.png',text:'设计公司'},
        {id:3,img:'/static/tabBar/tuandui.png',text:'服务团队'},
        {id:4,img:'/static/tabBar/fengxiao.png',text:'当地经销商'},
      ],
      tabsList:[
        {id:1,name:'选项1'},
        {id:2,name:'选项2'},
        {id:3,name:'选项3'},
        {id:4,name:'选项4'},
        {id:5,name:'选项5'},
        {id:6,name:'选项6'},
        {id:7,name:'选项7'},
        {id:8,name:'选项8'},
        {id:9,name:'选项9'},
        {id:10,name:'选项10'},
      ],
      commList:[
        // {id:1,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'1452',pay:'1'},
        ],
      value:'',
      code:'',
      current: '1',
      current_scroll: '0',
      isHot:0,
      pageNum:1,
      pageSize:10,
      name:'',
      openId:'',
      total:2,
      time:''
    }
  },

  components: {
       item
  },
 mounted() {
     console.log('首页2')    
  },
  onLoad () {
    this.commList=[]
    this.getUserInfos();
    // let userInfo=wx.getStorageSync('userInfo')
    // if(userInfo){
    //       this.userInfo=userInfo
    // }
    // this.time=setInterval(()=>{
    //   if(this.pageSize==0){
    //     clearInterval(this.time)
    //     return
    //   }
    //     console.log(this.pageSize--)
    // },1000)
    //首页banner
    indexBanner().then(res=>{
      console.log('banner',res)   
      if(res.code==200&&res.data!=null){
          this.indexBanner=res.data 
      }
    })
    findProductType().then(res=>{
      console.log('热门商品导航',res)
      if(res.code==200&&res.data!=null){
          this.tabsList=res.data
      }
    })
  },
  onShow(){
    this.commList=[]
    if(this.openId!=''){
      this.indexList()
     }else{
      let openId=wx.getStorageSync('openId') 
      if(openId){
        this.openId=openId
        this.indexList() 
        console.log('1')
      } 
      
     }
    // else{
    // //     let user= wx.getStorageSync('userInfo')
    // //     if(user){
    // //       this.userInfo=user.userInfo
    // //       userInfo(
    // //         {code:this.code,encryptedData:user.encryptedData,iv:user.iv}
    // //       ).then(res=>{
    // //         console.log('用户id',res)
    // //         if(res.code==200&&res.data!=null){
    // //           wx.setStorageSync('openId',res.data.openId)
    // //           this.openId=res.data.openId         
    // //         }
    // //       })
    // //     }
    //  }
  
  },
  methods: {
    indexList(){
        //首页商品列表
        commodityList({
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        type:this.name,
        productType:this.name,
        isHot:this.isHot,
        // name:this.name,
        // isHotL:this.current_scroll,
        openId:this.openId
        }).then(res=>{
          console.log('商品列表',res)   
              if(res.code==200&&res.data!=null){
                let list=res.data.list
                list.forEach((data,index)=>{
                  if(data.description.length>20){
                    list[index].description=data.description.slice(0,20)+'...'
                  }
                })
                this.commList=this.commList.concat(list)  
                 this.total=res.data.total
                 this.pageNum=this.pageNum+1
                 console.log('commList',this.commList)
              }
        })
    },
    //关注商品、取消
    productAttentions(text,index){
      console.log(text,index)
      productAttention({
        flag:text.flag==1?0:1,
        id:text.id,
        openId :this.openId 
      }).then(res=>{
        console.log('关注、取消商品',res)
        if(res.code==200&&res.msg=='成功'){
            let amount=text.attentionCount
            this.commList[index].attentionCount=text.flag==1?amount+1:amount-1
            this.commList[index].flag=text.flag==1?0:1
            // this.commList=[]
            // this.pageNum=1
            // this.indexList()
            if(text.flag==0){
                wx.showToast({
                title: '关注成功',
                icon: 'success',
                duration: 2000
              })
            }else{
                  wx.showToast({
                title: '取消关注',
                icon: 'success',
                duration: 2000
              })
            }
            
         
        }
      })
    },
    //获取用户id
     getUserInfos () {
        // 调用登录接口
      wx.login({
        success: (res1) => {
          console.log('code',res1)
          this.code=res1.code  
              wx.getSetting({
              success:(res2)=>{
                console.log('授权',res2)
              if (res2.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: (res2) => {
                    console.log('user',res2)
                    this.userInfo = res2.userInfo
                      wx.setStorageSync('userInfo',res2.userInfo)
                         userInfo(
                        {code:res1.code,encryptedData:res2.encryptedData,iv:res2.iv}
                      ).then(res=>{
                        console.log('用户id',res)
                        if(res.code==200&&res.data!=null){                    
                          wx.setStorageSync('openId',res.data.openId)
                          this.openId=res.data.openId

                          if(this.commList.length<1){
                            this.commLis=[]
                            this.indexList()
                          }
                        }
                      })  
                  }
                })
              }else{         
                  wx.navigateTo({
                    url:`../accredit/main`
                  })
              }
            }
          })  
          
        }
      })
    
     
    },
    //切换热门产品
       handleChangeScroll (e) {      
        this. current_scroll=e.target.key
        this.pageNum=1
        console.log(e.target)
    },
    //点击热门产品
    changName(name,isHot,id){
      this. current_scroll=id
        console.log(name)
        this.commList=[]
        this.name=name
        this.isHot=isHot
        this.noProduct=false
        this.indexList()
    },
    //跳转到搜索页面
    seekInput(){
      wx.navigateTo({
        url:`../seek/main`
      })
    },
     //点击分类类型
    indextype(){
      console.log('fellei')
        wx.switchTab({
          url: '/pages/classify/main'
        })
    },
  },
  onPullDownRefresh(){
    console.log('下拉')
     // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
  },
  onReachBottom(){
    let page=Math.ceil(this.total/10)
    console.log('上拉',page)
    if(this.pageNum>page){
      console.log('没有数据了')
      this.noProduct=true
      return
    }else{
        this.indexList()     
        console.log('4')   
    }
  },
 
}
</script>

<style lang="scss" scoped>
@import '../../style/base.scss';
.index{
    .color{
      color:$color;
    }
    .index-top{
      width: 100%;
      height: 190px;
      background: #ccc;  
      padding: 20px 0;
      position: relative;
      img{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .sousuo{
        width: 335px;
        min-height: 40px;
        margin:0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        position: relative;
        z-index: 100;
        .sousuo-input{
          flex: 1;
          display: flex;
          align-items: center;
          .icon{
            margin:0 10px;
          }      
        }
      }
    }
    .product-type{
        width: 100%;
        min-height: 66px;
        display: flex;
        padding:0 10px;
        // box-sizing: border-box;
        .product-item{
          flex: 1;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 20px 0;
        }
    }
    .tabs{
      width: 100%;
      padding-left: 10px;
    }
    .commList{
      margin-top: 15px;
      width: 100%;
      min-height:300px;
      padding: 10px;
      background: #F4F7FA;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .noProduct{
      height: 40px;
      width: 100%;
      text-align: center;
      line-height: 40px;
      color: #ccc;
      font-size: 14px;
    }
    .nodata{
      margin-top: 70px;
      width: 100%;
      font-size: 16px;
      text-align: center;
      color: #ccc;
    }
}
 


</style>
