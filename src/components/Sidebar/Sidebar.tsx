import { NavLink } from 'react-router-dom'
import { RiDashboardLine } from 'react-icons/ri'
import { useDashboard } from '../../store'
import { getKpiIcon } from '../kpiIcons'
import './Sidebar.css'

function kpiPath(id: string) {
  return `/kpi/${id}`
}

function Sidebar() {
  const { kpis } = useDashboard()
  const navItems = [
    { label: 'Dashboard', icon: <RiDashboardLine />, path: '/' },
    ...kpis.map((kpi) => ({
      label: kpi.label,
      icon: getKpiIcon(kpi.id),
      path: kpiPath(kpi.id),
    })),
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-mark">NS</span>
        <span className="sidebar-logo-name">NORTHSTAR</span>
        <span className="sidebar-logo-sub">ANALYTICS</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            title={item.label}
            className={({ isActive }) => `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            <span className="sidebar-item-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-footer-text">Q4 FY2026</span>
      </div>
    </aside>
  )
}

export default Sidebar
