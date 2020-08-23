<template>
  <div class="search-form">
    <form autocomplete="off">
      <div>
        <input
          type="text"
          id="location-search-field"
          name="location_search_field"
          ref="locationSearchField"
          :value="searchParams.location_search_field"
          @input="handleLocationInput"
        >
        <button id="search-button" @click.prevent="search">Search</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { autocompleteOptions } from '@/config/autoCompleteOptions'

export default {
  watch: {
    google() {
      !this.autocomplete && this.initAutoComplete()
    }
  },

  computed: {
    ...mapState('listingMapModule', [
      'google',
      'listingMap',
      'geocoder',
      'geocodeResponse',
      'markers',
      'autocomplete',
      'autocompletePlace',
    ]),

    ...mapState('listingSearchModule', [
      'searchParams'
    ])
  },

  mounted() {
    this.searchListings(this.searchParams)
  },

  methods: {
    ...mapMutations('listingMapModule', [
      'setGeocoderResponse',
      'setAutocomplete',
      'setAutocompletePlace',
    ]),
    
    ...mapMutations('listings', [
      'updateLocationSearchField'
    ]),

    ...mapActions('listingSearchModule', ['searchListings']),

    moveMap(location, viewport) {
      this.listingMap.setCenter(location)
      this.listingMap.fitBounds(viewport)
    },

    handlPlaceChanged() {
      this.setAutocompletePlace(this.autocomplete.getPlace())
      this.updateLocationSearchField(this.$refs.locationSearchField.value)
      this.moveMap(this.autocompletePlace.geometry.location, this.autocompletePlace.geometry.viewport)
    },

    initAutoComplete() {
      this.setAutocomplete(
        new this.google.maps.places.Autocomplete(this.$refs.locationSearchField, autocompleteOptions)
      )
      this.autocomplete.addListener('place_changed', this.handlPlaceChanged)
    },

    handleLocationInput(e) {
      this.updateLocationSearchField(e.target.value)
    },

    search() {
      this.geocodeMap({ 'address': this.searchParams.location_search_field })
      this.searchListings(this.searchParams)
    },

    geocodeMap(request) {
      this.geocoder.geocode(request, (results, status) => {
        this.setGeocoderResponse({ request, results, status })
        if (status !== google.maps.GeocoderStatus.OK || !results[0]) {
          throw new Error(status)
        }
        this.moveMap(results[0].geometry.location, results[0].geometry.viewport)
      })
    }
  }
}
</script>

<style scoped>
form {
  padding: 1rem;
  border-bottom: solid 1px gray;
}

#location-search-field {
  height: 2.2rem;
  width: 40%;
  padding: 0rem .8rem;
  font-size: 1rem;
}

#search-button {
  margin-left: 1rem;
  width: 5rem;
  height: 2.2rem;
  border-radius: .5rem;
  background: gray;
  color: white;
  font-size: 1rem;
}
</style>
