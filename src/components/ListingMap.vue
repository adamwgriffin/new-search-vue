<template>
  <div id="listing-map"></div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import MarkerClusterer from '@google/markerclustererplus'

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
      return this.listingLocations.map( location => {
        const marker = new google.maps.Marker( { ...location, map: this.googleMap } )
        marker.addListener('click', () => this.markerClickHandler(marker))
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
