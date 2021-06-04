import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import i18n from './i18n'
import toast from './toast/toast'
// import mixin from './helps/mixin'
import plugins from './helps/plugins'
import loading from './loading/loading'
import directives from './helps/directives'

let app = createApp(App)

app.use(store)
app.use(router)

app.use(toast)
// app.use(i18n)
app.use(plugins)
app.use(loading)
// app.mixin(mixin)
app.use(directives)

app.mount('#app')
