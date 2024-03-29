export const websitesSearchParams = Object.freeze({
  agent_uuid: 'f74a3f6d-aeda-4daa-835e-029386152405',
  pgsize: 20,
  pricemin: null,
  pricemax: null,
  bed_min: 0,
  bath_min: 0,
  sold_days: 180,
  openhouse: 2,
  openhouse_virtual: false,
  openhouse_in_person: false,
  // a.k.a., "property type"
  ptype: [1,2,3,4,5,7,9],
  status: 'active',
  ex_pend: false,
  ex_cs: false,
  sqft_min: null,
  sqft_max: null,
  ls_conversion: 'acres',
  lotsize_min: null,
  lotsize_max: null,
  yearblt_min: null,
  yearblt_max: null,
  // a.k.a, Time on MLS
  days_indb: null,
  water: null,
  view: null,
  onestory: null,
  has_garage: null,
  new_const: null,
  virtual_tour: null,
  has_pool: null,
  senior_community: null,
  sort_by: 1,
})

export const sortByEnum = Object.freeze({
  baths_desc: 3,
  baths_asc: 4,
  beds_desc: 5,
  beds_asc: 6,
  distance_from_user_lat_lon_asc: 11,
  distance_from_user_lat_lon_desc: 12,
  listing_date_asc: 9,
  listing_date_desc: 10,
  price_desc: 1,
  price_asc: 2,
  status_category_asc: 7,
  status_category_desc: 8,
  total_square_footage_desc: 13,
  total_square_footage_asc: 14,
  total_lot_square_footage_desc: 15,
  total_lot_square_footage_asc: 16,
  sold_date_desc: 17,
  sold_date_asc: 18
})

export const sortByDistanceValues = Object.freeze([
  sortByEnum.distance_from_user_lat_lon_asc,
  sortByEnum.distance_from_user_lat_lon_desc
])
