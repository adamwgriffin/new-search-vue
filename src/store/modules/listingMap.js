import { geocode } from '@/lib/google_maps'
import get from 'lodash/get'

const initialState = () => {
  return {
    geocode: {
      request: null,
      results: null,
      status: null
    },
    location: null,
    viewport: null,
    markers: []
  }
}

export const getters = {

}

export const mutations = {

  setGeocoderResponse(state, payload) {
    state.geocode = payload
  },

  setLocation(state, payload) {
    state.location = payload
  },

  setViewport(state, payload) {
    state.viewport = payload
  },

  setMarkers(state, markers) {
    state.markers = markers
  }

}

export const actions = {
  
  async geocodeMap({ commit }, payload) {
    try {
      const res = await geocode(payload.geocoder, payload.request)
      commit('setGeocoderResponse', { ...payload.request, ...res })
      const { location, viewport } = res?.results?.[0]?.geometry ?? {}
      commit('setLocation', location)
      commit('setViewport', viewport)
      return res
    } catch (error) {
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
