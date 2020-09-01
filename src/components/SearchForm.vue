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
import { mapState, mapMutations, mapActions } from 'vuex'
import { autocompleteOptions } from '@/config/google'
import SearchField from '@/components/SearchField'
import SearchButton from '@/components/SearchButton'

export default {
  components: { SearchField, SearchButton },

  props: ['google', 'geocoder'],

  computed: {
    ...mapState('listingMap', [
      'geocode'
    ]),

    ...mapState('listingSearch', [
      'searchParams'
    ]),

    autocompleteOptions: () => autocompleteOptions
  },

  methods: {
    ...mapMutations('listingMap', ['setLocation', 'setViewport']),

    ...mapMutations('listingSearch', ['updateLocationSearchField']),

    ...mapActions('listingSearch', ['searchListings']),

    ...mapActions('listingMap', ['geocodeMap']),

    handleSearchFieldInputChanged(e) {
      this.updateLocationSearchField(e)
    },

    handleAutocompletePlaceChanged(e) {
      this.updateLocationSearchField(e.locationSearchField)
      this.searchListings(this.searchParams)
      const { location, viewport } = e.autocompletePlace.geometry
      this.setLocation(location)
      this.setViewport(viewport)
    },

    handleSearchButtonClicked() {
      this.searchListings(this.searchParams)
      this.geocodeMap({ geocoder: this.geocoder, request: { address: this.searchParams.location_search_field } })
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
