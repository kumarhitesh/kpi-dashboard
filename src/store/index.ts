import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import dashboardReducer from './dashboardSlice'

export const store = configureStore({ reducer: { dashboard: dashboardReducer } })

type RootState = ReturnType<typeof store.getState>

export function useAppDispatch() {
  return useDispatch()
}

export function useDashboard() {
  return useSelector((state: RootState) => state.dashboard)
}
