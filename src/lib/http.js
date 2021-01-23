import axios from 'axios'
import jsonAdapter from 'axios-jsonp'

export default axios.create({ adapter: jsonAdapter })
