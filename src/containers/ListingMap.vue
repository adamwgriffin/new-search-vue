<template>
  <GoogleMap
    :bounds="apiResponseBounds"
    :mapOptions="mapOptions"
    @dragend="handleUserAdjustedMap"
    @userChangedZoom="handleUserAdjustedMap"
    @idle="setMapData"
  >
    <ClusteredMarkers :coordinates="listingCoordinates" :clusterThreshold="cluster_threshold" />
    <GeoLayerPolygon
      :paths="geoLayerCoordinates"
      :options="geoLayerPolygonOptions"
    />
  </GoogleMap>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import GoogleMap from '@/components/map/GoogleMap'
import ClusteredMarkers from '@/components/map/ClusteredMarkers'
import GeoLayerPolygon from '@/components/map/GeoLayerPolygon'
import { geoLayerPolygonOptions } from '@/config'
import { mapOptions } from '@/config/google'

export default {

  components: {
    GoogleMap,
    GeoLayerPolygon,
    ClusteredMarkers,
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
    }
  },

  methods: {
    ...mapMutations('listingMap', [
      'setMapData',
    ]),

    ...mapMutations('listingSearch', ['resetListings']),

    ...mapActions('listingSearch', ['searchListings']),


    handleUserAdjustedMap(e) {
      this.resetListings()
      this.searchListings({
        ...this.searchParamsForListingService,
        ...this.boundsParams,
      })
      this.setMapData(e)
    }
  },

}
</script>

<style scoped>
#google-map {
  width: 40%;
}
</style>
