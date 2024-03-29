import http from '@/lib/http'
import omitBy from 'lodash/omitBy'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import { websitesSearchParams } from '@/lib/constants/search_param_constants'
import {
  getPropertyTypes,
  formatListingDataForMapListings,
  searchParamsForMapClusters,
  mapOrder,
} from '@/lib/helpers/search_params'
import { modifyParams } from '@/lib/helpers/search_params'

// NOTE: Eventually we would want to compose things like state (searchParams), getters, mutations, etc. based on what
// app is using this module, but for now we are assuming Websites IDX search.
const initialState = () => {
  return {
    listingsPageIndex: 0,
    cluster_threshold: 200,
    listingSearchPending: false,
    // "location_search_field" is a synonym for "street" in listing service. it is a valid search param but we don't
    // include it in "searchParams" because we are using it to geocode on the front end to get the center_lat &
    // center_lon coordinates. those coordinates are all that's really necessary to send the service if you already have
    // them.
    location_search_field: '',
    searchParams: websitesSearchParams,
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
    getMoreListingsPending: false,
    listings: [],
    mapListings: []
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

  priceRangeParams(state) {
    return pick(state.searchParams, ['pricemin', 'pricemax'])
  },

  bedBathParams(state) {
    return pick(state.searchParams, ['bed_min', 'bath_min'])
  },

  moreFiltersParams(state) {
    return omit(state.searchParams, [
      'agent_uuid',
      'pgsize',
      'pricemin',
      'pricemax',
      'bed_min',
      'bath_min'
    ])
  },

  boundsParams(state, getters, rootState) {
    const { north, east, south, west } = rootState.listingMap.mapData.bounds
    return {
      bounds_north: north,
      bounds_east: east,
      bounds_south: south,
      bounds_west: west
    }
  },

  centerLatLonParams(state, getters, rootState) {
    const { lat, lng } = rootState.listingMap.geocoderResult.location
    return { center_lat: lat, center_lon: lng }
  },

  // the docs for the listing service say that it expects user_lat & user_lon when sorting by distance. not sure why
  // center_lat & center_lon wouldn't do instead because it seems like you would always want to set the distance to be
  // based on the coords of the location your are searching on
  userLatLon(state, getters) {
    const { center_lat, center_lon } = getters.centerLatLonParams
    return { user_lat: center_lat, user_lon: center_lon }
  },

  searchParamsForGeospatialSearch(state, getters, rootState, rootGetters) {
    return {
      ...state.searchParams,
      ...getters.centerLatLonParams,
      ...getters.boundsParams,
      geotype: rootGetters['listingMap/geotype']
    }
  },

  searchParamsForBoundsSearch(state, getters) {
    return {
      ...state.searchParams,
      ...getters.boundsParams
    }
  },

  searchParamsForListingService(state, getters, rootState, rootGetters) {
    const originalParams = rootState.listingMap.boundaryActive
      ? getters.searchParamsForGeospatialSearch
      : getters.searchParamsForBoundsSearch
    const originalParamsModified = modifyParams(
      originalParams,
      state,
      getters,
      rootState,
      rootGetters
    )
    return omitBy(originalParamsModified, (value) => !value)
  },

  searchParamsForListingServiceWithoutBounds(state, getters) {
    return omit(getters.searchParamsForListingService, [
      'bounds_north',
      'bounds_east',
      'bounds_south',
      'bounds_west'
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

  setSearchParamsToDefault(state) {
    const initialStateObj = initialState()
    state.searchParams = initialStateObj.searchParams
    state.location_search_field = initialStateObj.location_search_field
  },

  setLocationSearchField(state, location) {
    state.location_search_field = location
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

  setDedupeRequestCanceled(state) {
    state.dedupeRequest = initialState().dedupeRequest
  },

  setNonDedupeRequestListingsPending(state) {
    state.nonDedupeRequest = {
      ...initialState().nonDedupeRequest,
      pending: true
    }
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

  setNonDedupeRequestCanceled(state) {
    state.nonDedupeRequest = initialState().nonDedupeRequest
  },

  setListingIdRequestPending(state) {
    state.listingIdRequest = {
      ...initialState().listingIdRequest,
      pending: true
    }
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

  setListingIdRequestCanceled(state) {
    state.listingIdRequest = initialState().listingIdRequest
  },

  setGetMoreListingsPending(state, status) {
    state.getMoreListingsPending = status
  },

  setListings(state, listings) {
    state.listings = listings
  },

  setListingsPageIndex(state, index) {
    state.listingsPageIndex = index
  },

  setMapListings(state, listings) {
    state.mapListings = listings
  },

  resetListings(state) {
    const { listingsPageIndex, listings, mapListings } = initialState()
    state.listingsPageIndex = listingsPageIndex
    state.listings = listings
    state.mapListings = mapListings
  },

  setListingSearchPending(state) {
    state.listingSearchPending = true
  },

  setListingSearchComplete(state) {
    state.listingSearchPending = false
  }
}

const cancelTokenSources = {
  dedupeRequest: null,
  nonDedupeRequest: null,
  listingIdRequest: null
}

export const actions = {
  searchListings: async ({ dispatch, commit, state }, searchParams) => {
    try {
      const data = await dispatch('searchListingsDedupe', searchParams)
      if (!data.result_list) {
        // TODO: need to publish some kind of no results message here
        console.debug('No results')
      } else if (data.number_found === data.number_returned) {
        // we have all listings, so just set them on the store
        commit('setListings', data.result_list)
        commit(
          'setMapListings',
          formatListingDataForMapListings(data.result_list)
        )
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
        /* we need to get the remaining listings. since the number_found in the request is less than cluster_threshold
        we can get them by listing id, which will return all listing data for each listing. we will then merge the first
        20 with the remaining listings. */
        const remainingListings = await dispatch(
          'searchListingsIds',
          data.result_listing_ids
        )
        /* currenlty the service doesn't return the listings sorted in the same order you request them, which causes
        them to be sorted incorrectly in the response, so we have to sort them based on the original result_listing_ids
        since it's in the correct order. */
        const remainingListingsSorted = mapOrder(
          remainingListings.result_list,
          data.result_listing_ids,
          'listingid'
        )
        const allListingData = data.result_list.concat(remainingListingsSorted)
        commit('setListings', allListingData)
        commit(
          'setMapListings',
          formatListingDataForMapListings(allListingData)
        )
      } else {
        console.warn('No conditions were met for searchListings() response')
      }
    } catch (error) {
      if (http.isCancel(error)) {
        console.debug(error.message)
      } else {
        throw error
      }
    }
  },

  getMoreListings: async ({ dispatch, commit, state }) => {
    commit('setGetMoreListingsPending', true)
    const { pgsize } = state.searchParams
    const newPageIndex = state.listingsPageIndex + pgsize
    const listingIds = state.mapListings
      .slice(newPageIndex, newPageIndex + pgsize)
      .map((l) => l.listingid)
    try {
      const newListings = await dispatch('searchListingsIds', listingIds)
      commit('setListings', state.listings.concat(newListings.result_list))
      commit('setListingsPageIndex', newPageIndex)
    } catch (error) {
      if (http.isCancel(error)) {
        commit('setGetMoreListingsPending', false)
      }
      throw error
    }
    commit('setGetMoreListingsPending', false)
  },

  searchListingsDedupe: async ({ commit, getters }, params) => {
    const source = http.CancelToken.source()
    cancelTokenSources.dedupeRequest = source
    try {
      commit('setDedupeRequestPending', source)
      const res = await http({
        cancelToken: source.token,
        url: getters.dedupeEndpoint,
        params
      })
      const { data } = res.data
      if (res.data.status !== 'fail') {
        commit('setDedupeRequestSuccess', { results: data, status: res.status })
        return data
      } else {
        throw new Error(data)
      }
    } catch (error) {
      if (http.isCancel(error)) {
        commit('setDedupeRequestCanceled')
        throw error
      } else {
        const err = error.message || error
        commit('setDedupeRequestFailure', err)
        throw new Error(err)
      }
    }
  },

  searchListingsNonDedupe: async ({ commit, getters }, params) => {
    const source = http.CancelToken.source()
    cancelTokenSources.nonDedupeRequest = source
    try {
      commit('setNonDedupeRequestListingsPending')
      const res = await http({
        cancelToken: source.token,
        url: getters.nonDedupeEndpoint,
        params
      })
      const { data } = res.data
      if (res.data.status !== 'fail') {
        commit('setNonDedupeRequestSuccess', {
          results: data,
          status: res.status
        })
        return data
      } else {
        throw new Error(data)
      }
    } catch (error) {
      if (http.isCancel(error)) {
        commit('setNonDedupeRequestCanceled')
        throw error
      } else {
        const err = error.message || error
        commit('setNonDedupeRequestFailure', err)
        throw new Error(err)
      }
    }
  },

  searchListingsIds: async ({ commit, getters, rootState }, listingIds) => {
    const source = http.CancelToken.source()
    cancelTokenSources.listingIdRequest = source
    try {
      commit('setListingIdRequestPending')
      const res = await http({
        cancelToken: source.token,
        url: `${getters.listingIdEndpoint}/${listingIds.join('|')}`,
        params: { company_uuid: rootState.env.company_uuid }
      })
      const { data } = res.data
      if (res.data.status !== 'fail') {
        commit('setListingIdRequestSuccess', {
          results: data,
          status: res.status
        })
        return data
      } else {
        throw new Error(data)
      }
    } catch (error) {
      if (http.isCancel(error)) {
        commit('setListingIdRequestCanceled')
        throw error
      } else {
        const err = error.message || error
        commit('setListingIdRequestFailure', err)
        throw new Error(err)
      }
    }
  },

  cancelActiveSearchListingRequests({ state }) {
    for (const requestName in cancelTokenSources) {
      if (state[requestName].pending) {
        cancelTokenSources[requestName].cancel(
          `${requestName} request cancelled.`
        )
      }
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
