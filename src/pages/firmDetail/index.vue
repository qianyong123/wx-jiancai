<template>
  <div class="firmDetail" >
      <div class="banner">
        <img class="bannerImg" src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
          <div class="firmDetail-phone">
            <div class="product">
              <div class="product-box">
                  <div class="logo"></div>
                  <div class="nameBox">
                      <div>
                          <span class="product-name">奥普吊顶</span>
                          <!-- <span class="merchant">总经销商</span> -->
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
              <div class="phone2" @click="PhoneCall">
                  <img src="/static/Icon/phone2.png" alt="">
                  <span>13562145621</span>
              </div>               
            </div>
          </div>
      </div>
      <div v-if="detailType==3" class="hostBox">
          <div class="hostProuct">主营产品</div>
          <div class="hostProuct-box">
              <div class="hostProuct-item" v-for="(item,index) in ProuctList" :key="index">
                  <div class="item-img">
                      <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
                  </div>
                  <div>{{item.name}}</div>
              </div>
          </div>
          <div class="brandDetail">品牌介绍</div>
          <div>
            <div class="item-img brandLogo">
                <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
            </div>
            <div class="brand-details">品牌介绍品牌介绍品牌介绍品牌品牌介绍品牌介绍品牌介绍介绍品牌介绍品牌介绍品牌介绍品牌介绍品牌介绍品牌介绍牌</div>
          </div>
      </div>

     <div v-if="detailType==1" class="hostBox">
          <div class="hostProuct">装修案例</div>
          <div class="hostProuct-box">
              <div class="hostProuct-item" v-for="(item,index) in ProuctList" :key="index">
                  <div class="item-img">
                      <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
                  </div>
                  <div style="margin-top:10px;">
                      <div style="color:#000;font-size:16px;"> {{item.name}}</div>
                      <div style="font-size:14px;">150㎡/三室两厅</div>
                  </div>
              </div>
          </div>
          <div class="brandDetail" style="margin-top:10px;">设计团队</div>
          <div style="display: flex;">
              <div class="userName">
                  <img class="userImg" src="/static/Icon/user.jpg" alt="">
                  <div>设计师</div>
                  <div style="font-size:14px;color:#666681;">5年设计经验</div>
              </div>
              <div class="userName">
                  <img class="userImg" src="/static/Icon/user.jpg" alt="">
                  <div>设计师</div>
                  <div style="font-size:14px;color:#666681;">5年设计经验</div>
              </div>
          </div>
          <div class="brandDetail" style="margin-top:30px;">施工团队</div>
          <div style="display: flex;">
              <div class="userName road">
                  <img class="userImg" src="/static/Icon/user.jpg" alt="">
                  <div>设计师</div>                
              </div>
              <div class="userName road">
                  <img class="userImg" src="/static/Icon/user.jpg" alt="">
                  <div>设计师</div>                
              </div>
          </div>
      </div>
      <div v-if="detailType==2" class="hostBox">
          <div class="hostProuct">服务列表</div>
           <div class="hostProuct-box">
              <div class="hostProuct-item" v-for="(item,index) in ProuctList" :key="index">
                  <div class="item-img">
                      <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
                  </div>
                  <div style="margin-top:10px;">
                      <div style="color:#000;font-size:16px;"> {{item.name}}</div>
                      <div style="font-size:14px;">￥150㎡</div>
                  </div>
              </div>
          </div>
          <div class="brandDetail">服务团队</div>
           <div style="display: flex;">
              <div class="userName road">
                  <img class="userImg" src="/static/Icon/user.jpg" alt="">
                  <div>设计师</div>                
              </div>
              <div class="userName road">
                  <img class="userImg" src="/static/Icon/user.jpg" alt="">
                  <div>设计师</div>                
              </div>
          </div>
      </div>
      <div class="delivery">
          <span class="apply" @click="handleClose(1)">免费预约</span>
          <span class="order" @click="handleClose(2)">为我报价</span>
      </div>
      <i-modal style="80%" :title="modalTiele1" :visible=" visible1 " @ok="handleClose1" @cancel="handleClose1">
        <view class="handleCloses">
            <img src="/static/Icon/phone4.png" alt="">
            <input 
            class="inputs"
            v-model="input"
             type="number"     
              placeholder="输入电话号码,我们将为你回电">
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
      detailType:'2',
      design:{},//设计馆
      serve:{},//服务馆
      sell:{},//经销商馆
      ProuctList:[//主营产品
        {id:1,imgUrl:'',name:'吊顶'},
        {id:1,imgUrl:'',name:'吊顶'},
        {id:1,imgUrl:'',name:'吊顶'},
        {id:1,imgUrl:'',name:'吊顶'},
      ],
      longitude:'113.324520', //经度
      latitude:'23.099994', //经度
    }
  },

  components: {
    
  },

  methods: {
    handleClose(id){
      this.visible1=true
      if(id==1){
        this.modalTiele1='免费预约'
      }else{
        this.modalTiele1='为你报价'
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
          url:`../map/main?name=${'江阳大道'}&longitude=${this.longitude}&latitude=${this.latitude}`
      })
    },
    //拨打电话
    PhoneCall(){
      wx.makePhoneCall({
        phoneNumber: '1340000' // 仅为示例，并非真实的电话号码
      })
    }
  },
  mounted() {
 
  },
  onShow(){
    let data=this.$root.$mp.query
    this.detailType=data.type
    console.log(data)
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';

</style>
