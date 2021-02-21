<template>
  <form autocomplete="off" @submit.prevent="">
    <div class="search-field-and-filters">
      <SearchField
        :locationSearchField="searchParams.location_search_field"
        :autocompleteOptions="autocompleteOptions"
        @inputChanged="handleSearchFieldInputChanged"
        @autocompletePlaceChanged="handleAutocompletePlaceChanged"
        @searchButtonClicked="handleSearchButtonClicked"
      />
      <Filters>
        <div class="filters-container">
          <PriceRange
            :value="priceRangeParams"
            @input="setSearchParams($event)"
            title="Open dropdown to set price range"
          />
          <BedroomsBathrooms
            :value="bedBathParams"
            @input="setSearchParams($event)"
            title="Open dropdown to set minimum beds and baths"
          />
          <MoreFilters
            :searchParams="moreFiltersParams"
            @change="setSearchParams($event)"
            title="Open dropdown for more filter options"
          />
        </div>
      </Filters>
    </div>
    <SearchResultsInfo :listings="listings" />
  </form>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { autocompleteOptions } from '@/config/google'
import SearchField from '@/components/form/SearchField'
import Filters from '@/components/form/filters/Filters'
import PriceRange from '@/components/form/filters/PriceRange'
import BedroomsBathrooms from '@/components/form/filters/BedroomsBathrooms'
import MoreFilters from '@/components/form/filters/MoreFilters'
import SearchResultsInfo from '@/components/form/SearchResultsInfo'

export default {
  components: {
    SearchField,
    Filters,
    PriceRange,
    BedroomsBathrooms,
    MoreFilters,
    SearchResultsInfo,
  },

  computed: {
    ...mapState('listingMap', [
      'location',
      'geotype',
      'buffer_miles'
    ]),

    ...mapState('listingSearch', [
      'searchParams',
      'listings'
    ]),

    ...mapGetters('listingSearch', [
      'searchParamsForListingService',
      'priceRangeParams',
      'bedBathParams',
      'moreFiltersParams'
    ]),

    autocompleteOptions: () => autocompleteOptions
  },

  methods: {
    ...mapMutations('listingMap', ['setGeotype', 'setLocation', 'setViewport']),

    ...mapMutations('listingSearch', ['updateLocationSearchField', 'setSearchParams', 'resetListings']),

    ...mapActions('listingSearch', ['searchListings']),

    ...mapActions('listingMap', ['geocodeMap', 'getGeoLayer']),

    handleSearchFieldInputChanged(e) {
      this.setSearchParams({ location_search_field: e })
    },

    async handleAutocompletePlaceChanged(e) {
      this.setSearchParams({ location_search_field: e.locationSearchField })
      this.resetListings()
      this.searchListings(this.searchParamsForListingService)
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
      this.searchListings(this.searchParamsForListingService)
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
form {
  padding: .8rem;
}

.search-field-and-filters {
  display: flex;
}

.filters-container > * {
  padding-left: .5rem;
}
</style>
