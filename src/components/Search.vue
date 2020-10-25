<template>
  <div id="search">
    <div class="search-results">
      <SearchForm :google="google" :geocoder="geocoder" />
      <PickList />
    </div>
    <!-- this is an example of using scoped slots. we need access to the google "map" object that is created inside
    the ListingMap child component, so inside ListingMap we bind this map object to it's <slot> as an attribute called
    "map", e.g., <slot :map="map">. then, when we use the v-slot directive below, we create a variable that we call
    "slotProps" (the name can be anything), and that variable contains all the props we bound to the slot in the child
    component. v-slot:default is referencing the "defalut" slot because vue supports using multiple "named slots", and
    if you create a <slot> with no name then it's name implicitly becomes "default". -->
    <ListingMap v-if="google" v-slot:default="slotProps" :google="google" :location="location" :viewport="viewport">
      <ListingMarker
        v-for="(position, index) in listingLocations"
        :key="index"
        :position="position"
        :google="google"
        :map="slotProps.map"
      />
    </ListingMap>
  </div>
</template>

<script>
// TODO: switch to @googlemaps/js-api-loader if it ever supports clientId. @googlemaps/loader was deprecated in favor of
// @googlemaps/js-api-loader but it doesn't seem to support clientId yet.
import { Loader } from '@googlemaps/loader'
import { mapState, mapGetters, mapActions } from 'vuex'
import { googleMapsOptions } from '@/config/google'
import SearchForm from "@/components/SearchForm"
import PickList from '@/components/PickList'
import ListingMap from "@/components/ListingMap"
import ListingMarker from "@/components/ListingMarker"

export default {

  components: {
    SearchForm,
    PickList,
    ListingMap,
    ListingMarker
  },

  computed: {
    ...mapState('listingMap', [
      'location',
      'viewport'
    ]),

    ...mapState('listingSearch', [
      'searchParams'
    ]),

    ...mapGetters('listingSearch', ['listingLocations'])
  },

  data() {
    return {
      google: null,
      geocoder: null
    }
  },

  async mounted() {
    this.searchListings(this.searchParams)
    this.google = await this.loadGoogle()
    this.createGeocoder()
    this.geocodeMap({ geocoder: this.geocoder, request: { address: this.searchParams.location_search_field } })
  },

  methods: {
    ...mapActions('listingMap', ['geocodeMap']),

    ...mapActions('listingSearch', ['searchListings']),

    /* the google variable is actually global once the script is loaded but we're treating it as if it wasn't. instead,
    we're assigning it to an instance variable and passing it down to other components as props. we're doing this
    because most examples that use Google Maps inside a javascript framework do it this way, so I'm assuming that they
    do it for a good reason. we don't want to keep google in the store because complex, stateful objects don't work well
    with Vuex, and putting them in the store is discouraged. */
    async loadGoogle() {
      if (typeof google === 'undefined') await new Loader(googleMapsOptions).load()
      return google
    },

    createGeocoder() {
      this.geocoder = new this.google.maps.Geocoder()
    }
  }
}
</script>

<style>
#search {
  display: flex;
  height: 100%;
}

.search-results {
  width: 65%;
  height: 100%;
}
</style>
