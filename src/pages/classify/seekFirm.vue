<template>
<div class="classFirm">
  <div  class="seekFirm-items" v-for="(item, index) in commList" :key="index" @click="fimrDetails(item)">
    <div class="seek-logo">
        <div class="item-img">
            <!-- <img :src="item.imgUrl" alt=""> -->
        </div>
        <div class="item-name">
            <div class="name">
              <div>{{item.name}}</div>
              <!-- <div>
                <div class="tabs">保洁</div>
              </div> -->
            </div>
            <div class="site">{{item.address}}</div>
        </div>    
    </div>
    <div class="img2-list" v-if="item.imgList.length>0">
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
</div>
</template>

<script>
export default {
      props: ['commList','type'],
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
              url:`../firmDetail/main?name=${item.name}&type=${this.type}&id=${item.id}`
            }) 
        },
        //点击商品跳转到搜索页面
        // onComm(item){
        //   wx.navigateTo({
        //       url:`../seek/main?name=${item.name}&type=${this.type}&id=${item.id}`
        //     })
        // }
      }
}
</script>

<style lang="scss">
@import '../../style/base.scss';
.classFirm{
    width:235px;
    background: #fff;
    .seekFirm-items{
      padding: 10px;
      width: 100%;
      min-height:50px;
      background: #fff;
      margin-bottom:20px;
      font-size: 14px; 
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-bottom:1px solid #F8F8F8;
    .seek-logo{
      display: flex;
       .item-img{
        height: 42px;
        width:42px;
        position: relative;
        margin-right: 10px;
        background: #ccc;
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
        .name{
          width: 100%;
          height:18px;
          display: flex;
          align-items: center;
          line-height:18px;
          font-size: 16px;
          font-weight: 600;
          white-space : normal;
          overflow:hidden;
          text-overflow: ellipsis;
          .tabs{
            height: 16px;
            width: 30px;
            margin-left: 10px;
            font-size: 12px;
            color: #fff;
            line-height: 16px;
            text-align: center;
            background: #FFBD5B;
            border: 1px solid #FFBD5B;
            border-radius:2px;
          }
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
        width: 100%;
        min-height: 65px;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
      .item-img2{
        width: 65px;
        height: 65px;
        position: relative;
        background: #ccc;
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
