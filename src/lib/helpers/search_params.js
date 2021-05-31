import difference from 'lodash/difference'
import omit from 'lodash/omit'
import { propertyTypes } from '@/lib/constants/property_types'
import { sortByDistanceValues } from '@/lib/constants/search_param_constants'

// for IDX search you can either choose rental or non-rental property types, but not both
export const toggleRentalOrNonRentalTypes = (newPropertyTypes, oldPropertyTypes) => {
  return difference(newPropertyTypes, oldPropertyTypes).includes(propertyTypes.rental) ?
    [propertyTypes.rental] :
    newPropertyTypes.filter(t => t !== propertyTypes.rental)
}

export const getPropertyTypes = (newPropertyTypes, oldPropertyTypes) => {
  return newPropertyTypes ?
    toggleRentalOrNonRentalTypes(newPropertyTypes, oldPropertyTypes) :
    oldPropertyTypes
}

export const formatListingDataForMapListings = (listings) => {
  return listings.map(l => ({ lat: +l.location.latitude, lng: +l.location.longitude, listingid: l.listingid }))
}

export const searchParamsForMapClusters = (params, cluster_threshold) => {
  return omit({ ...params, cluster_allow: true, cluster_threshold }, ['pgsize'])
}

export const mapOrder = (source, order, key) => {
  const map = order.reduce((acc, v, i) => ((acc[v] = i), acc), {})
  return source.sort((a, b) => map[a[key]] - map[b[key]])
}

// the values of certain search params ("sort_by" for instance) may require us to include, exclude or change the values
// of other search params. this object provides a mapping between param names that may cause us to make these
// modifications and the functions that determine what, if any, those modifications should be. if the function
// determines that a modification is necessary, then it should return an object with the params that need to be changed.
// if params need to be removed we can do so by setting their values to null. if nothing needs to be changed then the
// function should not return a value.
export const modifyParam = {
  sort_by(state, getters, rootState, rootGetters) {
    // listing service uses user_lat & user_lon as basis for distance sort
    if (sortByDistanceValues.includes(getters.defaultSearchParams.sort_by)) {
      return { sort_by: getters.defaultSearchParams.sort_by, ...getters.userLatLon }
    }
  },

  sold_days(state, getters, rootState, rootGetters) {
    if (getters.defaultSearchParams.status === 'active') {
      return { sold_days: null }
    }
  }
}
