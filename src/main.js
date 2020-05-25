/* Styles */
import '@/scss/main.scss'
import '@mdi/font/css/materialdesignicons.css'

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'

/* Router & Store */
import api from './api'
import router from './router'
import store from './store'

/* Service Worker */
import './registerServiceWorker'

/* Vue. Main component */
import App from './App.vue'

/* Default title tag */
const defaultDocumentTitle = 'AUTHREG'

/* Collapse mobile aside menu on route change & set document title from route meta */
router.afterEach(to => {
  store.commit('asideMobileStateToggle', false)

  if (to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

router.beforeEach((to, from, next) => {
  next()
  // if (to.name !== 'Login' /* && !isAuthenticated */) next({ name: 'Login' })
  // else next()
})

Vue.config.productionTip = false

Vue.prototype.$http = api

Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
