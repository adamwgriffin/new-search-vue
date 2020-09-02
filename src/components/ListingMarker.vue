<template>
  
</template>

<script>
import { listingMarker, listingMarkerIcon } from '@/lib/listing_marker'

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

    position: {
      type: Object,
      required: true
    },

    iconFill: {
      type: String,
      default: '#0f2b59'
    },

    iconHoverFill: {
      type: String,
      default: 'red'
    },

    clickEventZoomLevel: {
      type: Number,
      default: 16
    }
  },

  data() {
    return {
      marker: null
    }
  },

  created() {
    this.createMarker()
  },

  destroyed() {
    this.marker.setMap(null)
  },

  methods: {

    markerClickHandler() {
      this.map.setZoom(this.clickEventZoomLevel)
      this.map.setCenter(this.marker.getPosition())
    },

    createMarker() {
      const markerIcon = listingMarkerIcon({ fill: this.iconFill })
      const markerIconHover = listingMarkerIcon({ fill: this.iconHoverFill })
      this.marker = listingMarker(this.google, this.position, this.map, markerIcon)
      this.marker.addListener('click', this.markerClickHandler)
      this.marker.addListener('mouseover', () => this.marker.setIcon(markerIconHover))
      this.marker.addListener('mouseout', () => this.marker.setIcon(markerIcon))
    }
    
  }
  
}
</script>

<style>

</style>
