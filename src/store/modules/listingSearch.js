import http from '@/lib/http'
import pickBy from 'lodash/pickBy'
import pick from 'lodash/pick'

const initialState = () => {
  return {
    searchParams: {
      location_search_field: "Fremont, Seattle, WA, USA",
      agent_uuid: "f74a3f6d-aeda-4daa-835e-029386152405",
      pgsize: 20,
      pricemin: null,
      pricemax: null,
      bed_min: 0,
      bath_min: 0
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
  },

  totalListings(state) {
    return state.listings?.length || 0
  },

  searchParamsForListingService(state) {
    return pickBy(state.searchParams)
  },

  priceRange(state) {
    return { pricemin: state.searchParams.pricemin, pricemax: state.searchParams.pricemax }
  },

  bedsBaths(state) {
    return pick(state.searchParams, ['bed_min', 'bath_min'])
  }
}

export const mutations = {
  setSearchParams(state, newParams) {
    state.searchParams = { ...state.searchParams, ...newParams }
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
  },

  resetListings(state) {
    state.listings = initialState().listings
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
