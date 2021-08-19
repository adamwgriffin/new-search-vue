const initialState = () => {
  return {
    serviceBase: null,
    serviceVersion: null,
    company_uuid: null,
  }
}

export const getters = {
  baseUrl(state) {
    return `${state.serviceBase}/service/${state.serviceVersion}` 
  }
}

export const mutations = {
  setEnvironment(state, environmentObj) {
    const { serviceBase, serviceVersion, company_uuid } = environmentObj
    state.serviceBase = serviceBase
    state.serviceVersion = serviceVersion
    state.company_uuid = company_uuid
  },
}

export default {
  state: initialState(),
  getters,
  mutations,
}
