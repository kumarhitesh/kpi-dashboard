import type { RawRow } from './parseData'
import type { ValueFormat } from './formatters'

export const CURRENT_Q = '4QFY26'
export const PRIOR_Q = '3QFY26'
export const PRIOR_YEAR_Q = '4QFY25'
export const QUARTER_ORDER = ['4QFY25', '1QFY26', '2QFY26', '3QFY26', '4QFY26']

type KpiId =
  | 'bookings'
  | 'open-pipeline'
  | 'iqc-pipeline'
  | 'renewal-bookings'
  | 'avg-deal-size'
  | 'new-logos'
  | 'win-rate'

export type Dimension = 'THEATER' | 'PRODUCT' | 'SEGMENT'

interface KpiDefinition {
  id: KpiId
  label: string
  format: ValueFormat
  positiveIsGood: boolean
}

function sum(rows: RawRow[]): number {
  return rows.reduce((acc, r) => acc + r.KPI_VALUE, 0)
}

function rowsFor(rows: RawRow[], quarter: string, kpi: string): RawRow[] {
  return rows.filter((r) => r.FISCAL_QUARTER_NAME === quarter && r.KPI === kpi)
}

function countDistinct(rows: RawRow[], field: keyof RawRow): number {
  return new Set(rows.map((r) => r[field])).size
}

export interface KpiResult {
  id: KpiId
  label: string
  format: ValueFormat
  positiveIsGood: boolean
  currentValue: number
  priorQuarterValue: number
  priorYearValue: number
  trend: { quarter: string; value: number }[]
}

function getValue(rows: RawRow[], id: KpiId, quarter: string): number {
  const bookings = rowsFor(rows, quarter, 'Bookings')

  switch (id) {
    case 'bookings':
      return sum(bookings)

    case 'open-pipeline':
      return sum(rowsFor(rows, quarter, 'Open Pipeline'))

    case 'iqc-pipeline':
      return sum(rowsFor(rows, quarter, 'IQC Pipeline'))

    case 'renewal-bookings':
      return sum(rowsFor(rows, quarter, 'Renewal Bookings'))

    case 'avg-deal-size': {
      const dealCount = countDistinct(bookings, 'OPPORTUNITY_ID')
      return dealCount === 0 ? 0 : sum(bookings) / dealCount
    }

    case 'new-logos': {
      const newLogoBookings = bookings.filter((row) => row.NEW_LOGO_FLAG === 'Y')
      return countDistinct(newLogoBookings, 'ACCOUNT_ID')
    }

    case 'win-rate': {
      const atbats = sum(rowsFor(rows, quarter, 'Atbats'))
      return atbats === 0 ? 0 : (sum(bookings) / atbats) * 100
    }
  }
}

const KPI_LIST: KpiDefinition[] = [
  { id: 'bookings', label: 'Bookings', format: 'dollar', positiveIsGood: true },
  { id: 'open-pipeline', label: 'Open Pipeline', format: 'dollar', positiveIsGood: true },
  { id: 'iqc-pipeline', label: 'IQC Pipeline', format: 'dollar', positiveIsGood: true },
  { id: 'renewal-bookings', label: 'Renewal Bookings', format: 'dollar', positiveIsGood: true },
  { id: 'avg-deal-size', label: 'Avg Deal Size', format: 'dollar', positiveIsGood: true },
  { id: 'new-logos', label: 'New Logos', format: 'number', positiveIsGood: true },
  { id: 'win-rate', label: 'Win Rate', format: 'percent', positiveIsGood: true },
]

export function computeAllKpis(rows: RawRow[]): KpiResult[] {
  return KPI_LIST.map((kpi) => ({
    ...kpi,
    currentValue: getValue(rows, kpi.id, CURRENT_Q),
    priorQuarterValue: getValue(rows, kpi.id, PRIOR_Q),
    priorYearValue: getValue(rows, kpi.id, PRIOR_YEAR_Q),
    trend: QUARTER_ORDER.map((q) => ({
      quarter: q,
      value: getValue(rows, kpi.id, q),
    })),
  }))
}

export function computeByDimension(
  rows: RawRow[],
  kpiId: KpiId,
  dimension: Dimension,
): { label: string; value: number }[] {
  const quarterRows = rows.filter((r) => r.FISCAL_QUARTER_NAME === CURRENT_Q)
  const labels = [...new Set(quarterRows.map((r) => r[dimension]))]

  return labels
    .map((label) => ({
      label,
      value: getValue(quarterRows.filter((r) => r[dimension] === label), kpiId, CURRENT_Q),
    }))
    .sort((a, b) => b.value - a.value)
}
