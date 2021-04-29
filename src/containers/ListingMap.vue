<template>
  <GoogleMap
    :viewportBounds="viewportBounds"
    :mapOptions="mapOptions"
  >
    <ClusteredMarkers :coordinates="listingCoordinates" :clusterThreshold="cluster_threshold" />
    <GeoLayerPolygon
      :paths="geoLayerCoordinates"
      :options="geoLayerPolygonOptions"
    />
  </GoogleMap>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
      'geoLayerCoordinates'
    ]),

    ...mapGetters('listingMap', ['viewportBounds']),

    ...mapState('listingSearch', [
      'listings',
      'mapListings',
      'cluster_threshold'
    ]),

    listingCoordinates() {
      return this.mapListings.map(l => ({ lat: l.lat, lng: l.lng }))
    }
  }

}
</script>

<style scoped>
#google-map {
  width: 40%;
}
</style>
