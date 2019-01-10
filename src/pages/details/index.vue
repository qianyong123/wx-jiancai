<template>
  <div class="container" >
      详情
  </div>
</template>

<script>
import {getData} from '../../utils/api.js'

export default {
  data () {
    return {
      
    }
  },

  components: {
    
  },

  methods: {
   
  },
  mounted() {
 
  },
  onShow(){
    let data=this.$root.$mp.query
    console.log(data)
      getData(`/product/detail/${data.id}`).then(res=>{
        console.log('商品详情',res)
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
