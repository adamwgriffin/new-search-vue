import { initializeGoogleMaps } from '@/lib/google_maps'

const initialState = () => {
  return {
    google: null,
    googleMap: null,
    geocoder: null,
    geocode: {
      request: null,
      response: null,
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
  setGoogle(state, GoogleMaps) {
    state.google = GoogleMaps
  },

  setListingMap(state, MapInstance) {
    state.googleMap = MapInstance
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
  
  geocodeMap({ state }, payload) {
    state.geocoder.geocode(payload, (results, status) => {
      if (status !== 'OK' || !results[0]) {
        throw new Error(status);
      }
      state.googleMap.setCenter(results[0].geometry.location)
      state.googleMap.fitBounds(results[0].geometry.viewport)
    })
  },

  async initializeMap({ dispatch, commit }, payload) {
    try {
      const google = await initializeGoogleMaps()
      commit('setGoogle', google)
      commit('setListingMap', new google.maps.Map(payload.el))
      commit('setGeocoder', new google.maps.Geocoder())
      dispatch('geocodeMap', payload.geocoderObj)
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
