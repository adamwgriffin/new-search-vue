<template>
  <div id="listing-map"></div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import MarkerClusterer from '@google/markerclustererplus'
import { listingMarker, listingMarkerIcon } from '@/lib/listing_marker'

export default {

  computed: {
    ...mapState('listingMap', [
      'googleMap',
      'markers'
    ]),
    
    ...mapState('listingSearch', [
      'searchParams'
    ]),

    ...mapGetters('listingSearch', ['listingLocations'])
  },

  async mounted() {
    await this.initializeMap({ el: this.$el })
    this.setMapLocation({ address: this.searchParams.location_search_field })
    this.searchListings(this.searchParams)
    this.addListingMarkers()
  },

  watch: {
    listingLocations() {
      this.addListingMarkers()
    }
  },

  methods: {

    ...mapMutations('listingMap', ['moveMap', 'setMarkers']),
        
    ...mapActions('listingMap', ['initializeMap', 'setMapLocation']),
    
    ...mapActions('listingSearch', ['searchListings']),

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
  width: 40%;
}
</style>
