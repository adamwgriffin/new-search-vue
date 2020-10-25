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
    google: {
      type: Object,
      required: true
    },

    /* TODO: get rid of null here. I think it's only necessary if you make the prop required */
    location: {
      type: [Object, null]
    },
    
    viewport: {
      type: [Object, null]
    }
  },

  data() {
    return {
      map: null
    }
  },

  watch: {
    location(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.moveMap(this.location, this.viewport)
      }
    }
  },

  async mounted() {
    this.map = new this.google.maps.Map(this.$el)
    if (this.location && this.viewport) this.moveMap(this.location, this.viewport)
  },

  methods: {

    // TODO: this probably needs a better name and needs to be less specific, but I don't know how to change it yet
    moveMap(location, viewport) {
      this.map.setCenter(location)
      this.map.fitBounds(viewport)
    }

  }
}
</script>

<style scoped>
#google-map {
  width: 35%;
}
</style>
