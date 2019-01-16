<template>
  <div class="register" >
       <div class="bcg"></div>
       <div class="text">
         <div>入驻类型</div>
         <div>
           <input v-model="input1" placeholder="入驻类型" focus />
         </div>
       </div>
       <div class="text">
         <div>公司名称</div>
         <div>
           <input  v-model="input2" placeholder="公司名称"/>
         </div>
       </div>
       <div class="bcg"></div>
       <div class="text">
         <div>公司位置</div>
          <div>
           <input  v-model="input3" placeholder="公司位置"/>
         </div>
       </div>
       <div class="text">
         <div>联系人</div>
          <div>
           <input  v-model="input4" placeholder="联系人"/>
         </div>
       </div>
       <div class="text">
         <div>联系手机</div>
          <div>
           <input  v-model="input5" placeholder="13666666666"/>
         </div>
       </div>
       <div class="text">
         <div>公司座机</div>
          <div>
           <input  v-model="input6" placeholder="021-88888888"/>
         </div>
       </div>
       <div class="btn-register" @click="oNregister">申请入驻</div>
  </div>
</template>

<script>
import {applyEnter} from '../../utils/api.js'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      input1:'',
      input2:'',
      input3:'',
      input4:'',
      input5:'',
      input6:'',
    }
  },
  onShow(){
    this.input1=''
    this.input2=''
    this.input3=''
    this.input4=''
    this.input5=''
    this.input6=''
  },
  components: {
    
  },

  methods: {
   oNregister(){
     console.log(this.input1,this.input2,this.input3,this.input4,this.input5,this.input6)
     let phone=/^1[34578]\d{9}$/,//手机
        phone2=/0\d{2,4}-\d{7,8}/;//座机
     if(this.input1==''||this.input2==''||this.input3==''||this.input4==''||this.input5==''||this.input6==''){
          wx.showToast({
        title: '申请信息不能为空',
        icon: 'none',
        duration:1500
      })
     }
    else if(!phone.test(this.input5)){
        wx.showToast({
        title: '手机号码格式不对！',
        icon: 'none',
        duration:1500
      })
     }
     else if(!phone2.test(this.input6)){
        wx.showToast({
        title: '座机号码格式不对！',
        icon: 'none',
        duration:1500
      })
     }
     else{
       applyEnter({
         companyAddress:this.input3,
         companyLandline:this.input6,
         companyName:this.input2,
         contact:this.input4,
         contactPhone:this.input5,
         type:this.input1
       }).then(res=>{
         console.log('申请成功',res)
         if(res.code==200&&res.msg=='成功'){
              wx.showToast({
                title: '申请成功',
                icon: 'success',
                duration: 1500
              })
              // setTimeout(()=>{
              //   wx.switchTab({
              //     url: '/pages/my/main'
              //   })
              // },1500)
         }
          
       })
      
      
     }
     
   }
  },
  mounted() {
    
  },
  onLoad(){
    let data=this.$root.$mp.query
    console.log(data)
    if(data.key==2){    
        wx.setNavigationBarTitle({
          title:data.name,
          success: function() {
            console.log('setNavigationBarTitle success')
          },
          fail: function(err) {
            console.log('setNavigationBarTitle fail, err is', err)
          }
        })
    }
 

  }
}
</script>

<style lang="scss" scoped>
  .register{
    width: 100%;
    .bcg{
      width: 100%;
      height: 10px;
      background:#F8F8F8;
    }
    .text{
      width:330px;
      height: 40px;
      margin:0 auto;
      // padding:0 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      border-bottom: 1px solid #F8F8F8;
      overflow: hidden;
      div:nth-child(1){
        width: 100px;
        color: #ccc;
         font-size: 16px;
      }
      div:nth-child(2){
        flex: 1;
        
      }
    }
    .btn-register{
      width:330px;
      height: 48px;
      margin:30px auto;
      text-align: center;
      line-height: 48px;
      background: #30B993;
      color: #fff;
      border-radius: 6px;     
    }
  }
</style>
