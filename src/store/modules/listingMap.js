import i18n from '@/plugins/i18n';
import http from '@/lib/http'
import { googleToServiceAddressTypeMapping } from '@/lib/constants/geocoder_constants'
import { geocode, getPlacePredictions, getPlaceDetails } from '@/lib/google'
import { convertGeojsonCoordinatesToPolygonPaths, getGeoLayerBounds } from '@/lib/polygon'
import { autocompleteOptions } from '@/config/google'

const initialState = () => {
  return {
    buffer_miles: 0,
    mapData: {
      bounds: {},
      center: {},
      zoom: null,
      mapTypeId: 'roadmap'
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
      location: {},
      viewport: {}
    },
    placeAutocompleteRequest: {
      pending: false,
      request: null,
      results: null,
      status: null,
    },
    autcompletePlacePredictions: [],
    placeDetailsRequest: {
      pending: false,
      request: null,
      results: null,
      status: null,
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

  placeAutocompleteParams(state) {
    return {
      types: ['geocode'],
      components: autocompleteOptions.componentRestrictions,
      language: i18n.locale,
    }
  },

  placeDetailsParams() {
    return {
      fields: ['address_component', 'geometry'],
      language: i18n.locale,
    }
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
  setMapData(state, newMapData) {
    state.mapData = { ...state.mapData, ...newMapData }
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

  setGeoLayerCoordinatesWithGeojson(state, geojson) {
    state.geoLayerCoordinates = convertGeojsonCoordinatesToPolygonPaths(geojson.coordinates)
  },

  setPlaceAutocompleteRequestPending(state) {
    state.placeAutocompleteRequest = { ...initialState().placeAutocompleteRequest, pending: true }
  },

  setPlaceAutocompleteRequestSuccess(state, { results, status }) {
    state.placeAutocompleteRequest.results = results
    state.placeAutocompleteRequest.status = status
    state.placeAutocompleteRequest.pending = false
  },

  setPlaceAutocompleteRequestFailure(state, error) {
    state.placeAutocompleteRequest.error = error
    state.placeAutocompleteRequest.status = error.status
    state.placeAutocompleteRequest.pending = false
  },

  setAutcompletePlacePredictions(state, predictions) {
    state.autcompletePlacePredictions = predictions
  },

  setPlaceDetailsRequestPending(state) {
    state.placeDetailsRequest = { ...initialState().placeDetailsRequest, pending: true }
  },

  setPlaceDetailsRequestSuccess(state, { results, status }) {
    state.placeDetailsRequest.results = results
    state.placeDetailsRequest.status = status
    state.placeDetailsRequest.pending = false
  },

  setPlaceDetailsRequestFailure(state, error) {
    state.placeDetailsRequest.error = error
    state.placeDetailsRequest.status = error.status
    state.placeDetailsRequest.pending = false
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

  async getPlaceAutocompletePredictions({ commit, getters }, searchString) {
    try {
      commit('setPlaceAutocompleteRequestPending')
      const params = { input: searchString, ...getters.placeAutocompleteParams }
      const res = await getPlacePredictions(params)
      if (res.status === 'OK') {
        commit('setPlaceAutocompleteRequestSuccess', { request: params, results: res.results, status: res.status })
        commit('setAutcompletePlacePredictions', res.results)
      } else {
        commit('setPlaceAutocompleteRequestFailure', { error: res.error_message, status: res.status } )
      }
      return res.results
    } catch (error) {
      commit('setPlaceAutocompleteRequestFailure', { error, status: error.status })
      return error
    }
  },

  async getPlaceAutocompletePlaceDetails({ commit, getters }, placeId) {
    try {
      commit('setPlaceDetailsRequestPending')
      const res = await getPlaceDetails({ placeId, ...getters.placeDetailsParams })
      if (res.status === 'OK') {
        commit('setPlaceDetailsRequestSuccess', { request: placeId, results: res.results, status: res.status })
        // need to make the data the same as what comes from geocoder results so it matches what setGeocoderResult
        // expects  
        const { address_components, geometry } = res.results
        commit('setGeocoderResult', { types: address_components[0].types, geometry })
      } else {
        commit('setPlaceDetailsRequestFailure', { error: res.error_message, status: res.status } )
      }
      return res.results
    } catch (error) {
      commit('setPlaceDetailsRequestFailure', { error, status: error.status })
      return error
    }
  },

  async getGeoLayer({ commit, getters }, payload) {
    try {
      commit('setGeoLayerPending')
      const res = await http({ url: getters.geoLayerServiceUrl, params: payload })
      if (res.data.status !== 'error') {
        commit('setGeoLayerSuccess', { results: res.data.data, status: res.status })
        commit('setGeoLayerCoordinatesWithGeojson', res.data.data.result_list[0].geojson)
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
