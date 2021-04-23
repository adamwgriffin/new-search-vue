export const sqftOptionRanges = [
  // begin, end+1, increment
  [100, 901, 100],
  [1000, 10001, 1000]
]

export const lotSizeSqftOptions = [2000, 4500, 6500, 8000, 10890, 21780]

export const lotSizeAcreOptions = [.25, .5, 1, 2, 3, 4, 5, 10, 40, 100]

export const defaultSortOptions = {
  price_desc: 1,
  price_asc: 2,
  listing_date_desc: 10,
  listing_date_asc: 9,
  beds_desc: 5,
  beds_asc: 6,
  baths_desc: 3,
  baths_asc: 4,
  total_square_footage_desc: 13,
  total_square_footage_asc: 14,
  distance_from_user_lat_lon_asc: 11,
}
