import http from '@/lib/http'
import { geocode, googleToServiceAddressTypeMapping } from '@/lib/geocode'
import { convertGeojsonCoordinatesToPolygonPaths } from '@/lib/polygon'

const initialState = () => {
  return {
    buffer_miles: 0,
    geocode: {
      pending: false,
      request: null,
      results: null,
      status: null,
      error: null,
    },
    geoLayer: {
      pending: false,
      request: null,
      results: null,
      status: null
    },
    // a.k.a, "address type"
    geotype: null,
    location: null,
    viewport: null,
    geoLayerCoordinates: []
  }
}

export const getters = {
  geoLayerServiceUrl(state, getters, rootState, rootGetters) {
    return `${rootGetters.baseUrl}/listing/geo/layer/search`
  }
}

export const mutations = {

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

  setLocation(state, location) {
    // we're saving location as a plain object in the store because saving complex objects is discouraged in vuex
    state.location = { lat: location.lat(), lng: location.lng() }
  },

  setViewport(state, payload) {
    state.viewport = payload
  },

  setGeotype(state, type) {
    state.geotype = googleToServiceAddressTypeMapping[type]
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
      const { types, geometry } = res.results[0]
      commit('setGeotype', types[0])
      commit('setLocation', geometry.location)
      commit('setViewport', geometry.viewport)
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
