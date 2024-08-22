import axios from 'axios'
import store from '@/stores/store'
import { errorNotification } from '@/stores/notification.store'
import { refreshAuthTokens, logout } from '@/stores/auth.store'
import { BASE_URL } from '@/constants'

const $httpNoAuth = axios.create({
  baseURL: BASE_URL,
})
const $http = axios.create({
  baseURL: BASE_URL,
})

$http.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.auth.accessToken

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
$http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const state = store.getState()
    if (
      error.response &&
      error.response.data.statusCode === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        await store.dispatch(refreshAuthTokens())
        originalRequest.headers.Authorization = `Bearer ${state.auth.accessToken}`
        return $http(originalRequest)
      } catch (err) {
        store.dispatch(logout())
        window.location.href = '/login'
        return Promise.reject(err)
      }
    }
    store.dispatch(errorNotification(error.response.data.message))
    return Promise.reject(error)
  }
)
$httpNoAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    store.dispatch(errorNotification(error.response.data.message))
    return Promise.reject(error)
  }
)

export { $httpNoAuth, $http }
