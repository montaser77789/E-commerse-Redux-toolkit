import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import Login from './Slices/features/Login'
import CartSlice from './Slices/features/CartSlice'
import glopalSlice from './Slices/features/glopalSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
 
const persistConfig = {
  key: 'product',
  storage,
}
 
const persistedCart = persistReducer(persistConfig, CartSlice)


const store = configureStore({
  reducer: {
    cart:persistedCart,
    login:Login,
    drawer:glopalSlice

  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store

export const persist = persistStore(store)
