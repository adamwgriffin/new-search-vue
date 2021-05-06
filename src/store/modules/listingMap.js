import http from '@/lib/http'
import { geocode, googleToServiceAddressTypeMapping } from '@/lib/geocode'
import { convertGeojsonCoordinatesToPolygonPaths, getGeoLayerBounds } from '@/lib/polygon'

const initialState = () => {
  return {
    buffer_miles: 0,
    mapState: {
      bounds: {
        north: null,
        east: null,
        south: null,
        west: null,
      },
      center: {
        lat: null,
        lng: null,
      },
      zoom: null,
    },
    geocode: {
      pending: false,
      request: null,
      results: null,
      status: null,
      error: null,
    },
    geocoderResult: {
      // this is first type returned from the geocoder result. the orignal is stored here. it needs to be mapped to a
      // name that the Listing service understands when using it as the geotype param for a geolayer request
      type: null,
      // we're only using location for the geolayer request to the listing service
      location: null,
      viewport: null
    },
    geoLayer: {
      pending: false,
      request: null,
      results: null,
      status: null
    },
    // an array with one or more arrays of LatLngLiterals, e.g., [[{ lat: 47.228309, lng: -122.510645 },],], used for
    // Polygon paths as well as viewport bounds
    geoLayerCoordinates: []
  }
}

export const getters = {
  geoLayerServiceUrl(state, getters, rootState, rootGetters) {
    return `${rootGetters.baseUrl}/listing/geo/layer/search`
  },

  // geotype getter for geolayer request to Listing Service. the name of the type returned by the google geocoder may 
  // be different from what the service expects for legacy reasons
  geotype(state) {
    return googleToServiceAddressTypeMapping[state.geocoderResult.type]
  },

  /* apiResponseBounds is used to adjust the map so that the content we want to display is inside its viewport. this is
  accomplished by the map calling map.fitBounds(LatLngBounds). we want the viewport to fit the geospatial boundary
  polygon we display on the map, which is why we get its bounds using getGeoLayerBounds here. if for some reason we
  didn't get geojson.coordinates for the boundary from the service, we fallback to the viewport bounds from the geocoder
  instead. */
  apiResponseBounds(state) {
    return state.geoLayerCoordinates.length ?
      getGeoLayerBounds(state.geoLayerCoordinates) :
      state.geocoderResult.viewport
  }
}

export const mutations = {
  setMapState(state, newMapState) {
    state.mapState = { ...state.mapState, ...newMapState }
  },

  setGeocodePending(state) {
    state.geocode = { ...initialState().geocode, pending: true }
  },

  setGeocodeSuccess(state, payload) {
    state.geocode.error = null
    state.geocode.request = payload.request
    state.geocode.results = payload.results
    state.geocode.status = payload.status
    state.geocode.pending = false
  },

  setGeocodeFailure(state, payload) {
    state.geocode.error = payload.error
    state.geocode.request = payload.request
    state.geocode.results = null
    state.geocode.status = payload.status
    state.geocode.pending = false
  },

  setGeocoderResult(state, result) {
    const { location, viewport } = result.geometry
    state.geocoderResult = {
      type: result.types[0],
      location: location.toJSON(), // calling toJSON() returns the LatLngBounds instance as a POJO
      viewport
    }
  },

  setGeoLayerPending(state) {
    state.geoLayer = { ...initialState().geoLayer, pending: true }
  },

  setGeoLayerSuccess(state, { results, status }) {
    state.geoLayer.results = results
    state.geoLayer.status = status
    state.geoLayer.pending = false
  },

  setGeoLayerFailure(state, error) {
    state.geoLayer.error = error
    state.geoLayer.status = error.status
    state.geoLayer.pending = false
  },

  setGeoLayerCoordinates(state, geojson) {
    state.geoLayerCoordinates = convertGeojsonCoordinatesToPolygonPaths(geojson.coordinates)
  }
}

export const actions = {
  
  async geocodeMap({ commit }, payload) {
    try {
      commit('setGeocodePending')
      const res = await geocode(payload)
      commit('setGeocodeSuccess', { request: payload, results: res.results, status: res.status })
      commit('setGeocoderResult', res.results[0])
      return res
    } catch (error) {
      commit('setGeocodeFailure', { request: payload, error: error, status: error.status })
      return error
    }
  },

  async getGeoLayer({ commit, getters }, payload) {
    try {
      commit('setGeoLayerPending')
      const res = await http({ url: getters.geoLayerServiceUrl, params: payload })
      if (res.data.status !== 'error') {
        commit('setGeoLayerSuccess', { results: res.data.data, status: res.status })
        commit('setGeoLayerCoordinates', res.data.data.result_list[0].geojson)
      } else {
        commit('setGeoLayerFailure', res)
      }
      return res
    } catch (error) {
      commit('setGeoLayerFailure', error)
      return error
    }
  }

}

export default {
  namespaced: true,
  state: initialState(),
  getters,
  mutations,
  actions
}
