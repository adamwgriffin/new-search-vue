import http from '@/lib/http'

const initialState = () => {
  return {
    searchParams: {
      location_search_field: "Fremont, Seattle, WA, USA",
      agent_uuid: "f74a3f6d-aeda-4daa-835e-029386152405",
      pgsize: 20
    },
    listingSearch: {
      pending: false,
      status: null,
      error: null,
      results: {}
    },
    listings: []
  }
}

export const getters = {
  serviceUrl(state, getters, rootState, rootGetters) {
    return `${rootGetters.baseUrl}/listing/search_v2`
  }
}

export const mutations = {
  updateLocationSearchField(state, value) {
    state.searchParams.location_search_field = value
  },

  setSearchListingsPending(state) {
    state.listingSearch = { ...initialState().listingSearch, pending: true }
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
  },

  setListings(state, data) {
    state.listings = data.result_list
  }
}

export const actions = {
  searchListings: async ({ commit, getters }, payload) => {
    try {
      commit('setSearchListingsPending')
      const res = await http({ url: getters.serviceUrl, params: payload })
      if (res.data.status !== 'fail') {
        commit('setSearchListingsSuccess', { results: res.data.data, status: res.status })
        commit('setListings', res.data.data)
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
