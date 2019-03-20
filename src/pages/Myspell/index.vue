<template>
  <div class="Myspell" >
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
                 <div>
                    <img src="/static/Icon/spell1.png" alt="">
                    <span class="phone">{{item.existFightGroup}}/{{item.fightGroupCount}}开团</span>
                  </div>
                   
                 
              </div>
              <div class="success" v-if="(item.existFightGroup)==item.fightGroupCount">
                    <img  src="/static/Icon/spell2.png" alt="">
                     
                </div>
                <div class="err" v-else-if="(item.remainingTime)<=0&&(item.existFightGroup)!=item.fightGroupCount">
                    <img  src="/static/Icon/spell3.png" alt="">                    
                </div>  
          </div>
      </div>
      <div v-if="myList.length<1" class="nodata">你还没有拼团的商品</div>
  </div>
</template>

<script>
import {myFight } from '@/utils/api'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      time:0,
       myList:[
        // {id:1,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'2',state:'1'},
        // {id:2,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'2',state:'2'},
        // {id:1,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'2',state:'3'},
        // {id:2,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'2',state:'1'},
        // {id:1,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'2',state:'1'},
        // {id:2,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'2',state:'1'},
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
    let openId=wx.getStorageSync('openId')
    if(openId){
         myFight({openId}).then(res=>{
          console.log('我的拼团',res)
          if(res.code==200&&res.data!=null){
            let list=res.data          
            this.myList=list
            }
        })
    }
    
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
    .Myspell{
      width: 100%;
       .nodata{
        height: 100px;
        width: 100%;
        text-align: center;
        line-height: 100px;
        font-size: 14px;
        color: #ccc;
      }
      .item{
        height: 100px;
        width: 348px;
        margin:0 auto;
        border-bottom: 1px solid #F8F8F8;;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        position: relative;
      }
      .imgs{
        position: relative;
        width: 70px;
        height: 70px;
        background: #ccc;
        img{
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        }
      }
      .detail{
        width: 268px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        .success{
              width: 68px;
              height: 68px;
              position: absolute;
              top: 4px;
              right:0px;
              img{
                width: 68px;
              height: 68px;
              }
            }
             .err{
              width: 68px;
              height: 68px;
              position: absolute;
              top: 4px;
              right:0px;
               img{
                width: 68px;
              height: 68px;
              }
            }
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
                color: #FFB039;
            }
            
           
          }
          
        }
      }
    }
</style>
