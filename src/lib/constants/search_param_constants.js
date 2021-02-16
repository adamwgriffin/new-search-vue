import { PROPERTY_STATUS_TYPE_IDS } from '@/lib/constants/listing_constants'

export const CORE_PARAMS = {
  location_search_field: '',
  agent_uuid: 'f74a3f6d-aeda-4daa-835e-029386152405',
  pgsize: 20,
  pricemin: null,
  pricemax: null,
  bed_min: 0,
  bath_min: 0
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
  ...IDX_PARAMS
}