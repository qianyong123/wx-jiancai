<template>
  <div class="forum" @click="forumItem(forumList.id)">
      <div class="forum-left">
          <div class="title">{{forumList.content}}</div>
          <div class="name">
              <div>{{forumList.createBy}}</div>
              <div>{{forumList.readCount}}阅读</div>
          </div>
          <div v-if="index<9" class="tabs" :class="{tabs2:index>2}">0{{index+1}}</div>
          <div v-else class="tabs" :class="{tabs2:index>2}">{{index+1}}</div>
      </div>
      <div class="forum-img">
          <img :src="forumList.imgUrl" alt="">
      </div>
  </div>
</template>

<script>

export default {
    props:['forumList','index'],
  data () {
    return {
        names:''
    }
  },

  components: {
    
  },
    computed: {
        name(){
            return 'gfx'
        }
    },
  methods: {
      forumItem(id){
          console.log('文章',id)
          wx.navigateTo({
            url: `../articleDetail/main?id=${id}`
            })
      }
  },

  created () {
  
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/base.scss';
.forum{
    width: 375px;
    height: 120px;
    display: flex;
    padding:0 5px 0 45px;
    border-bottom:1px solid rgba(242, 242, 242, 1);
    justify-content: space-between;
    align-items: center;
    .forum-left{
        width:210px;
        height: 75px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        .title{
            width: 210px;
            height:42px;
            overflow: hidden;
            font-size: 16px;
            font-weight: 600;
        }
        .name{
            font-size: 14px;
            color: #ccc;
            display: flex;
            justify-content: space-between;
        }
         .tabs{
            width: 25px;
            height: 16px;
            line-height: 16px;
            font-size: 12px;
            text-align: center;
            color: #fff;
            background: #F73350;
            border: 1px solid #F73350;
            border-radius:4px;
            position: absolute;
            top:2px;
            left:-35px;
          }
          .tabs2{
            background: #E4F6F1;
            border: 1px solid #E4F6F1;
            color: $color;
          }
    }
    .forum-img{
        width: 100px;
        height: 75px;
        background: #ccc;
        position: relative;
         border-radius:6px;
        img{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: 6px;
        }
    }
}
</style>
