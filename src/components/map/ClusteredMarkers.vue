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
    coordinates() {
      this.destroyMarkers()
      this.createMarkers()
      this.updateMarkerClusterer()
    }
  },

  created() {
    this.createMarkerClusterer()
  },

  destroyed() {
    this.markerClusterer.setMap(null)
  },
  
  methods: {
    createMarkerClusterer() {
      this.markerClusterer = new MarkerClusterer (
        this.GoogleMap.map,
        this.markers,
        {
          minimumClusterSize: 20,
          styles: getClusterStyles()
        }
      )
    },

    async updateMarkerClusterer() {
      this.markerClusterer.clearMarkers()
      this.markerClusterer.addMarkers(this.markers)
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

    destroyMarkers() {
      this.markers.forEach(m => m.setMap(null))
    }
  }

}
</script>
