const CALLBACK_NAME = 'gmapsCallback'

let initialized = !!window.google
let resolveInitPromise
let rejectInitPromise
// This promise handles the initialization status of the google maps script.
const initPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve
  rejectInitPromise = reject
})

// we're using @googlemaps/loader in favor of this for now
export const initializeGoogleMaps = () => {
  // If Google Maps already is initialized the `initPromise` should get resolved eventually.
  if (initialized) return initPromise
  initialized = true
  // The callback function is called by the Google Maps script if it is successfully loaded.
  window[CALLBACK_NAME] = () => resolveInitPromise(window.google)

  // We inject a new script tag into the `<head>` of our HTML to load the Google Maps script.
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src = `https://maps.googleapis.com/maps/api/js?client=gme-windermeresolutions&callback=${CALLBACK_NAME}`;
  script.src = `//maps.googleapis.com/maps/api/js?client=gme-windermeresolutions&libraries=drawing,places,geometry&callback=${CALLBACK_NAME}`
  script.onerror = rejectInitPromise
  document.querySelector('head').appendChild(script)
  return initPromise
}

export const geocode = (geocoder, request) => {
  return new Promise((resolve, reject) => {
    geocoder.geocode(request, (results, status) => {
      status === 'OK' ? resolve({ results, status }) : reject(new Error(status))
    })
  })
}
