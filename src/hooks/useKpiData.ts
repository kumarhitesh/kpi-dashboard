import { useEffect } from 'react'
import { computeAllKpis } from '../utils/computeKpis'
import { loadData } from '../utils/parseData'
import { useAppDispatch, useDashboard } from '../store'
import { setError, setLoading, setReady } from '../store/dashboardSlice'

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Failed to load CSV'
}

export function useKpiData() {
  const dispatch = useAppDispatch()
  const dashboard = useDashboard()

  useEffect(() => {
    if (dashboard.status !== 'idle') return

    async function fetchData() {
      dispatch(setLoading())

      try {
        const rows = await loadData()
        const kpis = computeAllKpis(rows)
        dispatch(setReady({ rows, kpis }))
      } catch (error) {
        dispatch(setError(getErrorMessage(error)))
      }
    }

    void fetchData()
  }, [dashboard.status, dispatch])

  return dashboard
}
