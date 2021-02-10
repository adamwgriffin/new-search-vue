<template>
  <div id="google-map">
    <!-- using scoped slots. binding the "map" data attribute here makes it available to the slot content in the parent
    component (in this case Search) via the v-slot directive -->
    <slot v-if="map" :map="map"></slot>
  </div>
</template>

<script>
export default {

  props: {
    location: {
      type: Object
    },

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
      map: null
    }
  },

  watch: {
    location(newValue, oldValue) {
      this.map.setCenter(this.location)
    },

    bounds(newValue, oldValue) {
      this.map.fitBounds(this.bounds)
    }
  },

  async mounted() {
    // TODO: location and viewport should maybe just be options of the map
    this.map = new google.maps.Map(this.$el, this.mapOptions)
  }
}
</script>
