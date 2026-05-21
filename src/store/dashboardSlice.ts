import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { KpiResult } from '../utils/computeKpis'
import type { RawRow } from '../utils/parseData'

interface DashboardState {
  rows: RawRow[]
  kpis: KpiResult[]
  status: 'idle' | 'loading' | 'ready' | 'error'
  errorMsg: string
}

const initialState: DashboardState = {
  rows: [],
  kpis: [],
  status: 'idle',
  errorMsg: '',
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading(state) {
      state.status = 'loading'
      state.errorMsg = ''
    },
    setReady(state, action: PayloadAction<{ rows: RawRow[]; kpis: KpiResult[] }>) {
      state.rows = action.payload.rows
      state.kpis = action.payload.kpis
      state.status = 'ready'
    },
    setError(state, action: PayloadAction<string>) {
      state.errorMsg = action.payload
      state.status = 'error'
    },
  },
})

export const { setLoading, setReady, setError } = dashboardSlice.actions
export default dashboardSlice.reducer
