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
      userChangedZoom: true,
    }
  },

  watch: {
    bounds(newBounds) {
      newBounds && this.updateMapPosition(newBounds)
    }
  },

  mounted() {
    this.map = new google.maps.Map(this.$el, this.mapOptions)
    this.createEventListeners()
  },

  destroyed() {
    this.destroyEventListeners()
  },

  methods: {
    createEventListeners() {
      this.dragstartListener = google.maps.event
        .addListener(this.map, 'dragstart', this.handleDragstart)
      this.dragendListener = google.maps.event
        .addListener(this.map, 'dragend', this.handleDragend)
      this.zoomChangedListener = google.maps.event
        .addListener(this.map, 'zoom_changed', this.handleZoomChanged)
      this.idleListener = google.maps.event
        .addListener(this.map, 'idle', this.handleIdle)
    },

    destroyEventListeners() {
      google.maps.event.removeListener(this.dragstartListener)
      google.maps.event.removeListener(this.dragendListener)
      google.maps.event.removeListener(this.zoomChangedListener)
      google.maps.event.removeListener(this.idleListener)
    },

    updateMapPosition(bounds) {
      this.userChangedZoom = false
      // sets the viewport to contain the given bounds
      this.map.fitBounds(bounds)
    },

    handleZoomChanged() {
      // the "zoom_changed" event fires regardless of whether the user changed it or we changed it programmatically when
      // calling map.fitBounds(). we only want to handle user generated zoom events, so we set the userChangedZoom flag
      // to false before calling fitBounds then set it back to true after the zoom event from that action is triggered.
      if (this.userChangedZoom) {
        this.$emit('userChangedZoom', this.getMapData())
      } else {
        // flag was false so set it back to true for next time
        this.userChangedZoom = true
      }
    },

    handleDragstart() {
      this.$emit('dragstart')
    },

    handleDragend() {
      this.$emit('dragend', this.getMapData())
    },

    handleIdle() {
      this.$emit('idle', this.getMapData())
    }, 

    getMapData() {
      return {
        bounds: this.map.getBounds().toJSON(),
        center: this.map.getCenter().toJSON(),
        zoom: this.map.getZoom(),
      }
    },
  }
}
</script>
