<template>
  <div class="details" >
      <div class="img">

      </div>
      <div class="state">
          <div class="state-name">奥普（AUPU）浴霸QDP6626B集成吊顶大功率风暖浴霸 智能触摸开关 8cm薄</div>
          <!-- <div class="attention">
              <img src="" alt="">
              <span>关注</span>
          </div> -->
      </div>
      <div class="bcg"></div>
      <div class="pinpai">
          <div class="pinpai-box"> 
              <span class="title">品牌</span>
              <span>奥普</span>
          </div>
          <div class="pinpai-box"> 
              <span class="title">环保指数</span>
              <span>高</span>
          </div>
          <div class="pinpai-box">  
              <span class="title">重量</span>
              <span>2.5kg</span>
          </div>
      </div>
      <div class="bcg"></div>
      <div class="product">
        <div class="product-box">
            <div class="logo"></div>
            <div class="nameBox">
                <div>
                    <span class="product-name">奥普吊顶</span>
                    <span class="merchant">总经销商</span>
                </div>
                <div>
                    <span class="product-type">吊顶</span>
                    <span class="product-type">龙骨</span>
                </div>
            </div>
        </div>   
        <div class="product-details">
            <img src="/static/Icon/map2.png" alt="">
            <span class="site">地址：</span>
            <span>宜兴市巷头西路298号</span>
            <span @click="navMap(longitude,latitude)" class="seekMap">查看地图</span>
        </div>
        <div class="product-details">
            <img src="/static/Icon/time.png" alt="">
            <span class="site">营业时间：</span>
            <span>09:00-20:00</span>
        </div>
        <div class="product-details">
            <img src="/static/Icon/phone.png" alt="">
            <span class="site">商家电话：</span>
            <span>13612345678</span>
        </div>     
      </div>
      <div class="delivery">
          <span class="apply" @click="handleClose(1)">申请送样</span>
          <span class="order" @click="handleClose(2)">免费预约</span>
      </div>
      <i-modal :title="modalTiele1" :visible=" visible1 " @ok="handleClose1" @cancel="handleClose1">
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
import {getData} from '../../utils/api.js'

export default {
  data () {
    return {
      visible1:false,
      title:'',
      input:'',
      modalTiele1:'',
      longitude:'1562', //经度
      latitude:'56461', //经度
    }
  },

  components: {
    
  },

  methods: {
    handleClose(id){
      this.visible1=true
      if(id==1){
        this.modalTiele1='申请送样'
      }else{
        this.modalTiele1='免费预约'
      }
    },
    handleClose1(){
      this.visible1=false
      console.log(this.input)
    },
    //查看点图
    navMap(long,lat){
        console.log(long,lat)
        wx.navigateTo({
          url:`../map/main`
      })
    }
  },
  mounted() {
 
  },
  onShow(){
    let data=this.$root.$mp.query
    console.log(data)
      getData(`/product/detail/${data.id}`).then(res=>{
        console.log('商品详情',res)
      })
  }
}
</script>

<style lang="scss" scoped>
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
    .img{
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
    }
    .state{
      width: 100%;
      min-height:50px;
      padding:15px 10px;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      .state-name{
        width:100%;
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
        border-radius:4px;
        background: #DDF4ED;
      }
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
      margin-bottom:80px;
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
    .delivery{
      width: 300px;
      height: 40px;
      position: fixed;
      bottom:20px;
      left: 0;
      right: 0;
      margin:auto;
      font-size: 14px;
      color: #fff;
      
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
        font-size: 14px;
      }
    }
}
</style>
