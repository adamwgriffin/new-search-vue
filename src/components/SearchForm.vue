<template>
  <div class="search-form">
    <form autocomplete="off" @submit.prevent="">
      <SearchField
        :locationSearchField="searchParams.location_search_field"
        :autocompleteOptions="autocompleteOptions"
        @inputChanged="handleSearchFieldInputChanged"
        @autocompletePlaceChanged="handleAutocompletePlaceChanged"
      />
      <SearchButton @click.native="handleSearchButtonClicked">🔎</SearchButton>
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

  computed: {
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
    ...mapMutations('listingMap', ['setGeotype', 'setLocation', 'setViewport']),

    ...mapMutations('listingSearch', ['updateLocationSearchField', 'resetListings']),

    ...mapActions('listingSearch', ['searchListings']),

    ...mapActions('listingMap', ['geocodeMap', 'getGeoLayer']),

    handleSearchFieldInputChanged(e) {
      this.updateLocationSearchField(e)
    },

    async handleAutocompletePlaceChanged(e) {
      this.updateLocationSearchField(e.locationSearchField)
      this.resetListings()
      this.searchListings(this.searchParams)
      /* if the dropdown is open, but the user searches without selecting an option, the "place_changed" event can still
      be triggered, but it will not have a geometry. it will only have a "name" property with the current value of the
      input field */
      const { address_components, geometry } = e.autocompletePlace
      if (address_components && geometry) {
        this.setGeotype(address_components[0].types[0])
        this.setLocation(geometry.location)
        this.setViewport(geometry.viewport)
      } else {
        await this.geocodeMap({ address: this.searchParams.location_search_field })
      }
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
