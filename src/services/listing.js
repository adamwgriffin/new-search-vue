import axios from 'axios'
import jsonAdapter from 'axios-jsonp'

const SERVICE_BASE = 'https://svc-qa.moxiworks.com'
const SERVICE_VERSION = 'v1'

const http = axios.create({ adapter: jsonAdapter })

const serviceUrl = (serviceBase=SERVICE_BASE, serviceVersion=SERVICE_VERSION) => {
  return `${serviceBase}/service/${serviceVersion}/listing/search_v2`
}

export const getListings = (params) => http({ url: serviceUrl(), params })
