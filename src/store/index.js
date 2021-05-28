import { createStore } from 'vuex'
import userModules from './user'
import shareModules from './share'
import localStoragePlugin from './plugins'


export default createStore({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    user: userModules,
    share: shareModules,
  },
  plugins: [localStoragePlugin],
})
