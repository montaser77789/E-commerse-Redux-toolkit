import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import Login from './Slices/features/Login'

const store = configureStore({
  reducer: {
    login:Login

  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store


