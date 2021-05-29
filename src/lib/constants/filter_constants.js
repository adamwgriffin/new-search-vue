import pick from 'lodash/pick'
import { sortByEnum } from '@/lib/constants/search_param_constants'

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

export const defaultSortOptions = pick(sortByEnum, [
  'price_desc',
  'price_asc',
  'listing_date_desc',
  'listing_date_asc',
  'beds_desc',
  'beds_asc',
  'baths_desc',
  'baths_asc',
  'total_square_footage_desc',
  'total_square_footage_asc',
  'distance_from_user_lat_lon_asc'
])
