<template>
  <div class="map" >
      <div class="name">{{data.name}}</div>
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
      data:'',
      userInfo: {},
      markers: [{
        iconPath: '/static/Icon/map.png',
        id: 0,
        latitude:'30.625480688041968',
        longitude: '104.03000271368147',
        width: 25,
        height: 25
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
      wx.openLocation({
        latitude: this.markers[0].latitude,
        longitude:this.markers[0].longitude,
        scale: 18
    })
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
    if(data.name){
      this.data=data
      let gpsrs=data.gps.split(',')
      this.markers[0].longitude=gpsrs[0]
      this.markers[0].latitude=gpsrs[1]
      console.log(gpsrs)
    }
    console.log(data)
    // wx.getLocation({
    //   type: 'gcj02',
    //   success(res){
    //     console.log(res)
    //     that.markers[0].latitude = res.latitude
    //     that.markers[0].longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //   console.log(that.markers)
    //   }
    // })
  }
}
</script>

<style lang="scss" scoped>
  .map{
    width: 100%;
    height: 100%;
    .name{
      width:100%;
      margin: 30px auto;
      line-height:22px;
      font-size: 16px;
      text-align: center;
    }
  }
</style>
