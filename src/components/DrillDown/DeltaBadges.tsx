import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import type { KpiResult } from '../../utils/computeKpis'
import { formatDelta } from '../../utils/formatters'
import type { ValueFormat } from '../../utils/formatters'

interface DeltaBadgesProps {
  kpi: KpiResult
}

interface DeltaItem {
  label: string
  value: number | null
  format: ValueFormat
}

function getDeltas(kpi: KpiResult): DeltaItem[] {
  const qoqAbs = kpi.currentValue - kpi.priorQuarterValue
  const yoyAbs = kpi.currentValue - kpi.priorYearValue

  return [
    { label: 'QoQ change', value: qoqAbs, format: kpi.format },
    {
      label: 'QoQ %',
      value: kpi.priorQuarterValue === 0 ? null : (qoqAbs / kpi.priorQuarterValue) * 100,
      format: 'percent',
    },
    { label: 'YoY change', value: yoyAbs, format: kpi.format },
    {
      label: 'YoY %',
      value: kpi.priorYearValue === 0 ? null : (yoyAbs / kpi.priorYearValue) * 100,
      format: 'percent',
    },
  ]
}

function getBadgeClass(value: number | null, positiveIsGood: boolean) {
  if (value == null) return 'delta-badge-neutral'
  return (value >= 0) === positiveIsGood ? 'delta-badge-good' : 'delta-badge-bad'
}

function DeltaBadges({ kpi }: DeltaBadgesProps) {
  return (
    <div className="delta-badges">
      {getDeltas(kpi).map((delta) => {
        const badgeClass = getBadgeClass(delta.value, kpi.positiveIsGood)
        const Icon = delta.value != null && delta.value >= 0 ? RiArrowUpLine : RiArrowDownLine

        return (
          <div key={delta.label} className={`delta-badge ${badgeClass}`}>
            <span className="delta-badge-label">{delta.label}</span>
            <span className="delta-badge-value">
              {delta.value == null ? (
                'N/A'
              ) : (
                <>
                  <Icon />
                  {formatDelta(delta.value, delta.format)}
                </>
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default DeltaBadges
