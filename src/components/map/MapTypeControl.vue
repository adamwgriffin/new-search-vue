<template>
  
</template>

<script>
import { googleMap } from '@/lib/google'

export default {
  props: {
    position: {
      type: Number,
      default: 6
    }
  },

  data() {
    return {
      mapTypeControlDiv: null,
      controlsArrIndex: null,
    }
  },
  
  mounted() {
    this.createControl()
    this.addControlToMap()
  },

  destroyed() {
    googleMap.controls[this.position].removeAt(this.controlsArrIndex)
    this.mapTypeControlDiv.remove()
  },

  methods: {
    createControl() {
      this.mapTypeControlDiv = document.createElement("div")
      const mapTypeUI = document.createElement("div")
      mapTypeUI.id = "map-type-ui"
      mapTypeUI.title = "Change map type"
      this.mapTypeControlDiv.appendChild(mapTypeUI)
      const mapTypeText = document.createElement("div")
      mapTypeText.id = "map-type-text"
      mapTypeText.innerHTML = "Map"
      mapTypeUI.appendChild(mapTypeText)
      const icon = `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="#212e35"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>`
      const iconContainer = document.createElement("div")
      iconContainer.id = 'map-type-icon-container'
      iconContainer.innerHTML = icon
      mapTypeUI.appendChild(iconContainer)
    },

    addControlToMap() {
      const arrayLen = googleMap.controls[this.position].push(this.mapTypeControlDiv)
      this.controlsArrIndex = arrayLen - 1
    }
  },


}
</script>

<style>
#map-type-ui {
  display: flex;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  cursor: pointer;
  margin: 0 0 5px 8px;
  padding: 10px 0.8rem;
  background-color: white;
  font-family: "Open Sans", Hevetica, Verdana, Arial, sans-serif;
  font-size: 14px;
}

#map-type-text {
  margin-right: 6px;
}

#map-type-icon-container {
  display: flex;
  align-items: center;
}
</style>
