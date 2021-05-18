// options for @googlemaps/loader, which loads Google Maps by creating a script tag with these params in it. things like
// your api key and the libraries you want to load go here
export const mapLoaderOptions = {
  client: "gme-windermeresolutions",
  libraries: ['drawing', 'places', 'geometry']
}

// default options for the map itself, such as what UI controls to enable, etc.
export const mapOptions = {
  center: {
    lat: 47.6847,
    lng: -122.3848,
  },
  zoom: 11,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false
}
