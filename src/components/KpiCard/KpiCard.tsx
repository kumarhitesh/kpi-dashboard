import type { ReactNode } from 'react'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import type { KpiResult } from '../../utils/computeKpis'
import { formatDelta, formatValue } from '../../utils/formatters'
import './KpiCard.css'

interface KpiCardProps {
  kpi: KpiResult
  icon: ReactNode
  onClick: () => void
}

function getDelta(kpi: KpiResult) {
  const delta = kpi.currentValue - kpi.priorQuarterValue
  return {
    value: delta,
    isGood: (delta >= 0) === kpi.positiveIsGood,
  }
}

function KpiCard({ kpi, icon, onClick }: KpiCardProps) {
  const delta = getDelta(kpi)
  const DeltaIcon = delta.isGood ? RiArrowUpLine : RiArrowDownLine
  const firstPoint = kpi.trend[0]
  const lastPoint = kpi.trend[kpi.trend.length - 1]
  const trendGood = (lastPoint.value >= firstPoint.value) === kpi.positiveIsGood
  const deltaClass = delta.isGood ? 'kpi-card-delta-good' : 'kpi-card-delta-bad'
  const trendClass = trendGood ? 'kpi-card-trend-good' : 'kpi-card-trend-bad'

  return (
    <button
      className="kpi-card"
      onClick={onClick}
      aria-label={`View ${kpi.label} details`}
    >
      <div className="kpi-card-top">
        <span className="kpi-card-label">{kpi.label}</span>
        <span className="kpi-card-icon">{icon}</span>
      </div>
      <span className="kpi-card-value">{formatValue(kpi.currentValue, kpi.format)}</span>
      <span className={`kpi-card-delta ${deltaClass}`}>
        <DeltaIcon aria-hidden="true" />
        {formatDelta(delta.value, kpi.format)} vs Q3
      </span>
      <div className={`kpi-card-trend ${trendClass}`}>
        <span className="kpi-card-trend-label">
          {firstPoint.quarter} to {lastPoint.quarter}
        </span>
        <span className="kpi-card-trend-value">
          {formatValue(firstPoint.value, kpi.format)} to {formatValue(lastPoint.value, kpi.format)}
        </span>
      </div>
    </button>
  )
}

export default KpiCard
