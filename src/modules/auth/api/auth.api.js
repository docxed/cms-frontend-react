import { setAuthTokens } from '@/stores/auth.store'
import store from '@/stores/store'

const useAuthAPI = () => {
  const register = async (payload) => {
    const res = await $httpNoAuth.post('/auth/register', payload)
    return res.data
  }
  const login = async (payload) => {
    const res = await $httpNoAuth.post('/auth/login', payload)
    await store.dispatch(
      setAuthTokens(res.data.access_token, res.data.refresh_token)
    )
    return
  }
  const getMe = async () => {
    const res = await $http.get('/auth/me')
    return res.data
  }
  const refresh = async () => {
    const state = store.getStore()
    const res = await $httpNoAuth.post('/auth/refresh-token', {
      refresh_token: state.auth.refreshToken,
    })
    return res.data
  }

  return {
    register,
    login,
    getMe,
    refresh,
  }
}

export default useAuthAPI
