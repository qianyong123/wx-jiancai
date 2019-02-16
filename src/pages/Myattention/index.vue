<template>
  <div class="Myattention" >
      <div class="item" v-for="(item,index) in myList" :key="index" @click="details(item)">
          <div class="imgs">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="detail">
              <div class="item-text">{{item.description}}</div>
              <div class="item-name">
                  <div>
                      <img src="/static/Icon/user.jpg" alt="">
                      <span>{{item.dealerName}}</span>
                  </div>
                  <div @click.stop="PhoneCall(item.phone)">
                    <img src="/static/Icon/phone2.png" alt="">
                      <span class="phone">{{item.phone}}</span>
                    </div>
              </div>
          </div>
      </div>
      <div v-if="myList.length<1" class="nodata">你还没有关注的商品</div>
  </div>
</template>

<script>
import {myAttention} from '../../utils/api.js'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
       myList:[
        // {id:1,dealerName:'宜兴马克瓷砖',description:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',phone:'1356666666',pay:'1'},
       ]
    }
  },

  components: {
    
  },

  methods: {
      //拨打电话
    PhoneCall(phone){
      wx.makePhoneCall({
        phoneNumber:phone // 仅为示例，并非真实的电话号码
      })
    },
    //查看详情
    details(item){
        wx.navigateTo({
          url: `../details/main?id=${item.id}`
        })
    }
  },
  mounted() {
    
  },
  onLoad(){
   let openId= wx.getStorageSync('openId')
    myAttention({
      openId
    }).then(res=>{
      console.log('我的关注',res)
      if(res.code==200&&res.data!=null){         
          let list=res.data
          list.forEach((data,index)=>{
            if(data==null){
                list.splice(index,1)
              }
            else if(data.description.length>30){
              list[index].description=data.description.slice(0,30)+'...'
            }
          })
          this.myList=list
      }
    })
  },
   onReachBottom(){
    console.log('上拉')
    //  wx.showLoading({
    //   title: '玩命加载中',
    // })
    // 隐藏加载框
        // wx.hideLoading();
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/base.scss';
    .Myattention{
      width: 100%;
      .item{
        height: 100px;
        width: 348px;
        margin:0 auto;
        border-bottom: 1px solid #F8F8F8;;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
      }
      .nodata{
        height: 100px;
        width: 100%;
        text-align: center;
        line-height: 100px;
        font-size: 14px;
        color: #ccc;
      }
      .imgs{
        position: relative;
        width: 70px;
        height: 70px;
        background: #ccc;
        border-radius:4px;
        img{
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          border-radius:4px;
        }
      }
      .detail{
        width: 268px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-text{
          width: 100%;
          height: 40px;
          line-height: 20px;
          overflow: hidden;
        }
        .item-name{
          height: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          div{
            display: flex;
            align-items: center;
            img{
              width: 18px;
              height: 18px;
              margin-right:6px;
            }
            .phone{
                color: $color;
            }
          }
          
        }
      }
    }
</style>
