<template>
  <input
    type="text"
    id="location-search-field"
    name="location_search_field"
    ref="locationSearchField"
    :value="searchParams.location_search_field"
    @input="handleLocationInput"
  >
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { autocompleteOptions } from '@/config/google'

export default {
  props: ['google'],

  watch: {
    google() {
      !this.autocomplete && this.initAutoComplete()
    }
  },

  computed: {
    ...mapState('listingMap', [
      'autocomplete',
      'autocompletePlace',
      'autocompleteListener'
    ]),

    ...mapState('listingSearch', [
      'searchParams'
    ])
  },

  destroyed() {
    this.autocompleteListener?.remove()
    this.setAutocompleteListener(null)
  },

  methods: {
    ...mapMutations('listingMap', [
      'setAutocomplete',
      'setAutocompletePlace',
      'setAutocompleteListener',
      'moveMap'
    ]),
    
    ...mapMutations('listingSearch', [
      'updateLocationSearchField'
    ]),

    ...mapActions('listingSearch', ['searchListings']),

    handlePlaceChanged() {
      this.setAutocompletePlace(this.autocomplete.getPlace())
      this.updateLocationSearchField(this.$refs.locationSearchField.value)
      const { location, viewport } = this.autocompletePlace.geometry
      this.moveMap({ location, viewport })
      this.searchListings(this.searchParams)
    },

    initAutoComplete() {
      this.setAutocomplete(new this.google.maps.places.Autocomplete(this.$refs.locationSearchField, autocompleteOptions))
      this.setAutocompleteListener(this.autocomplete.addListener('place_changed', this.handlePlaceChanged))
    },

    handleLocationInput(e) {
      this.updateLocationSearchField(e.target.value)
    }
  }
}
</script>

<style scoped>
#location-search-field {
  height: 2.2rem;
  width: 40%;
  padding: 0rem .8rem;
  font-size: 1rem;
}
</style>
