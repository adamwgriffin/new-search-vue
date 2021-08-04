<template>
  <GoogleMap
    :bounds="apiResponseBounds"
    :mapOptions="mapOptions"
    @dragend="handleUserAdjustedMap"
    @userChangedZoom="handleUserAdjustedMap"
    @idle="setMapData"
  >
    <MapToolsControl :position="mapToolsPosition" />
    <ClusteredMarkers :coordinates="listingCoordinates" :clusterThreshold="cluster_threshold" />
    <GeoLayerPolygon
      :paths="geoLayerCoordinates"
      :options="geoLayerPolygonOptions"
    />
    <MapTypeControl :position="mapTypePosition" />
  </GoogleMap>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import GoogleMap from '@/components/map/GoogleMap'
import ClusteredMarkers from '@/components/map/ClusteredMarkers'
import GeoLayerPolygon from '@/components/map/GeoLayerPolygon'
import MapTypeControl from '@/components/map/MapTypeControl'
import MapToolsControl from '@/components/map/MapToolsControl'
import { geoLayerPolygonOptions } from '@/config'
import { mapOptions } from '@/config/google'

export default {

  components: {
    GoogleMap,
    GeoLayerPolygon,
    ClusteredMarkers,
    MapTypeControl,
    MapToolsControl
  },

  computed: {
    mapOptions: () => mapOptions,

    geoLayerPolygonOptions,

    ...mapState('listingMap', [
      'geoLayerCoordinates',
    ]),

    ...mapGetters('listingMap', ['apiResponseBounds',]),

    ...mapGetters('listingSearch', ['searchParamsForListingService', 'boundsParams']),

    ...mapState('listingSearch', [
      'mapListings',
      'cluster_threshold',
    ]),

    listingCoordinates() {
      return this.mapListings.map(l => ({ lat: l.lat, lng: l.lng }))
    },

    mapTypePosition() {
      return google.maps.ControlPosition.LEFT_BOTTOM
    },

    mapToolsPosition() {
      return google.maps.ControlPosition.LEFT_TOP
    }
  },

  methods: {
    ...mapMutations('listingMap', [
      'setMapData',
    ]),

    ...mapMutations('listingSearch', ['resetListings']),

    ...mapActions('listingSearch', ['searchListings']),


    handleUserAdjustedMap(e) {
      this.setMapData(e)
      this.resetListings()
      this.searchListings({
        ...this.searchParamsForListingService,
        ...this.boundsParams,
      })
    }
  },

}
</script>

<style scoped>
#google-map {
  width: 35%;
}
</style>
