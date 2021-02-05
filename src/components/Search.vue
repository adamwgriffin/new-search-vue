<template>
  <div id="search">
    <div class="search-results">
      <SearchForm :google="google" :geocoder="geocoder" />
      <PickListHeading :countEnd="listings.length" :total="listings.length" />
      <PickList>
        <ListingCards :listings="listings" />
      </PickList>
    </div>
    <ListingMap v-if="google" :google="google" />
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
import { mapState, mapMutations, mapActions } from 'vuex'
import { mapLoaderOptions } from '@/config/google'
import SearchForm from "@/components/SearchForm"
import PickListHeading from '@/components/PickListHeading'
import PickList from '@/components/PickList'
import ListingMap from "@/components/ListingMap"
import ListingCards from '@/components/ListingCards'

export default {
  components: {
    SearchForm,
    PickListHeading,
    PickList,
    ListingMap,
    ListingCards
  },

  props: {
    serviceBase: {
      type: String,
      required: true
    },

    serviceVersion: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      google: null,
      geocoder: null
    }
  },

  computed: {
    ...mapState('listingSearch', [
      'searchParams',
      'listings'
    ])
  },

  async mounted() {
    this.setServiceBase(this.serviceBase)
    this.setServiceVersion(this.serviceVersion)
    this.google = await this.loadGoogle()
    this.createGeocoder()
    // this.searchListings(this.searchParams)
    // this.geocodeMap({ geocoder: this.geocoder, request: { address: this.searchParams.location_search_field } })
  },

  methods: {
    ...mapMutations(['setServiceBase', 'setServiceVersion']),

    ...mapActions('listingMap', ['geocodeMap']),

    ...mapActions('listingSearch', ['searchListings']),

    /* the google variable is actually global once the script is loaded but we're treating it as if it wasn't. instead,
    we're assigning it to an instance variable and passing it down to other components as props. we're doing this
    because most examples that use Google Maps inside a javascript framework do it this way, so I'm assuming that they
    do it for a good reason. we don't want to keep google in the store because complex, stateful objects don't work well
    with Vuex, and putting them in the store is discouraged. */
    async loadGoogle() {
      if (typeof google === 'undefined') await new Loader(mapLoaderOptions).load()
      return google
    },

    createGeocoder() {
      this.geocoder = new this.google.maps.Geocoder()
    }
  }
}
</script>

<style scoped>
#search {
  /* if html, body & parent are all height 100% & parent is display: flex, then #search will also be 100% wthout having
  to specify it's own height. display: flex in turn allows this element's child, .search-results to also have 100%
  height without specifying it. flex also causes the divs for each column to sit side-by-side */
  display: flex;
  /* width is necessary, otherwise the whole layout shrinks down */
  width: 100%;
}

.search-results {
  display: flex;
  flex-direction: column;
  width: 65%;
  background: #f6f6f6;
}
</style>
