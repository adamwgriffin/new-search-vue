<template>
  <div class="search-form">
    <form autocomplete="off">
      <SearchField
        :google="google"
        :locationSearchField="searchParams.location_search_field"
        :autocompleteOptions="autocompleteOptions"
        @inputChanged="handleSearchFieldInputChanged"
        @autocompletePlaceChanged="handleAutocompletePlaceChanged"
      />
      <search-button @click="handleSearchButtonClicked">Search</search-button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { autocompleteOptions } from '@/config/google'
import SearchField from '@/components/SearchField'
import SearchButton from '@/components/SearchButton'

export default {
  components: { SearchField, SearchButton },

  props: ['google', 'geocoder'],

  computed: {
    ...mapGetters('listingMap', ['geotype']),

    ...mapState('listingMap', [
      'center_lat',
      'center_lon',
      'geotype',
      'buffer_miles'
    ]),

    ...mapState('listingSearch', [
      'searchParams'
    ]),

    autocompleteOptions: () => autocompleteOptions
  },

  methods: {
    ...mapMutations('listingMap', ['setLocation', 'setViewport']),

    ...mapMutations('listingSearch', ['updateLocationSearchField', 'resetListings']),

    ...mapActions('listingSearch', ['searchListings']),

    ...mapActions('listingMap', ['geocodeMap', 'getGeoLayer']),

    handleSearchFieldInputChanged(e) {
      this.updateLocationSearchField(e)
    },

    handleAutocompletePlaceChanged(e) {
      this.resetListings()
      this.updateLocationSearchField(e.locationSearchField)
      this.searchListings(this.searchParams)
      const { location, viewport } = e.autocompletePlace.geometry
      this.setLocation(location)
      this.setViewport(viewport)
    },

    handleSearchButtonClicked() {
      this.geocodeMap({
      this.resetListings()
        geocoder: this.geocoder,
        request: { address: this.searchParams.location_search_field }
      })
      this.getGeoLayer({
        center_lat: this.center_lat,
        center_lon: this.center_lon,
        geotype: this.geotype,
        buffer_miles: this.buffer_miles,
        source: 'agent website'
      })
      this.searchListings(this.searchParams)
    }
  }
}
</script>

<style scoped>
form {
  padding: 1rem;
  border-bottom: solid 1px gray;
}
</style>
