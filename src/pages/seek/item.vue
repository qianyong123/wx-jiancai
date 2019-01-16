<template>
  <div class="seek-items" @click="productDetails(text.id)">
       <div class="item-img">
            <img :src="text.imgUrl" alt="">
        </div>
        <p class="item-p">{{text.description}}</p>
        <div class="item-amount">
            <div>
              <img class="item-icon" src="/static/Icon/user.jpg" alt="">
                <span>{{text.name}}</span>
            </div>
            <div @click.stop="$emit('productAttentions',text,index)">
               <img  v-if="text.isAttention==0" class="item-icon" src="/static/Icon/att1.png" alt="">
               <img v-else class="item-icon" src="/static/Icon/att2.png" alt="">
              <span>{{text.attentionCount}}</span>
            </div>
        </div>
  </div>
</template>

<script>
export default {
      props: ['text','index'],
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
      mounted() {
        
      },
      methods: {
          productDetails(id){
            wx.navigateTo({
              url:`../details/main?id=${id}`
            })  
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
