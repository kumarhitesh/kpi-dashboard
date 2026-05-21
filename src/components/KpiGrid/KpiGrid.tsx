import type { KpiResult } from '../../utils/computeKpis'
import { getKpiIcon } from '../kpiIcons'
import KpiCard from '../KpiCard/KpiCard'
import './KpiGrid.css'

interface KpiGridProps {
  kpis: KpiResult[]
  onCardClick: (id: string) => void
}

function KpiGrid({ kpis, onCardClick }: KpiGridProps) {
  return (
    <div className="kpi-grid-page">
      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            kpi={kpi}
            icon={getKpiIcon(kpi.id)}
            onClick={() => onCardClick(kpi.id)}
          />
        ))}
      </div>
      <p className="kpi-grid-footer">Data as of 4QFY26 - Click any card to explore</p>
    </div>
  )
}

export default KpiGrid
