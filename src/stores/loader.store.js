import { createSlice } from '@reduxjs/toolkit'

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false,
    message: '',
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true
      state.message = action.payload.message || 'Loading...'
    },
    stopLoading: (state) => {
      state.isLoading = false
      state.message = ''
    },
  },
})

const { startLoading, stopLoading } = loaderSlice.actions

export default loaderSlice.reducer

export const loaderStart = (message) => (dispatch) => {
  dispatch(startLoading({ message }))
}
export const loaderStop = () => (dispatch) => {
  dispatch(stopLoading())
}
