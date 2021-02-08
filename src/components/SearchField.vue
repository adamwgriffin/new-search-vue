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
  props: ['locationSearchField', 'autocompleteOptions'],

  data() {
    return {
      autocomplete: null,
      autocompletePlace: null,
      autocompleteListener: null
    }
  },

  mounted() {
    this.initAutoComplete()
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

    handleEnter(e) {
      console.log('handleEnter()')
      /* if the user selects an autocomplete dropdown item with the keyboard using the enter key it will submit the
      form, causing both the partial value that was typed as well as the autocomplete value that was selected to both be
      searched since both the form submit and "place_changed" events fire. this code prevents the form submission event
      if any of the dom nodes for the autocomplete dropdown are visible, meaning that the dropdown is open. seem like a
      lame solution but most of the other solutions users have posted on SO are some variation of this.  */
      const googleDOMNodes = document.getElementsByClassName('pac-container')
      const googleDOMNodeIsVisible = Array.from(googleDOMNodes).some(node => node.offsetParent !== null)
      if (googleDOMNodeIsVisible) {
        e.preventDefault()
      } else {
        this.$emit('inputChanged', e.target.value)
      }
    },

    async initAutoComplete() {
      this.autocomplete = new google.maps.places.Autocomplete(this.$refs.locationSearchField, this.autocompleteOptions)
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
  background: rgb(246, 246, 246);
  border: solid gray 1px;
}
</style>
