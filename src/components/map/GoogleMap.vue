<template>
  <div id="google-map">
    <slot v-if="map"></slot>
  </div>
</template>

<script>
import { ReactiveProvideMixin } from 'vue-reactive-provide'

export default {
  mixins: [
    /* this mixin allows Vue's provide/inject bindings to be reactive. this is needed because the initial value of
    this.map is null until we create the map in the mounted() hook. if map isn't reactive it will always be null in the
    child components that use it via inject */
    ReactiveProvideMixin({
      name: 'GoogleMap',
      include: ['map'],
    })
  ],

  props: {
    viewportBounds: {
      type: Object,
    },

    mapOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      map: null
    }
  },

  watch: {
    viewportBounds(newBounds, oldBounds) {
      newBounds && this.updateViewportMapPosition(newBounds)
    }
  },

  mounted() {
    // TODO: viewport props should maybe be set in the options of the map when creating it too
    this.map = new google.maps.Map(this.$el, this.mapOptions)
  },

  methods: {
    /* calling setCenter() with bounds.getCenter(), then calling fitBounds() right after seems to make for the best
    user experience with the map. before we were using a seprate location object from the geocoder results, and
    setting each of these separately when the different props updated. that method caused the map to move then zoom in
    kind of a jarring way if the viewport needed to be adjusted for the new polygon bounds. doing it this way looks
    much more smooth. not sure why. */
    updateViewportMapPosition(bounds) {
      this.map.setCenter(bounds.getCenter())
      // sets the viewport to contain the given bounds
      this.map.fitBounds(bounds)
    }
  }
}
</script>
