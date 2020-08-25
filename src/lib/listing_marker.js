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

export const svgIcon = ({ fill }) => {
  return `
  <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" fill="${fill}" stroke="white" stroke-width="2"></circle>
  </svg>
  `
}

export const listingMarkerIcon = (options) => ({
  url: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgIcon(options))}`,
  // size: new google.maps.Size(200, 200),
  // scaledSize: new google.maps.Size(16, 16),
  // anchor: new google.maps.Point(16, 16),
  // labelOrigin: new google.maps.Point(16, 16)
})

export const listingMarker = (google, position, map, icon, options={}) => {
  return new google.maps.Marker({ position, map, icon, ...options })
}
