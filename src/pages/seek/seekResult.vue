<template>
<scroll-view scroll-y @scrolltolower="$emit('onload',1)" class="seekResultBox">
  <div class="seekResult" >
      <item v-for="(item,index) in commList" :key="index" :text='item' :index='index'></item>
  </div>
  </scroll-view>
</template>

<script>
import item from './item'

export default {
    props:['commList'],
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      
    }
  },

  components: {
    item
  },

  methods: {
   
  },

  created () {
  
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/base.scss';
.seekResultBox{
   width: 100%;
  height:90%;
    .seekResult{
      width: 100%;
      min-height:255px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 20px;
  }
}

</style>
