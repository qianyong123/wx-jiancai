<template>
  <div class="moreMessge" >
       <div class="bcg"></div>
       <div class="text">
         <div>楼盘名称</div>
         <div>东九一号</div>
       </div>
       <div class="text">
         <div>开发商</div>
         <div>宜兴市君悦置业有限公司</div>
       </div>
       <div class="bcg"></div>
       <div class="text">
         <div>楼盘状态</div>
         <div>在售</div>
       </div>
       <div class="text">
         <div>参考均价</div>
         <div>15000元/平</div>
       </div>
       <div class="text">
         <div>开盘时间</div>
         <div>2018.09.25</div>
       </div>
       <div class="text">
         <div>交房时间</div>
         <div>2019.09.25</div>
       </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
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
