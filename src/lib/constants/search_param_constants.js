import { PROPERTY_STATUS_TYPE_IDS } from '@/lib/constants/listing_constants'

export const CORE_PARAMS = {
  location_search_field: '',
  agent_uuid: 'f74a3f6d-aeda-4daa-835e-029386152405',
  pgsize: 20,
  pricemin: null,
  pricemax: null,
  bed_min: 0,
  bath_min: 0,
  sold_days: 180,
  openhouse: null,
  openhouse_virtual: false,
  openhouse_in_person: false,
  // a.k.a., "property type"
  ptype: [1, 2, 9],
}

// params used exclusively for IDX (public) search, e.g., Websites
export const IDX_PARAMS = {
  status: 'active',
  ex_pend: true,
  ex_cs: true
}

// params used exclusively in CMA
export const CMA_PARAMS = {
  pstatus: PROPERTY_STATUS_TYPE_IDS,
  bath_max: null,
  bed_max: null
}

export const WEBSITES_SEARCH_PARAMS = {
  ...CORE_PARAMS,
  ...IDX_PARAMS,
}

// these are only the search params that are needed for the "(More) Filters" part of the Websites form
export const WEBSITES_MORE_FILTERS_PARAMS = [
  'status',
  'ex_pend',
  'ex_cs',
  'sold_days',
  'openhouse',
  'openhouse_virtual',
  'exopenhouse_in_person_cs',
  'ptype'
]
