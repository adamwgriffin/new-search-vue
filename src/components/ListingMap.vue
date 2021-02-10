<template>
  <!-- this is an example of using scoped slots. we need access to the google "map" object that is created inside
  the Map child component, so inside Map we bind this map object to it's <slot> as an attribute called
  "map", e.g., <slot :map="map">. then, when we use the v-slot directive below, we create a variable that we call
  "slotProps" (the name can be anything), and that variable contains all the props we bound to the slot in the child
  component. v-slot:default is referencing the "defalut" slot because vue supports using multiple "named slots", and
  if you create a <slot> with no name then it's name implicitly becomes "default". -->
  <GoogleMap
    v-slot:default="slotProps"
    :location="location"
    :viewport="viewport"
    :mapOptions="mapOptions"
  >
    <ListingMarker
      v-for="(l, i) in listings"
      :key="l.listingid"
      :position="{ lat: +l.location.latitude, lng: +l.location.longitude }"
      :map="slotProps.map"
    />
    <GeoLayerPolygon
      :paths="geoLayerCoordinates"
      :options="geoLayerPolygonOptions"
      :map="slotProps.map"
    />
  </GoogleMap>
</template>

<script>
import { mapState } from 'vuex'
import GoogleMap from '@/components/GoogleMap'
import ListingMarker from '@/components/ListingMarker'
import GeoLayerPolygon from '@/components/GeoLayerPolygon'
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
      'location',
      'viewport',
      'geoLayerCoordinates'
    ]),

    ...mapState('listingSearch', ['listings'])
  }

}
</script>

<style scoped>
#google-map {
  width: 35%;
}
</style>
