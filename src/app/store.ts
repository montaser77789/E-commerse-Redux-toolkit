import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import Login from './Slices/features/Login'
import CartSlice from './Slices/features/CartSlice'
import glopalSlice from './Slices/features/glopalSlice'


const store = configureStore({
  reducer: {
    cart:CartSlice,
    login:Login,
    drawer:glopalSlice

  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store


