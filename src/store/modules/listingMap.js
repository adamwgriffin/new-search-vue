// TODO: switch to @googlemaps/js-api-loader if it ever supports clientId. @googlemaps/loader was deprecated in favor of
// @googlemaps/js-api-loader but it doesn't seem to support clientId yet.
import { Loader } from '@googlemaps/loader'
import { googleMapsOptions } from '@/config/google'
import { geocode } from '@/lib/google_maps'

const initialState = () => {
  return {
    googleMap: null,
    geocoder: null,
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
  setMap(state, MapInstance) {
    state.googleMap = MapInstance
  },

  // TODO: this probably needs a better name and needs to be less specific, but I don't know how to change it yet
  moveMap(state, { location, viewport }) {
    state.googleMap.setCenter(location)
    state.googleMap.fitBounds(viewport)
  },

  setGeocoder(state, GeocoderInstance) {
    state.geocoder = GeocoderInstance
  },

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
  
  async geocodeMap({ state, commit }, request) {
    try {
      const res = await geocode(state.geocoder, request)
      commit('setGeocoderResponse', { ...request, ...res })
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
  },

  async initializeMap({ commit }, payload) {
    try {
      if (typeof google === 'undefined') await new Loader(googleMapsOptions).load()
      commit('setMap', new google.maps.Map(payload.el))
      commit('setGeocoder', new google.maps.Geocoder())
    } catch (error) {
      console.error(error)
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
