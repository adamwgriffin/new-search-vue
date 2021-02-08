<template>
  <input
    type="text"
    id="location-search-field"
    name="location_search_field"
    ref="locationSearchField"
    :value="locationSearchField"
    @input="handleLocationInput"
    @keydown.enter="handleEnter"
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

    /* if any of the dom nodes for .pac-container are visible, it means that the dropdown is open. there seems to be no
    way to check this programmatically with the api, so we are forced to resort to this instead. this solution is based
    on: https://stackoverflow.com/a/33357188/1536368 */
    autocompleteDropdownOpen() {
      return Array.from(document.getElementsByClassName('pac-container'))
        .some(node => node.offsetParent !== null)
    },

    /* if the user selects an autocomplete dropdown item with the keyboard using the enter key, it will submit the form,
    as well as cause the autocomplete to trigger a "place_changed" event. this causes the the autocomplete value that
    was selected, as well as the partial text that was typed into the input, to be searched one after the other. */
    handleEnter(e) {
      /* if you open the dropdown with the arrow keys, select a value with the keyboard, then close the dropdown with
      the escape key, you can get some weird behavior after hitting enter. for some reason it will trigger the search
      button's click hander. location_search_field will not be updated yet in the store, so it will not search the value
      that was entered into the field. calling inputChanged makes sure that location_search_field gets updated with the
      latest value in the input. */
      this.$emit('inputChanged', e.target.value)
      /* calling preventDefault() stops the form submission event, so that only the "place_changed" event triggers the
      search. we don't want the form submission event in this scenario because calling autocomplete.getPlace() will give
      us the geometry for the selection so we don't have to look it up later. in some situations the dropdown may be
      open but nothing will have been selected when the enter event is triggered. in that case there will be no geometry
      returned from autocomplete.getPlace(), which we deal with in our "autocompletePlaceChanged" handler that actually
      does the search */
      if (this.autocompleteDropdownOpen()) e.preventDefault()
    },

    initAutoComplete() {
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
