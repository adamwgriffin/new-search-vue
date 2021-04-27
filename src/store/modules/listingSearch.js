import http from '@/lib/http'
import omitBy from 'lodash/omitBy'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import { WEBSITES_SEARCH_PARAMS } from '@/lib/constants/search_param_constants'
import {
  getPropertyTypes,
  formatListingDataForMapListings,
  searchParamsForMapClusters
} from '@/lib/helpers/search_params'

// NOTE: Eventually we would want to compose things like state (searchParams), getters, mutations, etc. based on what
// app is using this module, but for now we are assuming Websites IDX search.
const initialState = () => {
  return {
    cluster_threshold: 200,
    searchParams: WEBSITES_SEARCH_PARAMS,
    dedupeRequest: {
      pending: false,
      status: null,
      error: null,
      results: {}
    },
    nonDedupeRequest: {
      pending: false,
      status: null,
      error: null,
      results: {}
    },
    listingIdRequest: {
      pending: false,
      status: null,
      error: null,
      results: {}
    },
    listings: [],
    mapListings: [],
  }
}

export const getters = {
  dedupeEndpoint(state, getters, rootState, rootGetters) {
    return `${rootGetters.baseUrl}/listing/search_v2`
  },

  nonDedupeEndpoint(state, getters, rootState, rootGetters) {
    return `${rootGetters.baseUrl}/listing/search`
  },
  
  listingIdEndpoint(state, getters, rootState, rootGetters) {
    return `${rootGetters.baseUrl}/listing/ids`
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
    return omit(state.searchParams, [
      'location_search_field',
      'agent_uuid',
      'pgsize',
      'pricemin',
      'pricemax',
      'bed_min',
      'bath_min'
    ])
  }
}

export const mutations = {
  setSearchParams(state, newParams) {
    state.searchParams = {
      ...state.searchParams,
      ...newParams,
      ptype: getPropertyTypes(newParams.ptype, state.searchParams.ptype)
    }
  },

  setDedupeRequestPending(state) {
    state.dedupeRequest = { ...initialState().dedupeRequest, pending: true }
  },

  setDedupeRequestSuccess(state, { results, status }) {
    state.dedupeRequest.results = results
    state.dedupeRequest.status = status
    state.dedupeRequest.pending = false
  },

  setDedupeRequestFailure(state, error) {
    state.dedupeRequest.error = error
    state.dedupeRequest.status = error.status
    state.dedupeRequest.pending = false
  },
  
  setNonDedupeRequestListingsPending(state) {
    state.nonDedupeRequest = { ...initialState().nonDedupeRequest, pending: true }
  },

  setNonDedupeRequestSuccess(state, { results, status }) {
    state.nonDedupeRequest.results = results
    state.nonDedupeRequest.status = status
    state.nonDedupeRequest.pending = false
  },

  setNonDedupeRequestFailure(state, error) {
    state.nonDedupeRequest.error = error
    state.nonDedupeRequest.status = error.status
    state.nonDedupeRequest.pending = false
  },
  
  setListingIdRequestPending(state) {
    state.listingIdRequest = { ...initialState().listingIdRequest, pending: true }
  },

  setListingIdRequestSuccess(state, { results, status }) {
    state.listingIdRequest.results = results
    state.listingIdRequest.status = status
    state.listingIdRequest.pending = false
  },

  setListingIdRequestFailure(state, error) {
    state.listingIdRequest.error = error
    state.listingIdRequest.status = error.status
    state.listingIdRequest.pending = false
  },

  setListings(state, listings) {
    state.listings = listings
  },
  
  setMapListings(state, listings) {
    state.mapListings = listings
  },

  resetListings(state) {
    state.listings = initialState().listings
    state.mapListings = initialState().mapListings
  }
}

export const actions = {
  searchListings: async ({ dispatch, commit, state }, searchParams) => {
    const data = await dispatch('searchListingsDedupe', searchParams)
    if (!data.result_list) {
      return
    } else if (data.number_found === data.number_returned) {
      // we have all listings, so just set them on the store
      commit('setListings', data.result_list)
      commit('setMapListings', formatListingDataForMapListings(data.result_list))
    } else if (data.number_found >= state.cluster_threshold) {
      /* we have the first 20 listings but we need to get all listings for the map. since we are at or above the
      cluster_threshold we will need to call the old non-dedupe endpoint which is able to return a lot of listings
      but only with { lat, lng, listingid } for each listing, rather than all listing data, which presumably would be
      too much data to get back quickly. since we only need coordinates for the map listing markers this will work
      fine. */
      commit('setListings', data.result_list)
      const mapListingData = await dispatch(
        'searchListingsNonDedupe',
        searchParamsForMapClusters(searchParams, state.cluster_threshold)
      )
      commit('setMapListings', mapListingData.result_list)
    } else if (data.number_found < state.cluster_threshold) {
      // we have the first 20 listings, so we might as well add them first so the user has something to look at while
      // they wait for the rest
      commit('setListings', data.result_list)
      /* we need to get the remaining listings. since the number_found in the request is less than cluster_threshold we
      can get them by listing id, which will return all listing data for each listing. we will then merge the first 20
      with the remaining listings. */
      const remainingListingData = await dispatch('searchListingsIds', data.result_listing_ids)
      const allListingData = data.result_list.concat(remainingListingData.result_list)
      commit('setListings', allListingData)
      commit('setMapListings', formatListingDataForMapListings(allListingData))
    } else {
      console.error("No conditions were met for searchListings() response")
    }
  },

  searchListingsDedupe: async ({ commit, getters }, params) => {
    try {
      commit('setDedupeRequestPending')
      const res = await http({ url: getters.dedupeEndpoint, params })
      const { data } = res.data
      if (res.data.status !== 'fail') {
        commit('setDedupeRequestSuccess', { results: data, status: res.status })
        return data
      } else {
        throw new Error(data)
      }
    } catch (error) {
      const err = error.message || error
      commit('setDedupeRequestFailure', err)
      throw new Error(err)
    }
  },

  searchListingsNonDedupe: async ({ commit, getters }, params) => {
    try {
      commit('setNonDedupeRequestListingsPending')
      const res = await http({ url: getters.nonDedupeEndpoint, params })
      const { data } = res.data
      if (res.data.status !== 'fail') {
        commit('setNonDedupeRequestSuccess', { results: data, status: res.status })
        return data
      } else {
        throw new Error(data)
      }
    } catch (error) {
      const err = error.message || error
      commit('setNonDedupeRequestFailure', err)
      throw new Error(err)
    }
  },

  searchListingsIds: async ({ commit, getters, rootState }, listingIds) => {
    try {
      commit('setListingIdRequestPending')
      const res = await http({
        url: `${getters.listingIdEndpoint}/${listingIds.join('|')}`,
        params: { company_uuid: rootState.env.company_uuid }
      })
      const { data } = res.data
      if (res.data.status !== 'fail') {
        commit('setListingIdRequestSuccess', { results: data, status: res.status })
        return data
      } else {
        throw new Error(data)
      }
    } catch (error) {
      const err = error.message || error
      commit('setListingIdRequestFailure', err)
      throw new Error(err)
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
