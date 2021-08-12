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
      <GeoLayerPolygon
        :paths="geoLayerCoordinates"
        :options="geoLayerPolygonOptions"
      />
    </GoogleMap>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import GoogleMap from '@/components/map/GoogleMap'
import ClusteredMarkers from '@/components/map/ClusteredMarkers'
import GeoLayerPolygon from '@/components/map/GeoLayerPolygon'
import MapToolsControl from '@/components/map/MapToolsControl'
import MapTypeControl from '@/components/map/MapTypeControl'
import BoundaryControl from '@/components/map/BoundaryControl'
import { geoLayerPolygonOptions } from '@/config'
import { mapOptions } from '@/config/google'

export default {

  components: {
    GoogleMap,
    GeoLayerPolygon,
    ClusteredMarkers,
    MapTypeControl,
    MapToolsControl,
    BoundaryControl
  },

  computed: {
    mapOptions: () => mapOptions,

    geoLayerPolygonOptions,

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
      'setBoundaryActive',
      'resetGeoLayerCoordinates'
    ]),

    ...mapMutations('listingSearch', [
      'resetListings',
      'setListingSearchPending'
    ]),

    ...mapActions('listingSearch', ['searchListings']),

    handleMapTypeSelected(e) {
      this.setMapData({ mapTypeId: e })
    },

    handleBoundaryControlClick() {
      this.setBoundaryActive(false)
      this.resetGeoLayerCoordinates() // removing coordinates removes the boundary
      this.resetListings()
      this.setListingSearchPending()
    },

    handleUserAdjustedMap(e) {
      this.setMapData(e)
      this.resetListings()
      this.setListingSearchPending()
    },

    handleIdle(e) {
      this.setMapData(e)
      // TODO: also check if boundary is active and outside of viewport here
      if (this.listingSearchPending) {
        this.searchListings(this.searchParamsForListingService)
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
