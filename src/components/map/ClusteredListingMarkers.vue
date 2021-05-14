<template>
</template>

<script>
import MarkerClusterer from '@googlemaps/markerclustererplus'
import { listingMarker, listingMarkerIcon } from '@/lib/listing_marker'
import { getClusterStyles } from '@/lib/listing_marker_clusterer'
import { googleMap } from '@/lib/google'

export default {
  props: {
    listingData: {
      type: Array,
      default: []
    },

    clusterThreshold: {
      type: Number,
      default: 200
    },

    iconFill: {
      type: String,
      default: '#0f2b59'
    },

    iconHoverFill: {
      type: String,
      default: 'red'
    },
  },

  data() {
    return {
      markerClusterer: null,
      markers: [],
      // keeps track of whether we should cluster markers or just display them
      clustering: null,
    }
  },

  watch: {
    listingData() {
      const newClusterMode = this.shouldEnableClustering()
      const clusteringModeChanged = newClusterMode !== this.clustering
      this.clustering = newClusterMode
      clusteringModeChanged ? this.toggleClustering() : this.updateMarkersOrClusterer()
    }
  },

  created() {
    this.clustering = this.shouldEnableClustering()
    this.createMarkerClusterer()
  },

  destroyed() {
    this.destroyMarkers(this.markers)
    this.destroyMarkerClusterer()
  },
  
  methods: {
    shouldEnableClustering() {
      return this.listingData.length >= this.clusterThreshold
    },

    noMarkersToUpdate(markersToCreate, markersToRemove) {
      return this.markers.length && (!markersToCreate.length && !markersToRemove.length)
    },

    filterByListingid(arrToFilter, listingidArr) {
      const listingids = listingidArr.map(o => o.listingid)
      return arrToFilter.filter(o => !listingids.includes(o.listingid))
    },

    getListingDataMarkerDiff() {
      return {
        added: this.filterByListingid(this.listingData, this.markers),
        removed: this.filterByListingid(this.markers, this.listingData),
      }
    },

    createMarkerClusterer() {
      this.markerClusterer = new MarkerClusterer (
        googleMap,
        this.markers,
        { styles: getClusterStyles() }
      )
    },

    toggleClustering() {
      if (this.clustering) {
        this.destroyMarkers(this.markers)
        this.addNewListingDataToClusterer()
      } else {
        this.markerClusterer.clearMarkers()
        this.markers = this.listingData.map(c => this.createMarker(c))
      }
    },

    updateMarkersOrClusterer() {
      const { added, removed } = this.getListingDataMarkerDiff()
      if (this.noMarkersToUpdate(added, removed)) {
        return
      } else if (this.clustering) {
          this.updateMarkerClustererFromDiff(added, removed)
        } else {
          this.updateMarkersFromDiff(added, removed)
      }
    },

    updateMarkerClustererFromDiff(markersToCreate, markersToRemove) {
      this.markerClusterer.removeMarkers(markersToRemove)
      const newMarkers = markersToCreate.map(l => this.createMarker(l))
      this.markerClusterer.addMarkers(newMarkers)
      this.markers = this.markerClusterer.getMarkers()
    },

    addNewListingDataToClusterer() {
      this.markers = this.listingData.map(l => this.createMarker(l))
      this.markerClusterer.addMarkers(this.markers)
    },

    destroyMarkerClusterer() {
      this.markerClusterer.setMap(null)
    },

    createMarker(listing) {
      const position = { lat: listing.lat, lng: listing.lng }
      const markerIcon = listingMarkerIcon({ fill: this.iconFill })
      const markerIconHover = listingMarkerIcon({ fill: this.iconHoverFill })
      const marker = listingMarker(position, googleMap, markerIcon)
      marker.addListener('mouseover', () => marker.setIcon(markerIconHover))
      marker.addListener('mouseout', () => marker.setIcon(markerIcon))
      marker.listingid = listing.listingid
      return marker
    },

    updateMarkersFromDiff(markersToCreate, markersToRemove) {
      const removeIds = markersToRemove.map(m => m.listingid)
      const remainingMarkers = this.markers.filter(m => !removeIds.includes(m.listingid))
      this.destroyMarkers(markersToRemove)
      const newMarkers = markersToCreate.map(c => this.createMarker(c))
      this.markers = remainingMarkers.concat(newMarkers)
    },

    destroyMarkers(markers) {
      markers.forEach(m => m.setMap(null))
    }
  }

}
</script>
