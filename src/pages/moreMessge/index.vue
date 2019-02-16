<template>
  <div class="moreMessge" >
       <div class="bcg"></div>
       <div class="text">
         <div>楼盘名称</div>
         <div>{{data.name}}</div>
       </div>
       <div class="text">
         <div>开发商</div>
         <div>{{data.developer}}</div>
       </div>
       <div class="bcg"></div>
       <div class="text">
         <div>楼盘状态</div>
         <div>{{data.status}}</div>
       </div>
       <div class="text">
         <div>参考均价</div>
         <div>{{data.price}}元/平</div>
       </div>
       <div class="text">
         <div>开盘时间</div>
         <div>{{data.date}}</div>
       </div>
       <div class="text">
         <div>交房时间</div>
         <div>{{data.payDate}}</div>
       </div>
  </div>
</template>

<script>
import store from '../counter/store.js'
export default {
  data () {
    return {
      motto: 'Hello World',
      data:{}
    }
  },

  components: {
    
  },

  methods: {
   
  },
  mounted() {
    
  },
  onLoad(){
    let data=this.$root.$mp.query
    this.data=store.state.data
    console.log('更多信息',store.state.data)
    if(data.key==2){    
        wx.setNavigationBarTitle({
          title:this.data.name,
          success: function() {
            console.log('setNavigationBarTitle success')
          },
         
        })
    }
 

  }
}
</script>

<style lang="scss" scoped>
  .moreMessge{
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
      align-items: center;
      font-size: 14px;
      border-bottom: 1px solid #F8F8F8;
      div:nth-child(1){
        width: 100px;
        color: #ccc;
      }
    }
  }
</style>
