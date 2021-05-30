import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import i18n from './i18n'
// import mixin from './helps/mixin'
import plugins from './helps/plugins'
import loading from './helps/loading'
import directives from './helps/directives'

let app = createApp(App)

app.use(store)
app.use(router)

// app.use(i18n)
app.use(plugins)
app.use(loading)
// app.mixin(mixin)
app.use(directives)

app.mount('#app')
