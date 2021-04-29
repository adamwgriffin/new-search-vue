<template>
</template>

<script>
import MarkerClusterer from '@googlemaps/markerclustererplus'
import { listingMarker, listingMarkerIcon } from '@/lib/listing_marker'
import { getClusterStyles } from '@/lib/listing_marker_clusterer'

export default {
  // allows us to access the map from the GoogleMap component made available via ReactiveProvideMixin
  inject: ['GoogleMap'],

  props: {
    coordinates: {
      type: Array,
      default: []
    },

    clusterThreshold: {
      type: Number,
      default: 200
    },

    iconFill: {
      type: String,
      default: '#0f2b59'
    },

    iconHoverFill: {
      type: String,
      default: 'red'
    },
  },

  data() {
    return {
      markerClusterer: null,
      markers: [],
    }
  },

  watch: {
    coordinates(newCoordinates) {
      newCoordinates.length >= this.clusterThreshold ?
        this.updateMarkerClusterer() :
        this.declusterMarkers()
    }
  },

  created() {
    this.createMarkerClusterer()
  },

  destroyed() {
    this.destroyMarkers()
    this.destroyMarkerClusterer()
  },
  
  methods: {
    createMarkerClusterer() {
      this.markerClusterer = new MarkerClusterer (
        this.GoogleMap.map,
        this.markers,
        { styles: getClusterStyles() }
      )
    },

    updateMarkerClusterer() {
      this.updateMarkers()
      this.markerClusterer.clearMarkers()
      this.markerClusterer.addMarkers(this.markers)
    },

    destroyMarkerClusterer() {
      this.markerClusterer.setMap(null)
    },

    declusterMarkers() {
      this.markerClusterer.clearMarkers()
      this.updateMarkers()
    },

    createMarker(position) {
      const markerIcon = listingMarkerIcon({ fill: this.iconFill })
      const markerIconHover = listingMarkerIcon({ fill: this.iconHoverFill })
      const marker = listingMarker(position, this.GoogleMap.map, markerIcon)
      marker.addListener('mouseover', () => marker.setIcon(markerIconHover))
      marker.addListener('mouseout', () => marker.setIcon(markerIcon))
      return marker
    },

    createMarkers() {
      this.markers = this.coordinates.map(c => this.createMarker(c))
    },

    updateMarkers() {
      this.destroyMarkers()
      this.createMarkers()
    },

    destroyMarkers() {
      this.markers.forEach(m => m.setMap(null))
    }
  }

}
</script>
