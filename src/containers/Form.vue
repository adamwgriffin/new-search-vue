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
        />
        <BedroomsBathrooms
          :value="bedBathParams"
          @input="setSearchParams($event)"
        />
        <MoreFilters />
      </Filters>
      <SaveSearchButton />
    </div>
    <SearchResultsInfo
      :listingsLoaded="listingsFilteredByMapBounds.length"
      :availableListings="mapListingsFilteredByMapBounds.length"
      :params="searchResultsInfoParams"
      @change="setSearchParams($event)"
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
    ]),

    ...mapGetters('listingSearch', [
      'searchParamsForListingService',
      'priceRangeParams',
      'bedBathParams',
      'listingsFilteredByMapBounds',
      'mapListingsFilteredByMapBounds',
    ]),

    searchResultsInfoParams() {
      return { sort_by: this.searchParams.sort_by }
    },
  },

  methods: {
    ...mapMutations('listingMap', [
      'setGeocoderResult',
      'setAutcompletePlacePredictions'
    ]),

    ...mapMutations('listingSearch', [
      'setLocationSearchField',
      'setSearchParams',
      'resetListings'
    ]),

    ...mapActions('listingSearch', ['searchListings']),

    ...mapActions('listingMap', [
      'geocodeMap',
      'getGeoLayer',
      'getPlaceAutocompletePredictions',
      'getPlaceAutocompletePlaceDetails',
    ]),

    handleClearPlaceAutocompletePredictions() {
      this.setAutcompletePlacePredictions([])
    },

    // TODO: could maybe consolidate these into one handleSearchInitiated method that can optionally receive a place_id
    // in it's event. if the place_id is present we call getPlaceAutocompletePlaceDetails to get geocode info, otherwise
    // we call geocodeMap. setLocationSearchField could be handled by Search emitting an "input" event with the
    // description instead of setting it here.
    async handleOptionSelected(e) {
      this.setLocationSearchField(e.description)
      this.resetListings()
      await this.getPlaceAutocompletePlaceDetails(e.place_id)
      this.searchListings(this.searchParamsForListingService)
      this.getGeoLayer({
        center_lat: this.geocoderResult.location.lat,
        center_lon: this.geocoderResult.location.lng,
        geotype: this.geotype,
        buffer_miles: this.buffer_miles,
        source: 'agent website'
      })
    },

    async handleSearchInitiated() {
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
</style>
