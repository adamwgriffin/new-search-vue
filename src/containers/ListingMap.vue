<template>
  <GoogleMap
    :bounds="apiResponseBounds"
    :mapOptions="mapOptions"
    @dragend="handleUserAdjustedMap"
    @userChangedZoom="handleUserAdjustedMap"
    @idle="setMapData"
  >
    <MapToolsControl :position="mapToolsPosition" />
    <ClusteredListingMarkers
      :listingData="mapListingsFilteredByMapBounds"
      :clusterThreshold="cluster_threshold"
    />
    <GeoLayerPolygon
      :paths="geoLayerCoordinates"
      :options="geoLayerPolygonOptions"
    />
    <MapTypeControl :position="mapTypePosition" />
  </GoogleMap>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import GoogleMap from '@/components/map/GoogleMap'
import ClusteredListingMarkers from '@/components/map/ClusteredListingMarkers'
import GeoLayerPolygon from '@/components/map/GeoLayerPolygon'
import MapTypeControl from '@/components/map/MapTypeControl'
import MapToolsControl from '@/components/map/MapToolsControl'
import { geoLayerPolygonOptions } from '@/config'
import { mapOptions } from '@/config/google'
import { polygonOutsideViewport, polygonPartiallyOutsideViewport } from '@/lib/polygon'

export default {

  components: {
    GoogleMap,
    GeoLayerPolygon,
    MapTypeControl,
    MapToolsControl,
    ClusteredListingMarkers
  },

  computed: {
    mapOptions: () => mapOptions,

    geoLayerPolygonOptions,

    ...mapState('listingMap', [
      'geoLayerCoordinates',
      'mapData'
    ]),

    ...mapGetters('listingMap', ['apiResponseBounds',]),

    ...mapGetters('listingSearch', [
      'listingsFilteredByMapBounds',
      'mapListingsFilteredByMapBounds',
    ]),

    ...mapState('listingSearch', [
      'listings', 
      'mapListings',
      'cluster_threshold',
      'searchParams'
    ]),

    listingCoordinates() {
      return this.mapListings.map(l => ({ lat: l.lat, lng: l.lng }))
    },

    mapTypePosition() {
      return google.maps.ControlPosition.LEFT_BOTTOM
    },

    mapToolsPosition() {
      return google.maps.ControlPosition.LEFT_TOP
    },
    
    boundaryCompletelyOutsideViewport() {
      return polygonOutsideViewport(this.geoLayerCoordinates, this.mapData.bounds)
    },
    
    boundaryPartiallyOutsideViewport() {
      return polygonPartiallyOutsideViewport(this.geoLayerCoordinates, this.mapData.bounds)
    },

    searchResultsDontIncludeAllAvailableListings() {
      return this.listings < this.mapListings
    },

    firstPageOfListingsVisibleInViewport() {
      const pageSize = this.mapListingsFilteredByMapBounds.length <= this.cluster_threshold ? 
        this.mapListingsFilteredByMapBounds.length :
        this.searchParams.pgsize
      return this.mapListingsFilteredByMapBounds.slice(0, pageSize)
    },
  },

  methods: {
    ...mapMutations('listingMap', [
      'setMapData',
    ]),

    ...mapMutations('listingSearch', [
      'resetSearchResultsListings',
      'setListings',
      'setListingSearchPending',
      'setListingSearchComplete',
    ]),

    ...mapActions('listingSearch', ['searchListingsIds']),

    async getMoreSearchResultsFilteredByViewport() {
      this.setListingSearchPending()
      this.resetSearchResultsListings()
      const newListingIds = this.firstPageOfListingsVisibleInViewport.map(l => l.listingid)
      const res = await this.searchListingsIds(newListingIds)
      this.setListings(res.result_list)
      this.setListingSearchComplete()
    },

    handleUserAdjustedMap(e) {
      this.setMapData(e)
      if (this.boundaryCompletelyOutsideViewport) return
      if (this.boundaryPartiallyOutsideViewport && this.searchResultsDontIncludeAllAvailableListings) {
        this.getMoreSearchResultsFilteredByViewport()
      }
    }
  },

}
</script>

<style scoped>
#google-map {
  width: 35%;
}
</style>
