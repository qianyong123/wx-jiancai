<template>
  <div class="PlotDetails" >
      <div class="PlotDetails-top">
          <span>东九一号</span>
          <span>在售</span>
          <span>住宅</span>
      </div>
      <div class="PlotDetails-banner">
        <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
      </div>
      <div class="detail1">
          <div>
            <span>均价</span>
            <span>12500元/平</span>
          </div>
           <div>
            <span>建筑面积</span>
            <span>90-150㎡</span>
          </div>
           <div>
            <span>建筑类型</span>
            <span>板楼</span>
          </div>
      </div>
      <div class="detail2">
        <div>
          <span>开盘时间：</span>
          <span>2018-09-25</span>
        </div>
        <div>
          <span>楼盘地址：</span>
          <span>宜兴市东氿大道562号</span>
        </div>
        <div @click="more(1)">更多楼盘信息</div>
      </div>
      <div class="bcg"></div>
      <div class="sell">
        <div class="sell-title">在售房型</div>
        <div class="detail3">
            <div class="img">
              <img src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" alt="">
            </div>
            <div class="detail3-name">
              <div>3室2厅1厨2卫</div>
              <div>建面 115㎡</div>
              <div>
                  <span>地铁口</span>
                  <span>商业区</span>
                  <span>南北通透</span>
              </div>
              <div>约150万/套</div>
            </div>
        </div>
      </div>
      <div class="bcg"></div>
      <div class="map-title">位置周边</div>
      <maps></maps>
  </div>
</template>

<script>
import maps from './map'
export default {
  data () {
    return {
      name: '东九一号',
      key:2
    }
  },

  components: {
    maps
  },

  methods: {
    more(id){
      wx.navigateTo({
        url: `../moreMessge/main?id=${id}&name=${this.name}&key=${this.key}`
        })
    }
  },
  mounted() {
    
  },
  onLoad(){
    
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/base.scss';
  .PlotDetails{
    width:330px;
    margin: 20px auto;
    font-size: 14px;
    .PlotDetails-top{
      width: 100%;
      height:30px;
      display: flex;
      align-items: center;
      overflow: hidden;
      span:nth-child(1){
        font-size:26px;
        font-weight: 600;
      }
        span:nth-child(2){
            padding:1px 5px;
            font-size: 12px;
            background: #E8F4FD;
            color: #118EE9;
            border-radius: 2px;
            margin:0 10px;
        }
         span:nth-child(3){
            padding:1px 5px;
            font-size: 12px;
            background: #FFF0EB;
            color: #FF6633;
            border-radius: 2px;
        }
    }
    .PlotDetails-banner{
      width: 100%;
      height: 220px;
      position: relative;
      margin:10px 0 20px 0;
      img{
        position: absolute;
        top: 0;
        left: 0;
         width: 100%;
         height: 100%;
         background:#ccc;
      }
    }
    .detail1{
      height: 42px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      div{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // align-items: center;
          span:nth-child(1){
              color: #ccc;
          }
          span:nth-child(2){
              color: #f00;
          }
      }
      
    }
    .detail2{
      width: 100%;
      margin-bottom:20px;
      div{
        height: 35px;
        // margin-bottom: 10px;
        display: flex;
        align-items: center;
         span:nth-child(1){
              color: #ccc;
              margin-right: 20px;
              overflow: hidden;
          }
      }
      div:nth-child(3){
          background: #DDF4ED;
          justify-content: center;
          color: $color;
          margin-top: 10px;
      }
    }
    .bcg{
      width: 100%;
      height: 10px;
      background:#F8F8F8;
    }
    .sell{
      width:100%;
      margin: 20px 0;
      .sell-title{
          font-size:20px;
          font-weight: 600;
          margin-bottom: 20px;
      }
      .detail3{
        width:100%;
        height: 100px;
        display: flex;
        margin-bottom: 20px;
        font-size: 14px;
        .img{
            width: 100px;;
            height: 100px;
            position: relative;
            background: #ccc;
            margin-right: 20px;
            img{
              height: 100%;
              width: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
        }
         .detail3-name{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            div:nth-child(1){
               font-size:20px;
                font-weight: 600;
            }
            div:nth-child(2){
              color: #999999;
              font-size: 14px;
            }
            div:nth-child(3){
              font-size: 12px;
              color: #ccc;
              span{
                display: inline-block;
                padding:1px 4px;
                border: 1px solid #ccc;
                margin-right: 10px;
                border-radius: 3px;
              }
            }
            div:nth-child(4){
              font-size:18px;
              font-weight: 600;
              color: #f00;
            }
          }
      }
    }
    .map-title{
      font-size:20px;
      font-weight: 600;
      margin: 20px 0;
    }
  }
</style>
