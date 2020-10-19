<template>
  <div id="map-content" v-loading="mapLoading"></div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图

export default {
  data() {
    return {
      map: null,
      mapLoading: false,
      polygon: null
    }
  },

  methods: {
    initMap(areas = '') {
      this.mapLoading = true
      this.map = new AMap.Map('map-content', {
        center: [114.341861, 30.546498],
        resizeEnable: true,
        zoom: 9
      })

      console.log('map-content', this.map)

      this.map.on('complete', () => {
        const path = areas
        console.log('完成', path)
        if (path) {
          this.polygon = new AMap.Polygon({
            path: path.split('|').map((item) => item.split(',')),
            strokeColor: '#FF33FF',
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            fillColor: '#1791fc',
            zIndex: 50
          })
          this.map.add(this.polygon)
          // 缩放地图到合适的视野级别
          this.map.setFitView([this.polygon])
        }

        this.mapLoading = false
      })
    },

    destryed() {
      this.map.destryed()
    }
  }
}
</script>

<style>
#map-content {
  width: 100%;
  height: 100%;
}
</style>
