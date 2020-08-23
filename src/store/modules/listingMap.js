import { initializeGoogleMaps, geocode } from '@/lib/google_maps'

const initialState = () => {
  return {
    google: null,
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
  }
}

export const getters = {

}

export const mutations = {
  setGoogle(state, google) {
    state.google = google
  },

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
  }
}

export const actions = {
  
  async geocodeMap({ state, commit }, request) {
    const res = await geocode(state.geocoder, request)
    commit('setGeocoderResponse', { ...request, ...res })
    return res
  },

  async initializeMap({ commit }, payload) {
    try {
      const google = await initializeGoogleMaps()
      commit('setGoogle', google)
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
