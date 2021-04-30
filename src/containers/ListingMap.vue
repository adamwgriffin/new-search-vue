<template>
  <GoogleMap
    :bounds="apiResponseBounds"
    :mapOptions="mapOptions"
    @boundsChanged="setMapBounds"
  >
    <ClusteredMarkers :coordinates="listingCoordinates" :clusterThreshold="cluster_threshold" />
    <GeoLayerPolygon
      :paths="geoLayerCoordinates"
      :options="geoLayerPolygonOptions"
    />
  </GoogleMap>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
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
      'mapBounds'
    ]),

    ...mapGetters('listingMap', ['apiResponseBounds']),

    ...mapState('listingSearch', [
      'listings',
      'mapListings',
      'cluster_threshold'
    ]),

    listingCoordinates() {
      return this.mapListings.map(l => ({ lat: l.lat, lng: l.lng }))
    }
  },

  methods: {
    ...mapMutations('listingMap', ['setMapBounds'])
  },

}
</script>

<style scoped>
#google-map {
  width: 40%;
}
</style>
