import axios from 'axios'
import jsonAdapter from 'axios-jsonp'

const instance = axios.create({ adapter: jsonAdapter })
// the instance created here does not include the methods we need to cancel requests but we can add them manually
instance.CancelToken = axios.CancelToken
instance.isCancel = axios.isCancel

export default instance
