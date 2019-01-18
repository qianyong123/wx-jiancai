<template>
  <div class="house" @click="houseDetail(houseList.id)">
        <div class="img">
            <img :src="houseList.imgUrl" alt="">
        </div>
        <div class="site">
            <div>
                <span class="xiaoqu-name">{{houseList.name}}</span>
                <span v-if="houseList.status==0" class="states">在售</span>
                <span v-else class="states">未售</span>
            </div>
            <div class="xiaoqu-site">{{houseList.address}}</div>
            <div>
                <span v-for="(item2,index2) in houseList.label" 
                :key="index2" 
                class="type">{{item2}}</span>
                 <!-- <span class="type">{{houseList.label}}</span> -->
            </div>
        </div>
        <div class="xiaoqu-price">
            <div class="price">{{houseList.price}}元/平</div>
            <div>建面 {{houseList.area}}㎡</div>
        </div>
  </div>
</template>

<script>


export default {
props: ['houseList'],
  data () {
    return {
      type:[
        {id:1,name:'论坛'},
        {id:1,name:'房价'},
      ],
      types:0,
    }
  },

  components: {
    
  },

  methods: {
    houseDetail(id){
        console.log('小区',id)
        wx.navigateTo({
            url: `../PlotDetails/main?id=${id}`
            })
    }
  },

  created () {
  
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/base.scss';
.house{
    width: 100%;
    min-height: 120px;
    padding:0 5px 0 20px;
    border-bottom:1px solid #BBBBAA;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #BBBBAA;
    span{
        display: inline-block;
    }
    .img{
        width: 100px;
        height: 75px;
        position: relative;
        background: #ccc;
        img{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
    }
    .site{
        width: 100px;
        min-height: 75px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .xiaoqu-name{
            font-size: 14px;
            font-weight: 600;
            margin-right: 5px;
            color: #000;
        }
        .states{
            padding:1px 5px;
            font-size: 12px;
            background: #E8F4FD;
            color: #118EE9;
            border-radius: 2px;
        }
        .type{
            padding:1px 5px;
            font-size: 12px;
            background: #fff;
            color: #ccc;
            border: 1px solid #ccc;
            border-radius: 2px;
            margin-right: 5px;
            margin-bottom: 2px;
        }
    }
    .xiaoqu-price{
        width: 100px;
        height: 40px;
        overflow: hidden;
        .price{
            font-size: 14px;
            color: #f00;
            margin-bottom:2px;
            font-weight: 600;
        }
    }
}
</style>
