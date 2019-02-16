<template>
  <div class="my" >
      <!-- 需要使用 button 来授权登录 -->
      <view class='content'>
        <view>申请获取以下权限</view>
        <text>获得你的公开信息(昵称，头像等)</text>
    </view>

    <button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">
        授权登录
    </button>
  </div>
</template>

<script>
import {getData,userInfo} from '../../utils/api.js'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo:null,
      code:'',
      userInfo:null,
      list:[
        {id:1,name:'申请成为入驻商',imgUrl:'/static/Icon/shang.png'},
        {id:2,name:'我的关注',imgUrl:'/static/Icon/my2.png'},
        {id:3,name:'我的拼团',imgUrl:'/static/Icon/spell1.png'},
      ]
    }
  },

  components: {
    
  },
  onLoad(){

      
  },
  methods: {
    bindGetUserInfo(e){
      console.log('用户信息',e)
      if(e.mp.detail.userInfo){  
          // 调用登录接口
      wx.login({
        success: (res1) => {
              wx.setStorageSync('userInfo',e.mp.detail.userInfo)
              userInfo(
                {code:res1.code,encryptedData:e.mp.detail.encryptedData,iv:e.mp.detail.iv}
              ).then(res=>{
                console.log('用户id',res)
                if(res.code==200&&res.data!=null){
                  wx.setStorageSync('openId',res.data.openId)                
                  wx.switchTab({
                      url: '/pages/index/main'  
                  })
                }
              })  
         }
      })
        
        
      }else {
            //用户按了拒绝按钮
            wx.showModal({
                title:'警告',
                content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel:false,
                confirmText:'返回授权',
                success:function(res){
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    } 
                }
            })
        }
    },
    myMessge(id){
      if(id==1){
        wx.navigateTo({
          url: '../register/main'
        })
      }
      else if(id==2){
          wx.navigateTo({
          url: '../Myattention/main'
        })
      }
       else if(id==3){
          wx.navigateTo({
          url: '../Myspell/main'
        })
      }
    }
  },

  created () {

  }
}
</script>

<style lang="scss" scoped>
.my{
  width: 100%;
  height: 100%;
  padding-top: 50px;
  .header {
    margin: 90rpx 0 90rpx 50rpx;
    text-align: center;
    width: 650rpx;
    height: 300rpx;
    line-height: 450rpx;
}

.header image {
    width: 200rpx;
    height: 200rpx;
}

.content {
    margin-left: 50rpx;
    margin-bottom: 90rpx;
}

.content text {
    display: block;
    color: #9d9d9d;
    margin-top: 40rpx;
}

.bottom {
    border-radius: 80rpx;
    margin: 70rpx 50rpx;
    font-size: 35rpx;
}

}



</style>
