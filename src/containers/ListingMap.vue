<template>
  <div id="listing-map">
    <!-- ideally we would have created these map control components as custom controls using the Google Maps API, and
   put them inside of the GoogleMap component, but that wasn't working well with Vue, so we're positioning them on top
   of the map this way instead. -->
    <MapToolsControl />
    <MapTypeControl :mapTypeId="mapData.mapTypeId" @mapTypeSelected="handleMapTypeSelected"/>
    <GoogleMap
      :bounds="apiResponseBounds"
      :mapOptions="mapOptions"
      :mapTypeId="mapData.mapTypeId"
      @dragend="handleUserAdjustedMap"
      @userChangedZoom="handleUserAdjustedMap"
      @idle="handleIdle"
    >    
      <ClusteredMarkers :coordinates="listingCoordinates" :clusterThreshold="cluster_threshold" />
      <GeoLayerPolygon
        :paths="geoLayerCoordinates"
        :options="geoLayerPolygonOptions"
      />
    </GoogleMap>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import GoogleMap from '@/components/map/GoogleMap'
import ClusteredMarkers from '@/components/map/ClusteredMarkers'
import GeoLayerPolygon from '@/components/map/GeoLayerPolygon'
import MapTypeControl from '@/components/map/MapTypeControl'
import MapToolsControl from '@/components/map/MapToolsControl'
import { geoLayerPolygonOptions } from '@/config'
import { mapOptions } from '@/config/google'

export default {

  components: {
    GoogleMap,
    GeoLayerPolygon,
    ClusteredMarkers,
    MapTypeControl,
    MapToolsControl
  },

  computed: {
    mapOptions: () => mapOptions,

    geoLayerPolygonOptions,

    ...mapState('listingMap', [
      'mapData',
      'userAdjustedMap',
      'geoLayerCoordinates'
    ]),

    ...mapGetters('listingMap', ['apiResponseBounds',]),

    ...mapGetters('listingSearch', ['searchParamsForListingService', 'boundsParams']),

    ...mapState('listingSearch', [
      'mapListings',
      'cluster_threshold'
    ]),

    listingCoordinates() {
      return this.mapListings.map(l => ({ lat: l.lat, lng: l.lng }))
    }
  },

  methods: {
    ...mapMutations('listingMap', [
      'setMapData',
      'setUserAdjustedMap'
    ]),

    ...mapMutations('listingSearch', ['resetListings']),

    ...mapActions('listingSearch', ['searchListings']),

    handleMapTypeSelected(e) {
      this.setMapData({ mapTypeId: e })
    },

    handleUserAdjustedMap(e) {
      this.setMapData(e)
      // we want to set this flag so that once the map "idle" event is fired we will know to run a search. without
      // waiting for "idle" we can get into situations where the map position and listing results don't match
      this.setUserAdjustedMap(true)
    },

    handleIdle(e) {
      this.setMapData(e)
      if (this.userAdjustedMap) {
        this.setUserAdjustedMap(false)
        this.resetListings()
        this.searchListings({
          ...this.searchParamsForListingService,
          ...this.boundsParams,
        }) 
      }
    }
  },

}
</script>

<style scoped>
#listing-map {
  position: relative;
  width: 35%;
}

#google-map {
  height: 100%;
}
</style>
