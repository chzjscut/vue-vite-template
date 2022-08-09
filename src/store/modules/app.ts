export default {
  state: () => ({
    sidebar: {
      collapsed: false
    }
  }),
  // getters: {
    
  // },
  mutations: {
    setSidebar(state, payload) {
      state.sidebar = {
        ...state.sidebar,
        ...payload
      }
    }
  },
  actions: {

  }
}