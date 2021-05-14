export const latLngBoundsLiteralToClass = (latLngBoundsLiteral) => {
  const { north, east, south, west } = latLngBoundsLiteral
  return new google.maps.LatLngBounds({ lat: south, lng: west }, { lat: north, lng: east })
}
