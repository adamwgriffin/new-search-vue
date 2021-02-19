import http from '@/lib/http'
import omitBy from 'lodash/omitBy'
import pick from 'lodash/pick'
import { WEBSITES_SEARCH_PARAMS } from '@/lib/constants/search_param_constants'

// NOTE: Eventually we would want to compose things like state (searchParams), getters, mutations, etc. based on what
// app is using this module, but for now we are assuming Websites IDX search.
const initialState = () => {
  return {
    searchParams: WEBSITES_SEARCH_PARAMS,
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

  searchParamsForListingService(state) {
    return omitBy(state.searchParams, (value, param) => {
      return (param === 'sold_days' && state.searchParams.status === 'active') || !value
    })
  },

  priceRangeParams(state) {
    return pick(state.searchParams, ['pricemin', 'pricemax'])
  },

  bedBathParams(state) {
    return pick(state.searchParams, ['bed_min', 'bath_min'])
  },

  moreFiltersParams(state) {
    return pick(state.searchParams, ['status', 'ex_pend', 'ex_cs', 'sold_days'])
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
