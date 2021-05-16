<template>
  <form autocomplete="off" @submit.prevent="">
    <div class="search-field-and-filters">
      <SearchField
        :locationSearchField="location_search_field"
        :autocompleteOptions="autocompleteOptions"
        :bounds="mapBounds"
        @inputChanged="setLocationSearchField"
        @autocompletePlaceChanged="handleAutocompletePlaceChanged"
        @searchButtonClicked="handleSearchButtonClicked"
      />
      <Filters>
        <div class="filters-container">
          <PriceRange
            :value="priceRangeParams"
            @input="setSearchParams($event)"
          />
          <BedroomsBathrooms
            :value="bedBathParams"
            @input="setSearchParams($event)"
          />
          <MoreFilters />
        </div>
      </Filters>
    </div>
    <SearchResultsInfo
      :listingsLoaded="listings.length"
      :availableListings="mapListings.length"
      :params="searchResultsInfoParams"
      @change="setSearchParams($event)"
    />
  </form>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { autocompleteOptions } from '@/config/google'
import SearchField from '@/components/form/SearchField'
import Filters from '@/components/form/filters/Filters'
import PriceRange from '@/components/form/filters/PriceRange'
import BedroomsBathrooms from '@/components/form/filters/BedroomsBathrooms'
import MoreFilters from '@/containers/MoreFilters'
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
      'buffer_miles',
      'geocoderResult',
      'mapBounds',
    ]),

    ...mapGetters('listingMap', [
      'geotype',
    ]),

    ...mapState('listingSearch', [
      'searchParams',
      'location_search_field',
      'listings',
      'mapListings'
    ]),

    ...mapGetters('listingSearch', [
      'searchParamsForListingService',
      'priceRangeParams',
      'bedBathParams',
    ]),

    autocompleteOptions() {
      return { ...autocompleteOptions, bounds: this.apiResponseBounds }
    },

    searchResultsInfoParams() {
      return { sort_by: this.searchParams.sort_by }
    }
  },

  methods: {
    ...mapMutations('listingMap', ['setGeocoderResult']),

    ...mapMutations('listingSearch', [
      'setLocationSearchField',
      'setSearchParams',
      'resetListings'
    ]),

    ...mapActions('listingSearch', ['searchListings']),

    ...mapActions('listingMap', ['geocodeMap', 'getGeoLayer']),

    async handleAutocompletePlaceChanged(e) {
      this.setLocationSearchField(e.locationSearchField)
      this.resetListings()
      /* if the dropdown is open, but the user searches without selecting an option, the "place_changed" event can still
      be triggered, but it will not have a geometry. it will only have a "name" property with the current value of the
      input field */
      const { address_components, geometry } = e.autocompletePlace
      if (address_components && geometry) {
        this.setGeocoderResult({ types: address_components[0].types, geometry })
      } else {
        await this.geocodeMap({ address: this.location_search_field })
      }
      this.searchListings(this.searchParamsForListingService)
      this.getGeoLayer({
        center_lat: this.geocoderResult.location.lat,
        center_lon: this.geocoderResult.location.lng,
        geotype: this.geotype,
        buffer_miles: this.buffer_miles,
        source: 'agent website'
      })
    },

    async handleSearchButtonClicked() {
      this.resetListings()
      await this.geocodeMap({ address: this.location_search_field })
      this.searchListings(this.searchParamsForListingService)
      this.getGeoLayer({
        center_lat: this.geocoderResult.location.lat,
        center_lon: this.geocoderResult.location.lng,
        geotype: this.geotype,
        buffer_miles: this.buffer_miles,
        source: 'agent website'
      })
    }
  }
}
</script>

<style scoped>
.search-field-and-filters {
  display: flex;
  background: white;
  padding: .8rem;
}

.filters-container > * {
  padding-left: .5rem;
}
</style>
