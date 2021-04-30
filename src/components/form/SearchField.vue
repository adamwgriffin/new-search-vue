<template>
  <label
    id="search-field"
    class="mdc-text-field 
      mdc-text-field--outlined 
      mdc-text-field--no-label 
      mdc-text-field--with-leading-icon"
  >
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading"></span>
      <span class="mdc-notched-outline__trailing"></span>
    </span>
    <button
      id="submit-button"
      class="mdc-text-field__icon mdc-text-field__icon--leading"
      type="submit"
      form="search-form"
      value="Submit"
      tabindex="0"
      @click="handSearchButtonClicked"
      title="Apply search"
    >
      <i class="material-icons" aria-hidden="true">search</i>
    </button>
    <input
      type="text"
      id="location-search-field"
      class="mdc-text-field__input"
      name="location_search_field"
      aria-labelledby="label"
      ref="locationSearchField"
      :value="locationSearchField"
      @input="handleLocationInput"
      @keydown.enter="handleEnter"
      :placeholder="$t('location_placeholder.websites')"
    >
    <i
      v-show="locationSearchField"
      class="material-icons mdc-text-field__icon mdc-text-field__icon--trailing"
      tabindex="0"
      role="button"
      @click="clearForm"
      title="Clear field"
    >
      clear
    </i>
  </label>
</template>

<script>
import { MDCTextField } from '@material/textfield'

export default {
  props: {
    locationSearchField: {
      type: String,
    },

    autocompleteOptions: {
      type: Object
    },

    bounds: {
      type: Object
    }
  },

  data() {
    return {
      textField: null,
      icon: null,
      autocomplete: null,
      autocompletePlace: null,
      autocompleteListener: null
    }
  },

  mounted() {
    this.textField = new MDCTextField(this.$el)
    this.initAutoComplete()
  },

  destroyed() {
    this.autocompleteListener?.remove()
  },

  watch: {
    bounds(newBounds) {
      // sets the preferred area within which to return place results. results are biased towards, but not restricted
      // to, this area. we are passing the mapBounds for the bounds to bias results to the map viewport
      this.autocomplete.setBounds(newBounds)
    }
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
    },

    async clearForm() {
      this.$emit('inputChanged', '')
      // we have to wait for this component to re-render with the new '' value for locationSearchField we just emitted.
      // otherwise when we call focus the dropdown will open with results for the value we just cleared. 
      await this.$nextTick()
      this.$refs.locationSearchField.focus()
    },

    handSearchButtonClicked(e) {
      this.$emit('searchButtonClicked')
    } 
  }
}
</script>

<style lang="scss" scoped>
@use "@material/theme" with (
  $primary: blue
);
@use "@material/line-ripple/mdc-line-ripple";
@use "@material/notched-outline/mdc-notched-outline";
@use "@material/textfield";
@use "@material/textfield/icon";

@include textfield.core-styles;
@include icon.icon-core-styles;

.mdc-text-field {
  @include textfield.outlined-with-leading-icon-height(48px);
  @include textfield.outline-color(lightgray);
  @include textfield.hover-outline-color(silver);
  @include textfield.fill-color(#fefefe);
  @include textfield.outline-shape-radius(8px);
  flex-grow: 1;
}

#submit-button {
  border: none;
  background: none;
  padding: 0;
}
</style>
