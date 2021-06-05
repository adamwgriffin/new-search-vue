<template>
</template>

<script>
import { listingMarker, listingMarkerIcon } from '@/lib/listing_marker'
import { googleMap } from '@/lib/google'

export default {
  props: {
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
      googleMap.setZoom(this.clickEventZoomLevel)
      googleMap.setCenter(this.marker.getPosition())
    },

    createMarker() {
      const markerIcon = listingMarkerIcon({ fill: this.iconFill })
      const markerIconHover = listingMarkerIcon({ fill: this.iconHoverFill })
      this.marker = listingMarker(this.position, googleMap, markerIcon)
      this.marker.addListener('click', this.markerClickHandler)
      this.marker.addListener('mouseover', () => this.marker.setIcon(markerIconHover))
      this.marker.addListener('mouseout', () => this.marker.setIcon(markerIcon))
    }
    
  }
  
}
</script>
