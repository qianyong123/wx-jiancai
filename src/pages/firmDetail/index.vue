<template>
  <div class="firmDetail" >
      <div class="banner">

        <img class="bannerImg" :src="dealer.backgroundImgUrl" alt="">
          <div class="firmDetail-phone">
            <div class="product">
              <div class="product-box">
                  <div class="logo">
                      <img :src="dealer.brandLogo" alt="">
                  </div>
                  <div class="nameBox">
                      <div>
                          <span class="product-name">{{dealer.name}}</span>
                          <!-- <span class="merchant">总经销商</span> -->
                      </div>
                      <div>
                          <span
                           v-for="(item,index) in label" 
                           :key="index"
                           class="product-type">{{item}}</span>
                          <!-- <span class="product-type">龙骨</span> -->
                      </div>
                  </div>
              </div>   
              <div class="product-details">
                  <img src="/static/Icon/map2.png" alt="">
                  <span class="site">地址：</span>
                  <span>{{dealer.address}}</span>
                  <span @click="navMap(dealer.address,dealer.gps)" class="seekMap">查看地图</span>
              </div>
              <div class="product-details">
                  <img src="/static/Icon/time.png" alt="">
                  <span class="site">营业时间：</span>
                  <span>{{dealer.startDate}}-{{dealer.endDate}}</span>
              </div>
              <div class="phone2" @click="PhoneCall">
                  <img src="/static/Icon/phone2.png" alt="">
                  <span>{{dealer.phone}}</span>
              </div>               
            </div>
          </div>
      </div>
      <div v-if="detailType==3" class="hostBox">
          <div class="hostProuct">主营产品</div>
          <div class="hostProuct-box">
              <div class="hostProuct-item" v-for="(item,index) in data.dealerProductList" :key="index">
                  <div class="item-img">
                      <img :src="item.imgUrl" alt="">
                  </div>
                  <div>{{item.productName}}</div>
              </div>
          </div>
          <div class="brandDetail">品牌介绍</div>
          <div>
            <div class="item-img brandLogo">
                <img :src="data.dealer.brandLogo" alt="">
            </div>
            <div class="brand-details">{{data.dealer.brandDescription}}</div>
          </div>
      </div>

     <div v-if="detailType==1" class="hostBox">
          <div class="hostProuct">装修案例</div>
          <div class="hostProuct-box">
              <div class="hostProuct-item" v-for="(item,index) in data.decorationCaseList" :key="index">
                  <div class="item-img">
                      <img :src="item.caseImg" alt="">
                  </div>
                  <div style="margin-top:10px;">
                      <div style="color:#000;font-size:16px;"> {{item.caseName}}</div>
                      <div style="font-size:12px;">{{item.caseDescription}}</div>
                  </div>
              </div>
          </div>
          <div class="brandDetail" style="margin-top:10px;">设计团队</div>
          <div style="display: flex;">
              <div class="userName" v-for="(item,index) in data.designTeamList" :key="index">
                  <img class="userImg" src="/static/Icon/user.jpg" alt="">
                  <div> {{item.personnel}}</div>
                  <div style="font-size:12px;color:#666681;"> {{item.description}}</div>
              </div>
          </div>
          <div class="brandDetail" style="margin-top:30px;">施工团队</div>
          <div style="display: flex;">
              <div class="userName" v-for="(item,index) in data.constructionTeamList" :key="index">
                  <img class="userImg" src="/static/Icon/user.jpg" alt="">
                  <div>{{item.personnel}}</div> 
                    <div style="font-size:12px;color:#666681;">{{item.description}}</div>               
              </div>
              
          </div>
      </div>
      <div v-if="detailType==2" class="hostBox">
          <div class="hostProuct">服务列表</div>
           <div class="hostProuct-box">
              <div class="hostProuct-item" v-for="(item,index) in data.serviceLists" :key="index">
                  <div class="item-img">
                      <img :src="item.serviceImgUrl" alt="">
                  </div>
                  <div style="margin-top:10px;">
                      <div style="color:#000;font-size:16px;"> {{item.serviceName}}</div>
                      <div style="font-size:12px;">{{item.serviceDescription}}</div>
                  </div>
              </div>
          </div>
          <div class="brandDetail">服务团队</div>
           <div style="display: flex;">
              <div class="userName" v-for="(item,index) in data.serviceTeamList" :key="index">
                  <img class="userImg" src="/static/Icon/user.jpg" alt="">
                  <div>{{item.servicePersonnel}}</div>  
                  <div style="font-size:12px;color:#666681;">{{item.serviceDescription}}</div>              
              </div>           
          </div>
      </div>
      <div class="delivery">
          <span class="apply" @click="handleClose(1)">免费预约</span>
          <span class="order" @click="handleClose(2)">为我报价</span>
      </div>
      <i-modal style="80%" :title="modalTiele1" :visible=" visible1 " @ok="handleClose1(1)" @cancel="handleClose1(2)">
        <view class="handleCloses">
            <img src="/static/Icon/phone4.png" alt="">
            <input 
            class="inputs"
            v-model="input"
             type="number"     
              placeholder="输入电话号码,我们将为你回电服务">
        </view>
    </i-modal>
  </div>
</template>

<script>
import {
    getData,
    productDetail,
    serviceCompanyDetail,
    designCompanyDetail,
    dealerDateil
} from '../../utils/api.js'

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
      dealer:{},
      label:[],
      data:{},
      data2:{},
      typeNmae:'',
      brandName:''
    }
  },

  components: {
    
  },
  onReady(){
      
  },
 onLoad(){
    let data=this.$root.$mp.query
    if(data.type){
        this.detailType=data.type
        this.data2=data
        if(data.type==1){
            this.typeNmae='设计'
            designCompanyDetail({id:data.id}).then(res=>{
                console.log('设计公司',res)  
                  if(res.code==200&&res.data!=null){
                    this.data=res.data
                    this.brandName=res.data.dealer.name
                    this.dealer=res.data.dealer
                    this.label=res.data.label
                      if(res.data.label!=null){
                            if(res.data.label.length>4){
                            this.label=res.data.label.slice(0,4)
                            }else{
                           this.label=res.data.label
                            }
                        }
                       wx.setNavigationBarTitle({
                        title:  this.brandName,
                        success: function() {
                            console.log('setNavigationBarTitle success')
                        },        
                        })
                }
            })
        }
        else if(data.type==2){
            this.typeNmae='服务'
            serviceCompanyDetail({id:data.id}).then(res=>{
                console.log('服务公司',res)
                  if(res.code==200&&res.data!=null){
                    this.data=res.data
                    this.brandName=res.data.dealer.name
                    this.dealer=res.data.dealer
                    this.label=res.data.serviceLabel
                      if(res.data.serviceLabel!=null){
                            if(res.data.serviceLabel.length>4){
                            this.label=res.data.serviceLabel.slice(0,4)
                            }else{
                           this.label=res.data.serviceLabel
                            }
                        }
                       wx.setNavigationBarTitle({
                        title:this.brandName,
                        success: function() {
                            console.log('setNavigationBarTitle success')
                        },        
                        })
                }
            })
        }
        else if(data.type==3){
            this.typeNmae='经销商'
            dealerDateil({id:data.id}).then(res=>{
                console.log('经销商公司',res)
                if(res.code==200&&res.data!=null){
                    this.data=res.data
                    this.dealer=res.data.dealer
                    this.label=res.data.dealerLabel
                    this.brandName=res.data.dealer.name
                      if(res.data.dealerLabel!=null){
                            if(res.data.dealerLabel.length>4){
                            this.label=res.data.dealerLabel.slice(0,4)
                            }else{
                           this.label=res.data.dealerLabel
                            }
                        }
                       wx.setNavigationBarTitle({
                        title: this.brandName,
                        success: function() {
                            console.log('setNavigationBarTitle success')
                        },        
                        })
                }
            })
        }
    }
    
    console.log(data)
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
     handleClose1(index){
       console.log(this.input)
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
            businessPhone:this.data.dealer.phone,
            name: this.brandName,
            phone:this.input,
            type:`${this.typeNmae}-${this.modalTiele1}`
            }).then(res=>{
                console.log('登记信息',res)
                this.visible1=false
                if(res.code==200&&res.msg=='成功'){
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
    navMap(address,gps){
        wx.navigateTo({
          url:`../map/main?name=${address}&gps=${gps}`
      })
    },
    //拨打电话
    PhoneCall(){
      wx.makePhoneCall({
        phoneNumber:this.data.dealer.phone // 仅为示例，并非真实的电话号码
      })
    }
  },
  mounted() {
 
  },
 
}
</script>

<style lang="scss" scoped>
@import './style.scss';

</style>
