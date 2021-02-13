<template>
  <label
    class="mdc-text-field 
      mdc-text-field--outlined 
      mdc-text-field--no-label 
      full-width-with-label 
      mdc-text-field--with-leading-icon"
  >
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading"></span>
      <span class="mdc-notched-outline__trailing"></span>
    </span>
    <i
      class="material-icons mdc-text-field__icon mdc-text-field__icon--leading"
      tabindex="0"
      role="button"
      @click="handSearchButtonClicked"
    >
      search
    </i>
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
      placeholder="City, neighborhood, ZIP"
    >
    <i
      v-show="locationSearchField"
      class="material-icons mdc-text-field__icon mdc-text-field__icon--trailing"
      tabindex="0"
      role="button"
      @click="clearForm"
    >
      clear
    </i>
  </label>
</template>

<script>
import { MDCTextField } from '@material/textfield'

export default {
  props: ['locationSearchField', 'autocompleteOptions'],

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
      console.log("handleEnter()", e)
      this.$emit('inputChanged', e.target.value)
      // TODO: create a different event for this, so there's no confusion about what's happening here. also add comments
      // to eplain why we're doing it.
      this.$emit('searchButtonClicked')
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
  @include textfield.outline-color(lightgray);
}

/* different than mdc-text-field--fullwidth, which doesn't allow the label to display */
.full-width-with-label {
  width: 100%;

  @include textfield.outline-shape-radius(8px);
}
</style>
