// range numbers for sqftOptionRanges & priceRangeNumbers represent: [start, end, increment by]. the end number is
// exclusive, so we have to add 1
export const sqftOptionRanges = [
  [100, 901, 100],
  [1000, 10001, 1000]
]

export const priceRangeNumbers = [
  [0, 100001, 10000],
  [125000, 1000001, 25000],
  [1100000, 2000001, 100000],
  [3000000, 10000001, 1000000],
  [100000000, 100000001, 0]
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
