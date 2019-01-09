<template>
<div class="seekFirm">
  <div class="seekFirm-items" v-for="(item, index) in commList" :key="index">
    <div class="seek-logo">
        <div class="item-img">
            <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
        </div>
        <div class="item-name">
            <div class="name">{{item.name}}</div>
            <div class="site">{{item.name}}</div>
        </div>    
    </div>
    <div class="img2-list">
        <div class="item-img2" @click="fimrDetails(1)">
            <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
        </div>
        <div class="item-img2">
            <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
        </div>
        <div class="item-img2">
            <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
        </div>
    </div>  
  </div>
</div>
</template>

<script>
export default {
      props: ['commList'],
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
        texts(){      
            return function(name){
              return 'sda'
            }
        }
      },
      methods: {
        fimrDetails(id){
            console.log('公司id',id)
        }
      }
}
</script>

<style lang="scss">
@import '../../style/base.scss';
.seekFirm{
    width:350px;
    margin:20px auto;
    min-height:300px;
    background: #fff;
    .seekFirm-items{
      padding: 15px;
      width: 100%;
      min-height:150px;
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
          font-size: 16px;
          font-weight: 600;
        }
        .site{
          font-size: 14px;
          color: #ccc;
        }
    }
      .img2-list{
        margin-top: 15px;
        width: 100%;
        height: 97px;
        display: flex;
        justify-content: space-between;
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
