import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import DrillDown from '../components/DrillDown/DrillDown'
import { useDashboard } from '../store'

function DrillDownPage() {
  const { kpiId } = useParams<{ kpiId: string }>()
  const { kpis, rows } = useDashboard()
  const kpi = kpis.find((item) => item.id === kpiId)
  if (!kpi) {
    return (
      <>
        <Header title="KPI not found" />
        <div className="page-not-found">
          KPI not found. <Link to="/">Go back</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Header title={kpi.label} />
      <DrillDown kpi={kpi} rows={rows} />
    </>
  )
}

export default DrillDownPage
