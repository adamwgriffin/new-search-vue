// the value of google.maps.SymbolPath.CIRCLE is 0, so might as well just set that directly here, so we don't have to
// worry about whether google has loaded yet

export const LISTING_MARKER_ICON_BASE = {
  path: 0,
  scale: 8,
  fillColor: "#0f2b59",
  fillOpacity: 1.0,
  strokeColor: 'white',
  strokeWeight: 2.5
}

export const listingMarkerIcon = (options={}) => ({ ...LISTING_MARKER_ICON_BASE, ...options })

export const listingMarker = (google, position, map, icon, options={}) => {
  return new google.maps.Marker({ position, map, icon, ...options })
}
