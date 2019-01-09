<template>
  <div class="seek-items">
        <div class="item-img">
            <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
        </div>
        <p class="item-p">{{text.text}}</p>
        <div class="item-amount">
            <div>
              <img class="item-icon" src="/static/Icon/user.jpg" alt="">
                <span>{{text.name}}</span>
            </div>
            <div>
               <img class="item-icon" src="/static/Icon/att1.png" alt="">
              <span>{{text.amount}}</span>
            </div>
        </div>
  </div>
</template>

<script>
export default {
      props: ['text'],
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
        textName(names){
          let text=names
         
          
        }
      }
}
</script>

<style lang="scss">
@import '../../style/base.scss';
    .seek-items{
      width: 174px;
      min-height: 255px;
      background: #fff;
      margin-bottom: 10px;
      font-size: 12px;
      .item-img{
        height: 174px;
        width: 174px;
        background: #ccc;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .item-p{
        width: 100%;
        height: 40px;
        margin-top: 10px;
        line-height: 20px;
        padding:0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item-amount{
        display: flex;
        padding:0 8px;
        justify-content: space-between;
        align-items: center;
        div{
          height: 30px;
          display: flex;      
          justify-content: space-between;
          align-items: center;
        }
        .item-icon{
            width:14px;
            height:14px;
            margin-right:5px;
            
        }
      }
    }
</style>
