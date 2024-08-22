import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNoti: (state, action) => {
      state.push({
        id: uuidv4(),
        type: action.payload.type,
        message: action.payload.message,
      })
    },
    removeNoti: (state, action) => {
      return state.filter(
        (notification) => notification.id !== action.payload.id
      )
    },
  },
})

const { addNoti, removeNoti } = notificationsSlice.actions

export default notificationsSlice.reducer

// Thunk actions to handle different notification types and timeouts
export const sendNotification =
  (type, message, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4()
    dispatch(addNoti({ id, type, message }))

    setTimeout(() => {
      dispatch(removeNoti({ id }))
    }, timeout)
  }

export const successNotification = (message, timeout = 5000) =>
  sendNotification('success', message, timeout)
export const errorNotification = (message, timeout = 5000) =>
  sendNotification('danger', message, timeout)
export const warningNotification = (message, timeout = 5000) =>
  sendNotification('warning', message, timeout)
export const infoNotification = (message, timeout = 5000) =>
  sendNotification('info', message, timeout)
export const removeNotification = (id) => (dispatch) => {
  dispatch(removeNoti({ id }))
}
