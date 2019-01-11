<template>
  <div class="seekResult" >
      <item v-for="item in commList" :key="item.id" :text='item'></item>
  </div>
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
.seekResult{
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20px;
}
</style>
