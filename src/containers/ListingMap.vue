<template>
  <GoogleMap
    :viewportBounds="viewportBounds"
    :mapOptions="mapOptions"
  >
    <ListingMarker
      v-for="(l, i) in listings"
      :key="l.listingid"
      :position="{ lat: +l.location.latitude, lng: +l.location.longitude }"
    />
    <GeoLayerPolygon
      :paths="geoLayerCoordinates"
      :options="geoLayerPolygonOptions"
    />
  </GoogleMap>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import GoogleMap from '@/components/map/GoogleMap'
import ListingMarker from '@/components/map/ListingMarker'
import GeoLayerPolygon from '@/components/map/GeoLayerPolygon'
import { geoLayerPolygonOptions } from '@/config'
import { mapOptions } from '@/config/google'

export default {

  components: {
    GoogleMap,
    ListingMarker,
    GeoLayerPolygon
  },

  computed: {
    mapOptions: () => mapOptions,

    geoLayerPolygonOptions,

    ...mapState('listingMap', [
      'geoLayerCoordinates'
    ]),

    ...mapGetters('listingMap', ['viewportBounds']),

    ...mapState('listingSearch', ['listings'])
  }

}
</script>

<style scoped>
#google-map {
  width: 40%;
}
</style>
