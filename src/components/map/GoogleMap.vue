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
    bounds: {
      type: Object,
    },

    mapOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      map: null,
      boundsChangedListener: null,
    }
  },

  watch: {
    bounds(newBounds) {
      newBounds && this.updateMapPosition(newBounds)
    }
  },

  mounted() {
    // TODO: viewport props should maybe be set in the options of the map when creating it too
    this.map = new google.maps.Map(this.$el, this.mapOptions)
    this.boundsChangedListener = google.maps.event.addListener(this.map, 'bounds_changed', this.handleBoundsChanged)
  },

  destroyed() {
    google.maps.event.removeListener(this.boundsChangedListener)
  },

  methods: {
    updateMapPosition(bounds) {
      this.map.setCenter(bounds.getCenter())
      // sets the viewport to contain the given bounds
      this.map.fitBounds(bounds)
    },

    handleBoundsChanged() {
      this.$emit('boundsChanged', this.map.getBounds().toJSON())
    }
  }
}
</script>
