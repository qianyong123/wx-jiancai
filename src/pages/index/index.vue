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
            title="热门产品"></i-tab>  
            <i-tab
            v-for="tab in tabsList"
            :key="tab.id"
            @click="changName(tab.name)"
            :title="tab.name"></i-tab>          
        </i-tabs>
    </div>
   <div class="commList">
        <item 
        v-for="item in commList"
        :key="item.id"
        :text="item"></item>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import {
  userInfo,
  commodityList,
  indexBanner
  } from '../../utils/api.js'
import item from '@/components/item'
import card from '@/components/card'

export default {
  data () {
    return {
      indexBanner:'',
      productList:[
        {id:1,img:'/static/tabBar/zhuangxiu.png',text:'装修建材'},
        {id:2,img:'/static/tabBar/gongsi.png',text:'设计公司'},
        {id:3,img:'/static/tabBar/tuandui.png',text:'服务团队'},
        {id:4,img:'/static/tabBar/fengxiao.png',text:'当地经销商'},
      ],
      tabsList:[
        {id:1,name:'选项1'},
        {id:2,name:'选项1'},
        {id:3,name:'选项1'},
        {id:4,name:'选项1'},
        {id:5,name:'选项1'},
        {id:6,name:'选项1'},
        {id:7,name:'选项1'},
        {id:8,name:'选项1'},
        {id:9,name:'选项1'},
        {id:10,name:'选项1'},
      ],
      commList:[
        {id:1,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'1452',pay:'1'},
        ],
      value:'',
      current: '1',
      current_scroll: '0',
      pageNum:1,
      pageSize:10,
      name:''
    }
  },

  components: {
       item
  },
 mounted() {
     console.log('首页2')    
  },
  onLoad () {
    this.getUserInfos();
    //首页banner
    indexBanner().then(res=>{
      console.log('banner',res)   
      if(res.code==200&&res.data!=null){
          this.indexBanner=res.data.imgUrl  
      }
    })
    this.indexList()
  },
  methods: {
    indexList(){
        //首页商品列表
        commodityList({
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        type:'',
        name:this.name
        }).then(res=>{
          console.log('商品列表',res)   
              if(res.code==200&&res.data!=null){
                this.commList=res.data.list              
              }
        })
    },
    //获取用户id
     getUserInfos () {
      // 调用登录接口
      wx.login({
        success: (res1) => {
          // console.log('code',res1)
          wx.getUserInfo({
            success: (res) => {
              // console.log('user',res)openId
              this.userInfo = res.userInfo
              userInfo(
                {code:res1.code,encryptedData:res.encryptedData,iv:res.iv}
              ).then(res=>{
                console.log('用户id',res)
                if(res.code==200&&res.data!=null){
                  wx.setStorageSync('openId',res.data.openId)
                }
              })
            }
          })
        }
      })
    },
    //切换热门产品
       handleChangeScroll (e) {      
        this. current_scroll=e.target.key
        console.log(e.target)
    },
    //点击热门产品
    changName(name){
        console.log(name)
        // this.name=name
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
    console.log('上拉')
    //  wx.showLoading({
    //   title: '玩命加载中',
    // })
    // 隐藏加载框
        wx.hideLoading();
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
}
 


</style>
