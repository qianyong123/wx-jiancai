<template>
  <div class="my" >
      <div class="my-top">
          <div class="myImg">
              <img :src="userInfo.avatarUrl" alt="">
          </div>
          <div>{{userInfo.nickName}}</div>
      </div>
      <div class="my-list" v-for="item in list" :key="item.id">
        <div class="list-left">
            <img class="img" :src="item.imgUrl" alt="">
            <span>{{item.name}}</span>
        </div>
        <i-icon type="enter" size="28" color="#eeeeee"/>
      </div>
  </div>
</template>

<script>
import {getData} from '../../utils/request.js'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      list:[
        {id:1,name:'申请成为入驻商',imgUrl:'/static/Icon/shang.png'},
        {id:2,name:'我的关注',imgUrl:'/static/Icon/my2.png'},
      ]
    }
  },

  components: {
    
  },
  onLoad(){
      // 调用登录接口avatarUrl nickName
      wx.login({
        success: (res1) => {
          // console.log('code',res1)
          wx.getUserInfo({
            success: (res) => {
               console.log('user',res)
              this.userInfo = res.userInfo         
            }
          })
        }
      })
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
 
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
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
  .my-top{
    height: 100px;
    display: flex;
    align-items: center;
    border-bottom:10px solid #F8F8F8;
    padding:0 20px;
    color: #33335A;
    font-weight: 600;
    font-size: 16px;
    .myImg{
      width: 61px;
      height: 61px;
      position: relative;
      margin-right: 20px;
     
      img{
        height:100%;
        width: 100%;
         border-radius:50%;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  .my-list{
    width: 100%;
    height: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #F8F8F8;
    padding:0 10px;
    font-size: 14px;
    color: #333;
    box-sizing: border-box;
    .list-left{
      height: 100%;
      min-width: 100px;
      display: flex;
      align-items: center;
    }
    .img{
      width: 21px;
      height: 19px;
      margin-right: 10px;
    }
  }
}



</style>
