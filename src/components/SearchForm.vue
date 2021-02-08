<template>
  <div class="search-form">
    <form autocomplete="off">
      <SearchField
        :locationSearchField="searchParams.location_search_field"
        :autocompleteOptions="autocompleteOptions"
        @inputChanged="handleSearchFieldInputChanged"
        @autocompletePlaceChanged="handleAutocompletePlaceChanged"
      />
      <SearchButton @click="handleSearchButtonClicked">🔎</SearchButton>
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

  computed: {
    ...mapGetters('listingMap', ['geotype']),

    ...mapState('listingMap', [
      'location',
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
      this.getGeoLayer({
        center_lat: this.location.lat,
        center_lon: this.location.lng,
        geotype: this.geotype,
        buffer_miles: this.buffer_miles,
        source: 'agent website'
      })
    },

    async handleSearchButtonClicked() {
      this.resetListings()
      this.searchListings(this.searchParams)
      await this.geocodeMap({ address: this.searchParams.location_search_field })
      this.getGeoLayer({
        center_lat: this.location.lat,
        center_lon: this.location.lng,
        geotype: this.geotype,
        buffer_miles: this.buffer_miles,
        source: 'agent website'
      })
    }
  }
}
</script>

<style scoped>
.search-form {
  background: white;
  padding: .8rem;
}
</style>
