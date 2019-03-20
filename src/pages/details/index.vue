<template>
  <div class="details" >
      <div class="imgBanner">
        <img :src="product.imgUrl" alt="">
          <div class="spell" v-if="isgroup==0">
            <div class="spell2">
                <div class="spellImg">
                  <div>
                    <img src="/static/Icon/spell4.png" alt="">
                  </div>
                  <div>{{product.fightGroupCount}}人团</div>
                </div>             
                <div style="font-weight: 600;">{{product.existFightGroup==null?0:product.existFightGroup}}/{{product.fightGroupCount}}开团</div>
            </div>
            <div class="spellTime">
              <p>距离拼团结束还剩：</p>
              <p style="margin-top:8px;">
                  <span style="margin-right:3px">{{time1}}</span>
                  天
                  <span style="margin-left:3px">{{time2}}</span>：
                  <span>{{time3}}</span>：
                  <span>{{time4}}</span>
              </p>
            </div>
          </div>        
      </div>
      <div class="state">
          <div class="state-name">{{product.name}}</div>
          <div v-if="product.flag==1" class="attention" @click="attentions(product.flag)">
              <img src="/static/Icon/myspell1.png" alt="">
              <span>关注</span>
          </div>
          <div @click="attentions(product.flag)" v-else class="attention">
              <img src="/static/Icon/myspell2.png" alt="">
              <span>已关注</span>
          </div>
      </div>
      <div class="songyang">免费送样</div>
      <div class="bcg"></div>
      <div class="pinpai">
          <div class="pinpai-box"> 
              <span class="title">品牌</span>
              <span>{{product.brand}}</span>
          </div>
          <div class="pinpai-box"> 
              <span class="title">环保指数</span>
              <span>{{product.up}}</span>
          </div>
          <div class="pinpai-box">  
              <span class="title">重量</span>
              <span>{{product.weight}}</span>
          </div>
      </div>
      <div class="bcg"></div>
      <div class="product">
        <div class="product-box">
            <div class="logo">
              <img :src="dealer.brandLogo" alt="">
            </div>
            <div class="nameBox">
                <div>
                    <span class="product-name">{{dealer.name}}</span>
                    <span class="merchant">总经销商</span>
                </div>
                <div>
                    <span v-for="(item,index) in dealerLabel" 
                    :key="index" class="product-type">{{item}}</span>           
                </div>
            </div>
        </div>   
        <div class="product-details">
            <img src="/static/Icon/map2.png" alt="">
            <span class="site">地址：</span>
            <span>{{dealer.address}}</span>
            <span @click="navMap(longitude,latitude)" class="seekMap">查看地图</span>
        </div>
        <div class="product-details">
            <img src="/static/Icon/time.png" alt="">
            <span class="site">营业时间：</span>
            <span>{{dealer.startDate}}-{{dealer.endDate}}</span>
        </div>
        <div class="product-details">
            <img src="/static/Icon/phone.png" alt="">
            <span class="site">商家电话：</span>
            <span>{{dealer.phone}}</span>
        </div>     
      </div>
      <div class="oncePsellBox">
          <div class="delivery">
            <span class="apply" @click="handleClose(1)">申请送样</span>
            <span class="order" @click="handleClose(2)">免费预约</span>
          </div>
          <div v-if="product.existFightGroup!=product.fightGroupCount">
            <div class="oncePsell" v-if="isgroup==0" @click="handleClose(3)">立即拼团</div>
          </div>
      </div>
      
      <i-modal :title="modalTiele1" :visible=" visible1 " @ok="handleClose1(1)" @cancel="handleClose1(2)">
        <view class="handleCloses">
            <img src="/static/Icon/phone4.png" alt="">
            <div class="inputs">
              <input v-model="input" type="number" placeholder="输入电话号码,我们将为你回电服务">
            </div>
        </view>
    </i-modal>
  </div>
</template>

<script>
import {getData,productDetail,productAttention} from '../../utils/api.js'
import { clearInterval, setInterval } from 'timers';

export default {
  data () {
    return {
      visible1:false,
      isattentions:1,
      openId:'',
      title:'',
      input:'',
      modalTiele1:'',
      longitude:'1562', //经度
      latitude:'56461', //经度
      product:{},//商品详情
      data:{},
      dealer:{},//经销商信息
      dealerLabel:[],
      remainingTime:[],
      isgroup:1,
      time1:0,
      time2:0,
      time3:0,
      time4:0,
      time5:30,
      id:0,
      time:null,
    }
  },

  components: {
    
  },
 onLoad(){  
      let data=this.$root.$mp.query  
      this.data=data
      let openId=wx.getStorageSync('openId')
      if(openId){
          this.openId=openId
      }   
      if(data.id){
        this.id=data.id
         this.getDatas() 
      }
  },
  methods: {
    
    //获取详情
    getDatas(){
      this.dealer={}
      this.product={}
      this.dealerLabel=[]
      this.remainingTime=[]
        let times=new Date().getTime()
        getData(`/product/detail`,{id:this.id,openId:this.openId}).then(res=>{
          console.log('商品详情',res)
          if(res.code==200&&res.data!=null){
                this.product=res.data.product
                this.dealer=res.data.dealer
                if(res.data.dealerLabel!=null){
                    if(res.data.dealerLabel.length>4){
                      this.dealerLabel=res.data.dealerLabel.slice(0,4)
                    }else{
                       this.dealerLabel=res.data.dealerLabel
                    }
                }
                if(this.product.isFightGroup==0&&this.product.remainingTime!=0){
                  let remainingTime=this.product.remainingTime.split('-')
                  this.time1=Number(remainingTime[0])
                  this.time2=Number(remainingTime[1])
                  this.time3=Number(remainingTime[2])
                  this.time4=Number(remainingTime[3])
                }
                if(this.product.isFightGroup==0&&this.product.remainingTime!='0'){
                    console.log(this.product.startTime-times)
                    if(this.product.startTime>times){
                        this.isgroup=1
                      }
                      else{
                      this.isgroup=0
                      let times=setInterval(()=>{
                          if(this.time4==0){                                                 
                            if(this.time1==0&&this.time2==0&&this.time3==0){
                              this.time4==0                         
                              return
                            }                           
                            else if(this.time3==0){
                              if(this.time2==0){
                                  if(this.time1==0){
                                    this.time4==0                                 
                                    return
                                  }else{
                                    this.time1=this.time1-1
                                    this.time2=23
                                    this.time3=59
                                    this.time4=59
                                  }
                              }else{
                                this.time2=this.time2-1
                                this.time3=59
                                this.time4=59
                              }
                              
                             
                            }else{
                              this.time3=this.time3-1
                              this.time4=59
                            }                          
                          }else {                       
                        
                            this.time4--                          
                          }
                         
                        },1000)
                      } 
                  }else{
                      return this.isgroup=1
                    }
              }else{
                 wx.showToast({
                  title: '获取商品信息失败',
                  icon: 'none',
                  duration:2000
                })
              }
        })
    },
    handleClose(id){
      this.visible1=true
      if(id==1){
        this.modalTiele1='申请送样'
      }
      else if(id==2){
        this.modalTiele1='免费预约'
      }
      else if(id==3){
        this.modalTiele1='立即拼团'
      }
    },
    //关注
    attentions(id){
      console.log(id)
       this.product.flag=id==0?1:0
      productAttention({
        flag:id==0?1:0,
        id:this.data.id,
        openId :this.openId 
      }).then(res=>{
        console.log('关注',res)
      })
    },
    handleClose1(index){
      let phone=/^1[34578]\d{9}$/ //手机
      if(index==1){
        if(this.input==''){
                wx.showToast({
              title: '号码不能为空！',
              icon: 'none',
              duration:2000
            })
        }
        else if(!phone.test(this.input)){
              wx.showToast({
              title: '号码输入有误！',
              icon: 'none',
              duration:2000
            })
        }
        else{
            productDetail({
              businessPhone:this.dealer.phone,
              name:this.product.name,
              phone:this.input,
              openId:this.openId,
              productId:this.data.id,
              type:'建材-'+`${this.modalTiele1}`
            }).then(res=>{
              console.log('登记信息',res)
                this.visible1=false
              if(res.code==200&&res.msg=='成功'){ 
                this.getDatas() 
                wx.showToast({
                    title: this.modalTiele1+'成功',
                    icon: 'success',
                    duration: 1500
                  })
              }else{
                    wx.showToast({
                    title:res.msg,      
                    duration: 1500
                  })
              }
            })
        }
        
      }else{
           this.visible1=false
      }
    },
    //查看点图
    navMap(long,lat){
        console.log(long,lat)
        wx.navigateTo({
          url:`../map/main?gps=${ this.dealer.gps}`
      })
    }
  },
  mounted() {
 
  },
 
  onShow(){
   
      
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/base.scss';
.details{
    width:100%;
    height: 100%;
    
    div{
      box-sizing: border-box;
    }
    .bcg{
        width: 100%;
        height: 10px;
        background: #F8F8F8;
    }
    .imgBanner{
      width:375px;
      height: 375px;
      background: #ccc;
      position: relative;
      img{
        width:100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .spell{
        width: 100%;
        height: 55px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #28D591;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        font-size: 16px;
        .spell2{
          min-width: 90px;
          height: 55px;
          display: flex;
          align-items: center;
        }
        .spellTime{
          font-size: 12px;
          min-width: 130px;
          text-align: center;
          span{
            display: inline-block;
            width: 21px;
            height: 18px;
            text-align: center;
            line-height: 18px;
            background: #fff;
            color: $color;
          }
        }
        .spellImg{
            width: 90px;
            display: flex;
            height: 23px;
            border: 1px solid #fff;
            align-items: center;
            border-radius: 3px;
            margin-right: 10px;
            div:nth-child(1){
              width: 30px;
              height: 23px;            
              background: #fff;
              position: relative;
               img{
                 position: absolute;
                 top:0px;
                 left:5px;
                width: 17px;
                height: 21px;
              }
            }
            div:nth-child(2){
              width: 60px;
              line-height: 23px;
              text-align: center;
            }
        
        }
      }
    }
    .state{
      width: 100%;
      min-height:50px;
      padding:15px 10px;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      .state-name{
        width:298px;
        height:50px;
        font-size: 16px;
        line-height: 20px;
        // font-weight:600;
        overflow: hidden;
      }
      .attention{
        width: 57px;
        height: 22px;
        font-size: 12px;
        color: #1DB389;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:11px 0 0 11px;
        background: #DDF4ED;
        margin-left: 10px;
        img{
          width: 13px;
          height: 11px;
          margin-right: 5px;
        }
      }
    }
    .songyang{
      width: 60px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border: 1px solid #FFDB63;
      color: #FFDB63;
      font-size: 12px;
      // padding:2px 5px;
      margin-left: 10px;
      border-radius: 4px;
      margin-bottom: 10px;
    }
    .pinpai{
      width: 100%;
      padding:0 10px;
      font-size: 14px;
      .pinpai-box{
        height: 45px;
        display: flex;
        align-items: center;
        .title{
          color: #999999;
          width: 100px;
        }
      }
    }
    .product{
      margin-top: 20px;
      padding:0 10px;
      margin-bottom:140px;
      .product-box{
          height: 52px;
          display: flex;
          font-size: 12px;
          margin-bottom: 20px;
          .logo{
            width: 52px;
            height: 52px;
            position: relative;
            background: #ccc;
            margin-right: 20px;
            img{
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
          .nameBox{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .product-name{
              font-size: 16px;
              font-weight: 600;
              margin-right: 10px;
            }
            .merchant{
              padding:1px 4px;
              border-radius: 3px;
              background: #71D0B5;
              color: #fff;
            }
            .product-type{
              padding:1px 4px;
              border-radius: 3px;
              background: #DDF4ED;
              color: #71D0B5;
              margin-right: 10px;
            }
          }
      }
      .product-details{
        height:20px;
        font-size: 12px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        position: relative;
        img{
          width:12px;
          height: 15px;
        }
        .site{
          color: #999999;
          margin:0 5px;
        }
        .seekMap{
          position: absolute;
          right: 10px;
          top: 3px;
          color: #118EE9;
        }
      }
    }
    .oncePsellBox{
      width:288px;
      position: fixed;
      bottom:10px;
      left: 0;
      right: 0;
      margin: auto;
      .delivery{
        width:288px;
        height: 40px;
        // position: fixed;
        // bottom:20px;
        // left: 0;
        // right: 0;
        font-size: 14px;
        color: #fff;
        margin-bottom: 20px;
        .apply,.order{
          display:inline-block;
          height: 40px;
          width: 50%;
          text-align: center;
          line-height: 40px;
        }
        .apply{
          background: #FFA61F;
          border-radius:20px 0 0 20px;
        }
        .order{
          background: #FF8257;
          border-radius:0 20px 20px 0;
        }
      }
        .oncePsell{
        width: 288px;
        height: 40px;
        text-align:center;
        line-height: 40px;
        background: #FF8E34;
        color: #fff;
        border-radius:20px;
        // margin-top:20px;
      }
    }
    
  
    .handleCloses{
      height: 45px;
      width:90%;
      border: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:0 10px;
      box-sizing: border-box;
      margin:20px auto;
      img{
        width: 14px;
        height: 21px;
      }
      .inputs{
        flex: 1;
        padding:0 10px;
        font-size: 12px;
      }
    }
}
</style>
