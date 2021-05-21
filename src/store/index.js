import { createStore } from 'vuex'
import localStoragePlugin from './plugins'

export default createStore({
  state: {
    user: {
      name: ''
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [localStoragePlugin],
})
