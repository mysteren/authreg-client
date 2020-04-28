/*
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
})

// axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

// const token = document.head.querySelector('meta[name="csrf-token"]')

// if (token) {
//   window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
// } else {
//   console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
// }

/**
* We'll add interceptors to redirect user to login once we get 401 response
* */

axiosInstance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    window.location.href = '/login'
  }

  return Promise.reject(error)
})

export default axiosInstance
