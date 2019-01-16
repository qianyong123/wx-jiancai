<template>
  <div class="articleDetail" >
      <div class="articleDetail-banner">
            <img :src="data.imgUrl" alt="">
      </div>
      <div class="details">
          <div class="title">{{data.title}}</div>
          <div class="type">
            <span class="type-color">{{data.createBy}}</span>
            <span class="time">{{data.date}}</span>
          </div>
          <div class="main">
            <p class="p1">{{data.content}}</p>
            <!-- <p class="p2">一、哪六类新房办不了房产证？</p>
            <p class="p3">没有产权证的房子，无论多想买也要慎重，免得买不成房子还惹一身麻烦。下面六类房子不能办产权证：</p>
            <div class="p4">
                <p>1、利用集体所有土地开发的项目（小产权房）；</p>
                <p>2、未取得规划审批的；</p>
                <p>3、未验收或者验收不合格的；</p>
                <p>4、土地或房屋未解除抵押的；</p>
                <p>5、土地或房屋被查封的；</p>
            </div>           -->
          </div>
        
      </div>
  </div>
</template>

<script>
import {articleDetail} from '../../utils/api.js'
export default {
  data () {
    return {
      motto: 'Hello World',
      data: {}
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
    if(data.id){
      articleDetail({id:data.id}).then(res=>{
        console.log('文章详情',res)
        if(res.code==200&&res.data!=null){
            this.data=res.data
        }
      })
    }
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
