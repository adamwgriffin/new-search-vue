const initialState = () => {
  return {
    serviceBase: '',
    serviceVersion: '',
  }
}

export const getters = {
  baseUrl(state) {
    return `${state.serviceBase}/service/${state.serviceVersion}` 
  }
}

export const mutations = {
  setServiceBase(state, value) {
    state.serviceBase = value
  },

  setServiceVersion(state, value) {
    state.serviceVersion = value
  }
}

export default {
  state: initialState(),
  getters,
  mutations,
}
