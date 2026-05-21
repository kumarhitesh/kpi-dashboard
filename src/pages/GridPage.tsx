import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import KpiGrid from '../components/KpiGrid/KpiGrid'
import { useDashboard } from '../store'

function GridPage() {
  const { kpis } = useDashboard()
  const navigate = useNavigate()

  return (
    <>
      <Header title="Executive Dashboard" />
      <KpiGrid kpis={kpis} onCardClick={(id) => navigate(`/kpi/${id}`)} />
    </>
  )
}

export default GridPage
