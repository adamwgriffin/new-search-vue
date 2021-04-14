import { PROPERTY_STATUS_TYPE_IDS } from '@/lib/constants/listing_constants'

export const WEBSITES_SEARCH_PARAMS = {
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
  status: 'active',
  ex_pend: true,
  ex_cs: true,
  sqft_min: null,
  sqft_max: null,
  ls_conversion: 'acres',
  lotsize_min: null,
  lotsize_max: null,
}
