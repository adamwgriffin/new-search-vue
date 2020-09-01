<template>
  <div id="search">
    <div class="search-results">
      <SearchForm :google="google" />
      <PickList />
    </div>
    <ListingMap v-if="google" :google="google" :location="location" :viewport="viewport" />
  </div>
</template>

<script>
// TODO: switch to @googlemaps/js-api-loader if it ever supports clientId. @googlemaps/loader was deprecated in favor of
// @googlemaps/js-api-loader but it doesn't seem to support clientId yet.
import { Loader } from '@googlemaps/loader'
import get from 'lodash/get'
import { mapState, mapActions } from 'vuex'
import { googleMapsOptions } from '@/config/google'
import SearchForm from "@/components/SearchForm"
import PickList from '@/components/PickList'
import ListingMap from "@/components/ListingMap"

export default {

  components: {
    SearchForm,
    PickList,
    ListingMap,
  },

  computed: {
    ...mapState('listingMap', [
      'geocode'
    ]),

    ...mapState('listingSearch', [
      'searchParams'
    ]),

    location() {
      return get(this.geocode, 'results[0].geometry.location')
    },

    viewport() {
      return get(this.geocode, 'results[0].geometry.viewport')
    }
  },

  data() {
    return {
      google: null,
      geocoder: null
    }
  },

  async mounted() {
    this.google = await this.loadGoogle()
    this.createGeocoder()
    this.geocodeMap({ geocoder: this.geocoder, request: { address: this.searchParams.location_search_field } })
    this.searchListings(this.searchParams)
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
