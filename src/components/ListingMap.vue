<template>
  <div id="listing-map"></div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
// import MarkerClusterer from '@google/markerclustererplus'

export default {

  computed: {
    ...mapState('listingMap', [
      'googleMap',
      'markers'
    ]),
    
    ...mapState('listingSearch', [
      'searchParams'
    ]),
  },

  async mounted() {
    await this.initializeMap({ el: this.$el })
    this.setMapLocation({ address: this.searchParams.location_search_field })
    this.searchListings(this.searchParams)
    // this.addListingMarkers()
  },

  updated() {
    // console.log("updated() called")
    // this.addListingMarkers()
  },

  // watch: {
  //   listingLocations(newLocations, oldLocations) {
  //     console.log('listingLocations changed', newLocations, oldLocations)
  //   }
  // },

  methods: {

    ...mapMutations('listingMap', ['moveMap']),
        
    ...mapActions('listingMap', ['initializeMap', 'setMapLocation']),
    
    ...mapActions('listingSearch', ['searchListings']),

    // markerClickHandler(marker) {
    //   this.googleMap.setZoom(13)
    //   this.googleMap.setCenter(marker.getPosition())
    // },

    // createMarkersFromLocations() {
    //   return this.listingLocations.map( location => {
    //     const marker = new google.maps.Marker( { ...location, map: googleMap,  } )
    //     marker.addListener('click', () => this.markerClickHandler(marker))
    //     return marker
    //   })
    // },

    // createMarkerClusters() {
    //   new MarkerClusterer(
    //     this.googleMap,
    //     this.markers,
    //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
    //   )
    // },

    // addListingMarkers() {
    //   if (google) {
    //     console.log('google exists, adding markers')
    //     this.setMarkers(this.createMarkersFromLocations())
    //     this.createMarkerClusters()
    //   } else {
    //     console.log('google not ready')
    //   }
    // },

  }
}
</script>

<style scoped>
#listing-map {
  width: 40%;
}
</style>
