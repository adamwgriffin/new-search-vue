<template>
  <input
    type="text"
    id="location-search-field"
    name="location_search_field"
    ref="locationSearchField"
    :value="locationSearchField"
    @input="handleLocationInput"
  >
</template>

<script>

export default {
  props: ['google', 'locationSearchField', 'autocompleteOptions'],

  data() {
    return {
      autocomplete: null,
      autocompletePlace: null,
      autocompleteListener: null
    }
  },

  watch: {
    google() {
      !this.autocomplete && this.initAutoComplete()
    }
  },

  destroyed() {
    this.autocompleteListener?.remove()
  },

  methods: {
    
    handlePlaceChanged() {
      this.autocompletePlace = this.autocomplete.getPlace()
      this.$emit(
        'autocompletePlaceChanged',
        {
          autocompletePlace: this.autocompletePlace,
          locationSearchField: this.$refs.locationSearchField.value
        }
      )
    },

    initAutoComplete() {
      this.autocomplete = new this.google.maps.places.Autocomplete(
        this.$refs.locationSearchField,
        this.autocompleteOptions
      )
      this.autocompleteListener = this.autocomplete.addListener('place_changed', this.handlePlaceChanged)
    },

    handleLocationInput(e) {
      this.$emit('inputChanged', e.target.value)
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
