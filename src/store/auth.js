import api from '../api.js'

const user = JSON.parse(localStorage.getItem('user'))
if (user && user.authToken) {
  api.defaults.headers.common.Authorization = 'Bearer ' + user.authToken
}

export const auth = {
  namespaced: true,
  state: {
    user,
    loggedIn: !!user
  },
  actions: {
    login ({
      commit
    }, data) {
      return api.post('/auth/login', data)
        .then((r) => {
          if (r.data && r.data.token) {
            const user = {
              userName: data.login,
              authToken: r.data.token
            }
            commit('loginSuccess', user)
            return Promise.resolve({ ...user })
          } else {
            commit('loginFailure')
            return Promise.reject(r.data)
          }
        })
        .catch((e) => {
          commit('loginFailure')
          return Promise.reject(e)
        })
    },
    logout ({
      commit
    }) {
      commit('logout')
    }
  },
  mutations: {
    loginSuccess (state, data) {
      state.user = data
      state.loggedIn = true
      api.defaults.headers.common.Authorization = 'Bearer ' + data.authToken
      localStorage.setItem('user', JSON.stringify(data))
    },
    loginFailure (state) {
      state.loggedIn = false
      state.user = null
      api.defaults.headers.common.Authorization = null
      localStorage.removeItem('user')
    },
    logout (state) {
      state.loggedIn = false
      state.user = null
      api.defaults.headers.common.Authorization = null
      localStorage.removeItem('user')
    }
    // registerSuccess (state) {
    //   state.status.loggedIn = false
    // },
    // registerFailure (state) {
    //   state.status.loggedIn = false
    // }
  }
}
