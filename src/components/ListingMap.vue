<template>
  <div id="listing-map"></div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import MarkerClusterer from '@google/markerclustererplus'
import { listingMarker, listingMarkerIcon } from '@/lib/listing_marker'

export default {

  props: {
    google: {
      type: Object,
      required: true
    },

    location: {
      type: [Object, null]
    },
    
    viewport: {
      type: [Object, null]
    }
  },

  data() {
    return {
      googleMap: null
    }
  },

  computed: {
    ...mapState('listingMap', [
      'markers',
      'geocode'
    ]),
    
    ...mapState('listingSearch', [
      'searchParams'
    ]),

    ...mapGetters('listingSearch', ['listingLocations'])
  },

  watch: {
    location(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.moveMap(this.location, this.viewport)
      }
    },

    listingLocations() {
      this.addListingMarkers()
    }
  },

  async mounted() {
    this.googleMap = new this.google.maps.Map(this.$el)
    if (this.location && this.viewport) this.moveMap(this.location, this.viewport)
    this.addListingMarkers()
  },

  methods: {

    ...mapMutations('listingMap', ['setMarkers']),
        
    ...mapActions('listingMap', ['initializeMap', 'geocodeMap']),

    // TODO: this probably needs a better name and needs to be less specific, but I don't know how to change it yet
    moveMap(location, viewport) {
      this.googleMap.setCenter(location)
      this.googleMap.fitBounds(viewport)
    },

    markerClickHandler(marker) {
      this.googleMap.setZoom(16)
      this.googleMap.setCenter(marker.getPosition())
    },

    createMarkersFromLocations() {
      return this.listingLocations.map(position => {
        const markerIcon = listingMarkerIcon({ fill: "#0f2b59" })
        const markerIconHover = listingMarkerIcon({ fill: 'red' })
        const marker = listingMarker(google, position, this.googleMap, markerIcon)
        marker.addListener('click', () => this.markerClickHandler(marker))
        marker.addListener('mouseover', () => marker.setIcon(markerIconHover))
        marker.addListener('mouseout', () => marker.setIcon(markerIcon))
        return marker
      })
    },

    createMarkerClusters() {
      new MarkerClusterer(
        this.googleMap,
        this.markers,
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
      )
    },

    addListingMarkers() {
      if (google && this.listingLocations.length) {
        this.setMarkers(this.createMarkersFromLocations())
        // this.createMarkerClusters()
      }
    }

  }
}
</script>

<style scoped>
#listing-map {
  width: 35%;
}
</style>
