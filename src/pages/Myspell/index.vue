<template>
  <div class="Myspell" >
      <div class="item" v-for="(item,index) in myList" :key="index" @click="details(item)">
          <div class="imgs">
            <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
          </div>
          <div class="detail">
              <div class="item-text">{{item.text}}</div>
              <div class="item-name">
                  <div>
                      <img src="/static/Icon/user.jpg" alt="">
                      <span>{{item.name}}</span>
                  </div>
                  <div v-if="item.state==1">
                    <img src="/static/Icon/spell1.png" alt="">
                      <span class="phone">{{item.amount}}/5开团</span>
                  </div>
                  <div v-else-if="item.state==2">
                    <img class="success" src="/static/Icon/spell2.png" alt="">
                     
                  </div>
                  <div v-else-if="item.state==3">
                    <img class="err" src="/static/Icon/spell3.png" alt="">                    
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
       myList:[
        {id:1,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'2',state:'1'},
        {id:2,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'2',state:'2'},
        {id:1,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'2',state:'3'},
        {id:2,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'2',state:'1'},
        {id:1,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'2',state:'1'},
        {id:2,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'2',state:'1'},
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
          url: `../details/main?name=${item.name}&id=${item.id}`
        })
    }
  },
  mounted() {
    
  },
  onLoad(){
    
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
      .imgs{
        position: relative;
        width: 70px;
        height: 70px;
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
            .success{
              width: 68px;
              height: 68px;
              position: absolute;
              top: 4px;
              right:0px;
            }
            .err{
              width: 68px;
              height: 68px;
              position: absolute;
              top: 4px;
              right:0px;
            }
          }
          
        }
      }
    }
</style>
