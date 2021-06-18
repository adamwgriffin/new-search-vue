<template>
  <div v-if="googleLoaded" id="search">
    <div class="form-and-search-results">
      <ProgressBar :active="listingSearchPending" />
      <Form />
      <SearchResults
        :listingsLoaded="listings.length"
        :availableListings="mapListings.length"
        @loadMoreListings="getMoreListings"
      >
        <ListingCards :listings="listings" />
        <div class="listings-loading">
          <DotIndicator v-if="getMoreListingsPending" />
        </div>
      </SearchResults>
    </div>
    <ListingMap />
  </div>
  <!-- NOTE: we could render a skeletal layout here in a v-else block when googleLoaded is false so that the user sees
  something on first paint if google takes a noticeable amount of time to load, but so far it's pretty much
  instantaneous -->
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { loadGoogle } from '@/lib/google'
import ProgressBar from '@/components/ProgressBar'
import Form from '@/containers/Form'
import SearchResults from '@/components/SearchResults'
import ListingCards from '@/components/listings/ListingCards'
import ListingMap from '@/containers/ListingMap'
import DotIndicator from '@/components/shared/DotIndicator'

export default {
  components: {
    Form,
    SearchResults,
    ListingCards,
    ListingMap,
    DotIndicator,
    ProgressBar,
  },

  props: {
    environment: {
      type: Object,
      required: true
    },
  },

  data() {
    return {
      googleLoaded: false
    }
  },

  computed: {
    ...mapState('listingSearch', [
      'listings',
      'mapListings',
      'listingSearchPending',
      'getMoreListingsPending'
    ])
  },

  async mounted() {
    this.setEnvironment(this.environment)
    /* we wait to render the content in the view that depends on the google maps api until the api is loaded, that way
    the "google" variable will be defined for any of the components need to create instances of google maps classes,
    e.g., `new google.maps.Map()` */
    try {
      this.googleLoaded = await loadGoogle()
    } catch (error) {
      console.error("Unable to load Google Maps API", error)
    }
  },

  methods: {
    ...mapMutations(['setEnvironment']),

    ...mapActions('listingSearch', ['getMoreListings'])
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

.form-and-search-results {
  display: flex;
  flex-direction: column;
  width: 65%;
  background: #f6f6f6;
}

.listings-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
}
</style>
