<template>
  <GoogleMap
    :bounds="apiResponseBounds"
    :mapOptions="mapOptions"
    @dragend="handleUserAdjustedMap"
    @userChangedZoom="handleUserAdjustedMap"
    @idle="setMapData"
  >
    <MapToolsControl :position="mapToolsPosition" />
    <ClusteredListingMarkers
      :listingData="mapListingsFilteredByMapBounds"
      :clusterThreshold="cluster_threshold"
    />
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
import ClusteredListingMarkers from '@/components/map/ClusteredListingMarkers'
import GeoLayerPolygon from '@/components/map/GeoLayerPolygon'
import MapTypeControl from '@/components/map/MapTypeControl'
import MapToolsControl from '@/components/map/MapToolsControl'
import { geoLayerPolygonOptions } from '@/config'
import { mapOptions } from '@/config/google'

export default {

  components: {
    GoogleMap,
    GeoLayerPolygon,
    MapTypeControl,
    MapToolsControl,
    ClusteredListingMarkers
  },

  computed: {
    mapOptions: () => mapOptions,

    geoLayerPolygonOptions,

    ...mapState('listingMap', [
      'geoLayerCoordinates',
      'mapData'
    ]),

    ...mapGetters('listingMap', ['apiResponseBounds',]),

    ...mapGetters('listingSearch', [
      'searchParamsForListingService',
      'boundsParams',
      'mapListingsFilteredByMapBounds',
    ]),

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

    ...mapMutations('listingSearch', ['resetListings', 'setMapListings']),

    ...mapActions('listingSearch', ['searchListings']),

    handleUserAdjustedMap(e) {
      this.setMapData(e)
    }
  },

}
</script>

<style scoped>
#google-map {
  width: 35%;
}
</style>
