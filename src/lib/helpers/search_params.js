import difference from 'lodash/difference'
import omit from 'lodash/omit'
import orderBy from 'lodash/orderBy'
import { propertyTypes } from '@/lib/constants/property_types'
import { sortByEnum, sortByDistanceValues } from '@/lib/constants/search_param_constants'
import { latLngBoundsLiteralToClass } from '@/lib/google_maps_utils'
import { getListingCoordinates } from '@/lib/helpers/listing_helpers'

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

export const listingsFilteredByBounds = (latLngBoundsLiteral, listings) => {
  if (!latLngBoundsLiteral || !listings.length) return listings
  const mapBounds = latLngBoundsLiteralToClass(latLngBoundsLiteral)
  return listings.filter(l => {
    // if display_address is false, the service will not return the listing's coordinates, which means we have no way to
    // filter the listing by bounds, so for now we're just always including them until a better solution presents
    // itself.
    return !l.display_address || mapBounds.contains(getListingCoordinates(l))
  })
}

export const sortListingsByDistance = (listings, toLocation, direction='asc') => {
  const to = new google.maps.LatLng(toLocation)
  return orderBy(listings, l => {
    const { latitude, longitude } = l.location
    const from = new google.maps.LatLng({ lat: +latitude, lng: +longitude })
    return google.maps.geometry.spherical.computeDistanceBetween(from, to)
  }, direction)
}

export const sortListings = (listings, sortByType, toLocation) => {
  switch (sortByType) {
    case sortByEnum.price_asc:
      return orderBy(listings, 'price', 'asc')
    case sortByEnum.price_desc:
      return orderBy(listings, 'price', 'desc')
    case sortByEnum.listing_date_desc:
      return orderBy(listings, l => Date.parse(l.listed_date), 'desc')
    case sortByEnum.beds_desc:
      return orderBy(listings, 'bedrooms', 'desc')
    case sortByEnum.baths_desc:
      return orderBy(listings, 'bathroom_details.bathrooms_display', 'desc')
    case sortByEnum.total_square_footage_desc:
      return orderBy(listings, 'sqr_footage', 'desc')
    case sortByEnum.distance_from_user_lat_lon_asc:
      return sortListingsByDistance(listings, toLocation) 
    default:
      return listings
  }
}
