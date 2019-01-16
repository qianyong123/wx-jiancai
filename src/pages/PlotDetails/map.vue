<template>
  <div class="map" >
      <map
        id="map"
        :longitude="markers[0].longitude"
        :latitude="markers[0].latitude"
        scale="16"
        :markers="markers"
        @markertap="markertap"
        show-location
        style="width: 100%; height:100%;"
      ></map>
  </div>
</template>

<script>

export default {
  data () {
    return {
      latitude:'',
      longitude:'',
      motto: 'Hello World',
      userInfo: {},
      markers: [{
        iconPath: '/static/Icon/map.png',
        id: 0,
        latitude:'30.631273',
        longitude: '104.03614',
        width: 30,
          height: 30 
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: '#FF0000DD',
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/static/Icon/map.png',
      position: {
        left: 0,
        top: 300 - 50,
        width:35,
        height: 35
      },
      clickable: true
    }]
    }
  },

  components: {
    
  },

  methods: {
       regionchange(e) {
    console.log('regionchange',e)
  },
  markertap(e) {
    console.log('markertap',e.mp.markerId)
    //   wx.openLocation({
    //     latitude: this.markers[0].latitude,
    //     longitude:this.markers[0].longitude,
    //     scale: 18
    // })
  },
  controltap(e) {
    console.log('controltap',e)
  }
  },
  mounted() {
    
  },
  onLoad(){
    let data=this.$root.$mp.query
    let that=this
    console.log(data)
    wx.getLocation({
      type: 'gcj02',
      success(res){
        console.log(res)
        that.markers[0].latitude = res.latitude
        that.markers[0].longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .map{
    width: 100%;
    height:300px;

    .name{
      width:100%;
      margin: 30px auto;
      line-height:22px;
      font-size: 16px;
      text-align: center;
    }
  }
</style>
