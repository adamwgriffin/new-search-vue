import get from 'lodash/get'
import { getListings } from '@/services/listing'

const initialState = () => {
  return {
    searchParams: {
      location_search_field: "7555 22nd Ave NW, Seattle, WA 98117, USA",
      agent_uuid: "f74a3f6d-aeda-4daa-835e-029386152405",
      pgsize: 20
    },
    listingSearch: {
      pending: false,
      status: null,
      error: null,
      results: {}
    }
  }
}

export const getters = {
  listings({ listingSearch }) {
    return get(listingSearch, 'results.result_list', [])
  },

  listingLocations({ listingSearch }) {
    const coordinates = get(listingSearch, 'results.result_geo[0].geojson.coordinates[0][0]', []) 
    return coordinates.map(coordinate => {
      return {
        position: {
          lat: coordinate[0],
          lng: coordinate[1]
        }
      }
    })
  }
}

export const mutations = {
  updateLocationSearchField(state, value) {
    state.location_search_field = value
  },

  setSearchListingsPending(state) {
    state.listingSearch.pending = true
  },

  setSearchListingsSuccess(state, { results, status }) {
    state.listingSearch.results = results
    state.listingSearch.status = status
    state.listingSearch.pending = false
  },

  setSearchListingsFailure(state, error) {
    state.listingSearch.error = error
    state.listingSearch.status = error.status
    state.listingSearch.pending = false
  }
}

export const actions = {
  searchListings: async ({ commit }, payload) => {
    try {
      commit('setSearchListingsPending')
      const res = await getListings(payload)
      if (res.data.status !== 'fail') {
        commit('setSearchListingsSuccess', { results: res.data.data, status: res.status })
        return res
      } else {
        commit('setSearchListingsFailure', res.data)
        console.error("Error getting listings", res.data)
        return res.data
      }
    } catch (error) {
      commit('setSearchListingsFailure', error)
      console.error("Error getting listings", error)
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
