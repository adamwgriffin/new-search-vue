import difference from 'lodash/difference'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
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
  return listings.map(l => ({
     lat: +l.location.latitude,
     lng: +l.location.longitude,
     listingid: l.listingid 
  }))
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
  sold_days(state) {
    if (state.searchParams.status === 'active') {
      return { sold_days: null }
    }
  },

  openhouse(state) {
    const { openhouse, openhouse_virtual, openhouse_in_person } = state.searchParams
    // if the user selected both openhouse_virtual and openhouse_in_person, then what will get them both from the
    // listing service is to only send the openhouse param
    if (openhouse_virtual && openhouse_in_person) {
      return { openhouse: openhouse, openhouse_in_person: null, openhouse_virtual: null }
    } else if (!openhouse_virtual && !openhouse_in_person) {
      // don't send the openhouse param if neither openhouse_virtual or openhouse_in_person were selected because
      // sending just the openhouse param will be interpreted as selecting both openhouse_in_person & openhouse_virtual
      return { openhouse: null }
    }
  }
}

export const modifyParams = (originalParams, state, getters, rootState, rootGetters) => {
  const newParams = Object.entries(originalParams)
    .reduce((modifiedParams, [param, value]) => {
      return {
        ...modifiedParams,
        [param]: value,
        ...modifyParam[param]?.(state, getters, rootState, rootGetters)
      }
    }, {})
  return omitBy(newParams, (value) => !value)
}
