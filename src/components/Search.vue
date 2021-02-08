<template>
  <div v-if="googleLoaded" id="search">
    <div class="search-results">
      <SearchForm />
      <PickListHeading :countEnd="listings.length" :total="listings.length" />
      <PickList>
        <ListingCards :listings="listings" />
      </PickList>
    </div>
    <ListingMap />
  </div>
  <!-- NOTE: we could render a skeletal layout here in a v-else block when googleLoaded is false so that the user sees
  something on first paint if google takes a noticeable amount of time to load, but so far it's pretty much
  instantaneous
  -->
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
import { mapState, mapMutations, mapActions } from 'vuex'
import { mapLoaderOptions } from '@/config/google'
import { setGeocoder } from '@/lib/geocode'
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
      googleLoaded: false
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
    /* we wait to render the content in the view that depends on the google maps api until the api is loaded, that way
    the "google" variable will be defined for any of the components need to create instances of google maps classes,
    e.g., `new google.maps.Map()` */
    this.googleLoaded = await this.loadGoogle()
    /* we have to set the geocoder in the geocode module after google is loaded. we can't create the geocoder instance
    inside of the store that uses this because it loads before this mounted hook can load the google api */
    setGeocoder(new google.maps.Geocoder())
    // this.searchListings(this.searchParams)
    // this.geocodeMap({ address: this.searchParams.location_search_field })
  },

  methods: {
    ...mapMutations(['setServiceBase', 'setServiceVersion']),

    ...mapActions('listingMap', ['geocodeMap']),

    ...mapActions('listingSearch', ['searchListings']),

    /* there is no npm module for the google maps api. you have to load it via a script tag. @googlemaps/js-api-loader
    just creates a nice interface that you can use to create the script tag dynamically, and returns a promise that will
    resolve once its loaded. this way you can execute whatever code depends on the api after the promise resolves. */
    async loadGoogle() {
      if (typeof google === 'undefined') await new Loader(mapLoaderOptions).load()
      return true
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
