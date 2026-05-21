import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import { useKpiData } from '../hooks/useKpiData'
import './AppLayout.css'

function AppLayout() {
  const { status, errorMsg } = useKpiData()

  if (status === 'idle' || status === 'loading') {
    return (
      <div className="app-loading">
        <span className="app-loading-title">NORTHSTAR ANALYTICS</span>
        <span className="app-loading-sub">Loading...</span>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="app-error">
        <span className="app-error-msg">{errorMsg}</span>
      </div>
    )
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-layout-main">
        <div className="app-layout-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout
