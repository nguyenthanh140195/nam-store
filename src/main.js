import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import i18n from './i18n'
// import mixin from './helps/mixin'
import plugins from './helps/plugins'

let app = createApp(App)

app.use(store)
app.use(router)

// app.use(i18n)
// app.mixin(mixin)
app.use(plugins)

app.mount('#app')
