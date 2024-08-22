import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Default storage for web
import notificationsReducer from './notification.store'
import loaderReducer from './loader.store'
import authReducer from './auth.store'

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['accessToken', 'refreshToken', 'user'], // The data you want to persist
}
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    loader: loaderReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
export default store
