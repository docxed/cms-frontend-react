import { createSlice } from '@reduxjs/toolkit'
import { persistor } from './store'
import useAuthAPI from '@/modules/auth/api/auth.api'
const authAPI = useAuthAPI()

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    clear: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
    },
  },
})

const { setTokens, clear, setUser } = authSlice.actions
export default authSlice.reducer

export const setAuthTokens =
  (accessToken, refreshToken) => async (dispatch) => {
    try {
      dispatch(setTokens({ accessToken, refreshToken }))
      const user = await authAPI.getMe()
      dispatch(setUser(user))
    } catch (err) {
      dispatch(logout())
      throw err
    }
  }
export const refreshAuthTokens = () => async (dispatch) => {
  try {
    const res = await authAPI.refresh()
    dispatch(setAuthTokens(res.access_token, res.refresh_token))
  } catch (err) {
    dispatch(logout())
    throw err
  }
}
export const logout = () => (dispatch) => {
  dispatch(clear())
  persistor.purge()
}
