const defaultMetaInfoLabels = { beds: 'BR', baths: 'BA', size: 'SQFT' }

export const getBathrooms = (listing) => {
  return listing.bathroom_details.bathrooms_display ||
    listing.bathroom_details.total_bathrooms ||
    listing.bathrooms ||
    0
}

const f = (n) => n.toLocaleString()

export const formatSqft = ({ sqr_footage, sqr_foot_min, sqr_foot_max }) => {
  if (sqr_footage) {
    return f(sqr_footage)
  } else if (sqr_foot_min && sqr_foot_max < 50000) {
    return `${f(sqr_foot_min)} - ${f(sqr_foot_max)}`
  } else if (sqr_foot_min && sqr_foot_max >= 50000) {
    return `${f(sqr_foot_min)}+`;
  }
}

export const listingCardMetaInfo = (listing, labels=defaultMetaInfoLabels, separator=' | ') => {
  return [
    { value: listing.bedrooms, label: labels.beds},
    { value: getBathrooms(listing), label: labels.baths},
    { value: formatSqft(listing), label: labels.size}
  ]
    .filter(m => m.value)
    .map(m => `${m.value} ${m.label}`)
    .join(separator)
}

// the name and path for coordinates are different depending on the service call
export const getListingCoordinates = (listing) => {
  const l = listing.location || listing
  return {
    lat: +(l.latitude || l.lat),
    lng: +(l.longitude || l.lng)
  }
}
