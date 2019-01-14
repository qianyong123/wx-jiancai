<template>
  <div class="articleDetail" >
      <div class="articleDetail-banner">
            <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
      </div>
      <div class="details">
          <div class="title">这六类新房办不了房产证，想装修都不能，千万不能去碰！</div>
          <div class="type">
            <span class="type-color">房天下</span>
            <span class="time">2018-01-20 18:54</span>
          </div>
          <div class="main">
            <p class="p1">办理房产证的时候要注意下办理的方法，很多的朋友们在办理房产证的时候，对于房产证的办理方法不太了解，有些房屋其实是不能办理房产证的，如果买房子的时候不注意，买到了这样的房屋那就意味着你没有房产证。今天给大家介绍几种不能办理房产证的房屋，无论再想买房都不要去买。</p>
            <p class="p2">一、哪六类新房办不了房产证？</p>
            <p class="p3">没有产权证的房子，无论多想买也要慎重，免得买不成房子还惹一身麻烦。下面六类房子不能办产权证：</p>
            <div class="p4">
                <p>1、利用集体所有土地开发的项目（小产权房）；</p>
                <p>2、未取得规划审批的；</p>
                <p>3、未验收或者验收不合格的；</p>
                <p>4、土地或房屋未解除抵押的；</p>
                <p>5、土地或房屋被查封的；</p>
            </div>          
          </div>
        
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
    // this.detailType=data.type
    console.log(data)
  }
}
</script>

<style lang="scss" scoped>
  .articleDetail{
    width: 100%;
    .articleDetail-banner{
      width: 100%;
      height: 220px;
      background: #ccc;
      position: relative;
      img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .details{
      width: 348px;
      margin: 20px auto;
    }
    .title{
      font-size: 18px;
      font-weight: 600;
      line-height: 24px;
      margin-bottom: 10px;
    }
    .type{
      margin-bottom: 20px;
      font-size: 14px;
      .type-color{
        color: #1689E9;
        margin-right: 20px;
      }
      .time{
        color: #ccc;
      }
    }
    .main{
      font-size: 14px;
      line-height: 20px;
      .p1{
        text-indent:28px;       
        margin: 10px 0;
      }
      .p2,.p3{
        margin-bottom: 20px;
      }
      .p4{
        p{
         margin-bottom: 20px;
        }
      }
    }
  }
</style>
