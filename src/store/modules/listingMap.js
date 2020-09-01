import { geocode } from '@/lib/google_maps'

const initialState = () => {
  return {
    geocode: {
      request: null,
      results: null,
      status: null
    },
    markers: [],
    autocomplete: null,
    autocompletePlace: null,
    autocompleteListener: null
  }
}

export const getters = {

}

export const mutations = {
  setGeocoderResponse(state, payload) {
    state.geocode = payload
  },

  setMarkers(state, markers) {
    state.markers = markers
  },

  setAutocomplete(state, autocomplete) {
    state.autocomplete = autocomplete
  },

  setAutocompletePlace(state, place) {
    state.autocompletePlace = place
  },

  setAutocompleteListener(state, listener) {
    state.autocompleteListener = listener
  }
}

export const actions = {
  
  async geocodeMap({ commit }, payload) {
    try {
      const res = await geocode(payload.geocoder, payload.request)
      commit('setGeocoderResponse', { ...payload.request, ...res })
      return res
    } catch (error) {
      return error
    }
  },

  async setMapLocation({ dispatch, commit, state }, payload) {
    try {
      await dispatch('geocodeMap', payload)
      const { location, viewport } = state.geocode.results[0].geometry
      commit('moveMap', { location, viewport })
      return results
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
