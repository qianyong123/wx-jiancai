<template>
<scroll-view scroll-y @scrolltolower="$emit('onload',2)" class="seekFirm">
  <div  class="seekFirm-items" v-for="(item, index) in commList" :key="index" @click="fimrDetails(item)">
    <div class="seek-logo">
        <div class="item-img">
            <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
        </div>
        <div class="item-name">
            <div class="name">{{item.name}}</div>
            <div class="site">{{item.address}}</div>
        </div>    
    </div>
    <div class="img2-list" v-if="item.imgList!=null&&item.imgList.length>0">
         <div class="item-img2" v-for="(item2,index2) in item.imgList" :key="index2">
            <img :src="item2" alt="">
        </div>
        <!-- <div class="item-img2">
            <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
        </div>
        <div class="item-img2">
            <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
        </div> -->
    </div>  
  </div>
</scroll-view>
</template>

<script>
export default {
      props: ['commList','oncommType'],
      imgList:[
        {id:1,img:'http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png'},
        {id:2,img:'http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png'},
        {id:3,img:'http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png'},
      ],
      data () {
        return {
          name:'sdsd'
        }
      },
      computed: {
      
      },
      methods: {
        fimrDetails(item){
            console.log('公司item',item)
            wx.navigateTo({
              url:`../firmDetail/main?name=${item.name}&type=${this.oncommType-1}&id=${item.id}`
            }) 
        },
        // onload(){
        //   console.log('加载下一页')
        // }
      }
}
</script>

<style lang="scss">
@import '../../style/base.scss';
.seekFirm{
    width:350px;
    height:100%;
    margin:20px auto;
    background: #fff;
    .seekFirm-items{
      padding: 15px;
      width: 100%;
      min-height: 50px;     
      background: #fff;
      margin-bottom: 20px;
      font-size: 14px; 
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    .seek-logo{
      display: flex;
       .item-img{
        height: 50px;
        width:50px;
        position: relative;
        margin-right: 15px;
        img{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
    .item-name{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        .name{
          width: 100%;
          height:18px;       
          line-height:18px;
          font-size: 16px;
          font-weight: 600;
          white-space : normal;
          overflow:hidden;
          text-overflow: ellipsis;
        }
        .site{
           height:16px;
          line-height: 16px;
          width: 100%;
          font-size: 14px;
          color: #ccc;
          white-space : normal;
          overflow:hidden;
          text-overflow: ellipsis;
        }
    }
      .img2-list{
        margin-top: 15px;
        width: 100%;
        height: 97px;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
      }
      .item-img2{
        width: 97px;
        height: 97px;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }  
     }
   
}
   
</style>
