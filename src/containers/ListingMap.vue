<template>
  <div id="listing-map">
    <!-- ideally we would have created these map control components as custom controls using the Google Maps API, and
   put them inside of the GoogleMap component, but that wasn't working well with Vue, so we're positioning them on top
   of the map this way instead. -->
    <MapToolsControl />
    <MapTypeControl :mapTypeId="mapData.mapTypeId" @mapTypeSelected="handleMapTypeSelected"/>
    <BoundaryControl v-if="boundaryActive" @click="handleBoundaryControlClick" />
    <GoogleMap
      :bounds="apiResponseBounds"
      :mapOptions="mapOptions"
      :mapTypeId="mapData.mapTypeId"
      @dragend="handleUserAdjustedMap"
      @userChangedZoom="handleUserAdjustedMap"
      @idle="handleIdle"
    >    
      <ClusteredMarkers :coordinates="listingCoordinates" :clusterThreshold="cluster_threshold" />
      <Boundary
        :paths="geoLayerCoordinates"
        :options="boundaryOptions"
      />
    </GoogleMap>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import GoogleMap from '@/components/map/GoogleMap'
import ClusteredMarkers from '@/components/map/ClusteredMarkers'
import Boundary from '@/components/map/Boundary'
import MapToolsControl from '@/components/map/MapToolsControl'
import MapTypeControl from '@/components/map/MapTypeControl'
import BoundaryControl from '@/components/map/BoundaryControl'
import { boundaryOptions } from '@/config'
import { mapOptions } from '@/config/google'

export default {

  components: {
    GoogleMap,
    Boundary,
    ClusteredMarkers,
    MapTypeControl,
    MapToolsControl,
    BoundaryControl
  },

  computed: {
    mapOptions: () => mapOptions,

    boundaryOptions() {
      return { ...boundaryOptions, visible: this.boundaryActive }
    },

    ...mapState('listingMap', [
      'mapData',
      'geoLayerCoordinates',
      'boundaryActive'
    ]),

    ...mapGetters('listingMap', ['apiResponseBounds',]),

    ...mapGetters('listingSearch', ['searchParamsForListingService', 'boundsParams']),

    ...mapState('listingSearch', [
      'mapListings',
      'cluster_threshold',
      'listingSearchPending'
    ]),

    listingCoordinates() {
      return this.mapListings.map(l => ({ lat: l.lat, lng: l.lng }))
    }
  },

  methods: {
    ...mapMutations('listingMap', [
      'setMapData',
      'setBoundaryActive'
    ]),

    ...mapMutations('listingSearch', [
      'resetListings',
      'setListingSearchPending',
      'setListingSearchComplete'
    ]),

    ...mapActions('listingSearch', [
      'searchListings',
      'cancelActiveSearchListingRequests'
    ]),

    handleMapTypeSelected(e) {
      this.setMapData({ mapTypeId: e })
    },

    handleBoundaryControlClick() {
      this.setBoundaryActive(false)
      this.resetListings()
      this.setListingSearchPending()
      // no further map events will be triggered so we do the search here instead of handleIdle()
      this.completePendingListingSearch()
    },

    handleUserAdjustedMap(e) {
      this.setMapData(e)
      this.resetListings()
      this.setListingSearchPending()
    },

    async handleIdle(e) {
      this.setMapData(e)
      // TODO: also check if boundary is active and outside of viewport here
      if (this.listingSearchPending) {
        this.completePendingListingSearch()
      }
    },

    async completePendingListingSearch() {
      this.cancelActiveSearchListingRequests()
      try {
        await this.searchListings(this.searchParamsForListingService)          
      } catch (error) {
        // TODO: could trigger a message to the user here
        console.error(error)
      } finally {
        this.setListingSearchComplete()
      }
    }
  },

}
</script>

<style scoped>
#listing-map {
  position: relative;
  width: 35%;
}

#google-map {
  height: 100%;
}
</style>
