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
            <wxParse :content="data.content" />            
          </div>
        
      </div>
  </div>
</template>

<script>
import {articleDetail} from '../../utils/api.js'
import wxParse from 'mpvue-wxparse'
export default {
  data () {
    return {
      motto: 'Hello World',
      data: {},
      article:'<div>我是HTML代码</div>'
    }
  },

  components: {
    wxParse
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
@import url("~mpvue-wxparse/src/wxParse.css");
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
