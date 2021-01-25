<template>
</template>

<script>
export default {
  props: {
    google: {
      type: Object,
      required: true
    },

    map: {
      type: Object,
      required: true
    },

    coordinates: {
      type: Array,
      default: () => []
    },

    options: {
      type: Object
    }
  },

  watch: {
    coordinates(newValue, oldValue) {
      if (this.polygon) this.clearPolygon()
      if (newValue.length) this.createPolygon()
    }
  },

  data() {
    return {
      polygon: null
    }
  },

  created() {
    if (this.coordinates.length) this.createPolygon()
  },

  methods: {
    createPolygon() {
      this.polygon = new this.google.maps.Polygon({
        paths: this.coordinates,
        ...this.options
      })
      this.polygon.setMap(this.map)
    },

    clearPolygon() {
      this.polygon.setMap(null)
      this.polygon = null
    }
  }


}
</script>
