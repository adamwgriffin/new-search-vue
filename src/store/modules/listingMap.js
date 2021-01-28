import http from '@/lib/http'
import { geocode, googleToServiceAddressTypeMapping } from '@/lib/geocode'

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
    location: null,
    viewport: null,
    geoLayerCoordinates: []
  }
}

export const getters = {
  geoLayerServiceUrl(state, getters, rootState, rootGetters) {
    return `${rootGetters.baseUrl}/listing/geo/layer/search`
  },

  // a.k.a, "address type"
  geotype(state) {
    const type = state.geocode.results?.[0]?.types?.[0]
    return type ? googleToServiceAddressTypeMapping[type] : null
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

  setLocation(state, payload) {
    state.location = payload
  },

  setViewport(state, payload) {
    state.viewport = payload
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

  geoLayerCoordinates(state, geojson) {
    state.geoLayerCoordinates = geojson.coordinates[0][0].map(c => ({ lat: c[1], lng: c[0] }))
  }
}

export const actions = {
  
  async geocodeMap({ commit }, payload) {
    try {
      commit('setGeocodePending')
      const res = await geocode(payload.geocoder, payload.request)
      commit('setGeocodeSuccess', { request: payload.request, results: res.results, status: res.status })
      const { location, viewport } = res?.results?.[0]?.geometry ?? {}
      commit('setLocation', location)
      commit('setViewport', viewport)
      return res
    } catch (error) {
      commit('setGeocodeFailure', { request: payload.request, error: error, status: error.status })
      return error
    }
  },

  async getGeoLayer({ commit, getters }, payload) {
    try {
      commit('setGeoLayerPending')
      const res = await http({ url: getters.geoLayerServiceUrl, params: payload })
      if (res.data.status !== 'error') {
        commit('setGeoLayerSuccess', { results: res.data.data, status: res.status })
        commit('geoLayerCoordinates', res.data.data.result_list[0].geojson)
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
