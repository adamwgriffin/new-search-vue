<template>
  <!-- this is an example of using scoped slots. we need access to the google "map" object that is created inside
  the Map child component, so inside Map we bind this map object to it's <slot> as an attribute called
  "map", e.g., <slot :map="map">. then, when we use the v-slot directive below, we create a variable that we call
  "slotProps" (the name can be anything), and that variable contains all the props we bound to the slot in the child
  component. v-slot:default is referencing the "defalut" slot because vue supports using multiple "named slots", and
  if you create a <slot> with no name then it's name implicitly becomes "default". -->
  <GoogleMap
    v-slot:default="slotProps"
    :google="google"
    :location="location"
    :viewport="viewport"
    :mapOptions="mapOptions"
  >
    <ListingMarker
      v-for="(position, index) in listingLocations"
      :key="index"
      :position="position"
      :google="google"
      :map="slotProps.map"
    />
  </GoogleMap>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import GoogleMap from '@/components/GoogleMap'
import ListingMarker from '@/components/ListingMarker'
import { mapOptions } from '@/config/google'

export default {

  components: {
    GoogleMap,
    ListingMarker
  },

  props: {
    google: {
      type: Object,
      required: true
    }
  },

  computed: {
    mapOptions: () => mapOptions,

    ...mapState('listingMap', [
      'location',
      'viewport'
    ]),

    ...mapGetters('listingSearch', ['listingLocations'])
  },


}
</script>
