import { RiLineChartLine, RiPieChartLine } from 'react-icons/ri'
import type { KpiResult } from '../../utils/computeKpis'
import type { RawRow } from '../../utils/parseData'
import { formatValue } from '../../utils/formatters'
import DeltaBadges from './DeltaBadges'
import TrendChart from './TrendChart'
import DimensionBreakdown from './DimensionBreakdown'
import './DrillDown.css'

interface DrillDownProps {
  kpi: KpiResult
  rows: RawRow[]
}

function DrillDown({ kpi, rows }: DrillDownProps) {
  return (
    <div className="drilldown">
      <div className="drilldown-hero">
        <span className="drilldown-kpi-value">{formatValue(kpi.currentValue, kpi.format)}</span>
      </div>

      <DeltaBadges kpi={kpi} />

      <div className="drilldown-analysis">
        <section className="drilldown-section">
          <div className="drilldown-section-header">
            <RiLineChartLine className="drilldown-section-icon" />
            <span className="drilldown-section-title">QUARTERLY TREND</span>
            <hr className="drilldown-section-line" />
          </div>
          <TrendChart kpi={kpi} />
        </section>

        <section className="drilldown-section">
          <div className="drilldown-section-header">
            <RiPieChartLine className="drilldown-section-icon" />
            <span className="drilldown-section-title">BREAKDOWN &middot; 4QFY26</span>
            <hr className="drilldown-section-line" />
          </div>
          <DimensionBreakdown kpi={kpi} rows={rows} />
        </section>
      </div>
    </div>
  )
}

export default DrillDown
