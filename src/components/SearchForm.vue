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
import { autocompleteOptions } from '@/config/google'

export default {
  watch: {
    googleMap() {
      !this.autocomplete && this.initAutoComplete()
    }
  },

  computed: {
    ...mapState('listingMap', [
      'googleMap',
      'geocoder',
      'geocodeResponse',
      'markers',
      'autocomplete',
      'autocompletePlace',
      'autocompleteListener'
    ]),

    ...mapState('listingSearch', [
      'searchParams'
    ])
  },

  mounted() {
    this.searchListings(this.searchParams)
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

    ...mapActions('listingMap', ['setMapLocation']),

    ...mapActions('listingSearch', ['searchListings']),

    handlePlaceChanged() {
      this.setAutocompletePlace(this.autocomplete.getPlace())
      this.updateLocationSearchField(this.$refs.locationSearchField.value)
      const { location, viewport } = this.autocompletePlace.geometry
      this.moveMap({ location, viewport })
      this.searchListings(this.searchParams)
    },

    initAutoComplete() {
      this.setAutocomplete(
        new google.maps.places.Autocomplete(this.$refs.locationSearchField, autocompleteOptions)
      )
      this.setAutocompleteListener(
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged)
      )
    },

    handleLocationInput(e) {
      this.updateLocationSearchField(e.target.value)
    },

    search() {
      this.setMapLocation({ address: this.searchParams.location_search_field })
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
