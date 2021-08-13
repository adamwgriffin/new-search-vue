<template>
</template>

<script>
import { googleMap } from '@/lib/google'

export default {
  props: {
    paths: {
      type: Array,
      default: () => []
    },

    options: {
      type: Object
    }
  },

  watch: {
    paths() {
      this.updatePolygon()
    },

    options(options) {
      this.polygon.setOptions(options)
    }
  },

  data() {
    return {
      polygon: null
    }
  },

  mounted() {
    this.createPolygon()
  },

  destroyed() {
    this.destroyPolygon()
  },

  methods: {
    createPolygon() {
      // if this.paths is empty then the polygon will not show on the map, so we can easily create it without showing it
      // and adds the paths later to make it visible
      this.polygon = new google.maps.Polygon({
        paths: this.paths,
        ...this.options
      })
      this.polygon.setMap(googleMap)
    },

    updatePolygon() {
      this.polygon.setPaths(this.paths)
    },

    destroyPolygon() {
      this.polygon.setMap(null)
    }
  }


}
</script>
