<template>
  <form id="search-form" autocomplete="off" @submit.prevent="">
    <div class="search-field-and-filters">
      <SearchField
        :value="location_search_field"
        :options="autcompletePlacePredictions"
        :placeholder="$t('location_placeholder.websites')"
        @input="setLocationSearchField"
        @getPlaceAutocompletePredictions="getPlaceAutocompletePredictions"
        @clearPlaceAutocompletePredictions="handleClearPlaceAutocompletePredictions"
        @optionSelected="handleOptionSelected"
        @searchInitiated="handleSearchInitiated"
      />
      <Filters>
        <PriceRange
          :value="priceRangeParams"
          @input="setSearchParams($event)"
          @searchInitiated="handleSearchInitiated"
        />
        <BedroomsBathrooms
          :value="bedBathParams"
          @input="setSearchParams($event)"
          @searchInitiated="handleSearchInitiated"
        />
        <MoreFilters @searchInitiated="handleSearchInitiated" />
      </Filters>
      <SaveSearchButton />
    </div>
    <SearchResultsInfo
      :listingsLoaded="listings.length"
      :availableListings="mapListings.length"
      :params="searchResultsInfoParams"
      @change="handleSortMenuChange"
    />
  </form>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Filters from '@/components/form/filters/Filters'
import SearchField from '@/components/form/SearchField'
import PriceRange from '@/components/form/filters/PriceRange'
import BedroomsBathrooms from '@/components/form/filters/BedroomsBathrooms'
import MoreFilters from '@/containers/MoreFilters'
import SaveSearchButton from '@/components/form/SaveSearchButton'
import SearchResultsInfo from '@/components/form/SearchResultsInfo'

export default {
  components: {
    SearchField,
    Filters,
    PriceRange,
    BedroomsBathrooms,
    MoreFilters,
    SaveSearchButton,
    SearchResultsInfo
  },

  computed: {
    ...mapState('listingMap', [
      'buffer_miles',
      'geocoderResult',
      'mapBounds',
      'autcompletePlacePredictions',
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

    searchResultsInfoParams() {
      return { sort_by: this.searchParams.sort_by }
    },
  },

  methods: {
    ...mapMutations('listingMap', [
      'setGeocoderResult',
      'setAutcompletePlacePredictions',
      'setBoundaryActive'
    ]),

    ...mapMutations('listingSearch', [
      'setLocationSearchField',
      'setSearchParams',
      'resetListings',
      'setDoListingSearchOnMapIdle'
    ]),

    ...mapActions('listingSearch', [
      'doGeospatialGeocodeSearch',
      'cancelActiveSearchListingRequests'
    ]),

    ...mapActions('listingMap', [
      'getPlaceAutocompletePredictions',
      'getPlaceAutocompletePlaceDetails'
    ]),

    handleClearPlaceAutocompletePredictions() {
      this.setAutcompletePlacePredictions([])
    },

    async handleOptionSelected(e) {
      this.setBoundaryActive(true)
      this.setLocationSearchField(e.description)
      this.resetListings()
      this.doGeospatialGeocodeSearch()
    },

    async handleSearchInitiated() {
      this.setBoundaryActive(true)
      this.resetListings()
      this.doGeospatialGeocodeSearch()
    },

    async handleSortMenuChange(e) {
      if (e.sort_by === this.searchParams.sort_by) return
      this.setSearchParams(e)
      this.cancelActiveSearchListingRequests()
      this.resetListings()
      this.doGeospatialGeocodeSearch()
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
</style>
