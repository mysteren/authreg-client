import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
// import Tokens from '../views/Tokens/Index.vue'
// import TokensForm from '../views/Tokens/Form.vue'

Vue.use(VueRouter)

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: Login
  },

  /**
   * tokens
   */
  {
    path: '/tokens',
    name: 'tokens.index',
    component: () => import('../views/Tokens/Index.vue')
  },
  {
    path: '/tokens/new',
    name: 'tokens.new',
    component: () => import('../views/Tokens/Form.vue')
  },
  {
    path: '/tokens/:id',
    name: 'tokens.edit',
    component: () => import('../views/Tokens/Form.vue'),
    props: true
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const user = JSON.parse(localStorage.getItem('user'))
  const loggedIn = !!user

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
