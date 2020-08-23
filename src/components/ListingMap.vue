<template>
  <div id="listing-map"></div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
// import MarkerClusterer from '@google/markerclustererplus'

export default {

  computed: {
    ...mapState('listingMap', [
      'google',
      'googleMap',
      'markers'
    ]),
    
    // ...mapState('listingMap', [
    //   'markers'
    // ]),
    
    ...mapState('listingSearch', [
      'searchParams'
    ]),
  },

  async mounted() {
    await this.initializeMap({ el: this.$el })
    this.setInitialLocation()
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
        
    ...mapActions('listingMap', ['initializeMap', 'geocodeMap']),

    async setInitialLocation() {
      const { results } = await this.geocodeMap({ address:  this.searchParams.location_search_field })
      this.moveMap({ location: results[0].geometry.location, viewport: results[0].geometry.viewport })
    },

    // markerClickHandler(marker) {
    //   this.googleMap.setZoom(13)
    //   this.googleMap.setCenter(marker.getPosition())
    // },

    // createMarkersFromLocations() {
    //   return this.listingLocations.map( location => {
    //     const marker = new this.google.maps.Marker( { ...location, map: this.googleMap,  } )
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
    //   if (this.google) {
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
