import difference from 'lodash/difference'
import omit from 'lodash/omit'
import { propertyTypes } from '@/lib/constants/property_types'

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
