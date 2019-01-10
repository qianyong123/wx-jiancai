<template>
  <div class="house" >
        <div class="img"></div>
        <div class="site">
            <div>
                <span class="xiaoqu-name">东九一号</span>
                <span class="states">在售</span>
            </div>
            <div class="xiaoqu-site">宜兴-宜城街道</div>
            <div>
                <span class="type">住宅</span>
                 <span class="type">商业区</span>
            </div>
        </div>
        <div class="xiaoqu-price">
            <div class="price">13000元/平</div>
            <div>建面 120-250㎡</div>
        </div>
  </div>
</template>

<script>


export default {
props: ['forumList'],
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
    
  },

  created () {
  
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/base.scss';
.house{
    width: 100%;
    height: 120px;
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
        height: 75px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
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
        }
    }
    .xiaoqu-price{
        width: 100px;
        height: 40px;
        overflow: hidden;
        .price{
            font-size: 14px;
            color: #f00;
            margin-bottom:4px;
            font-weight: 600;
        }
    }
}
</style>
