const initialState = () => {
  return {
    serviceBase: '',
    serviceVersion: '',
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
  mutations,
}
