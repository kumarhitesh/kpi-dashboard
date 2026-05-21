import { useState } from 'react'
import { computeByDimension } from '../../utils/computeKpis'
import type { Dimension, KpiResult } from '../../utils/computeKpis'
import type { RawRow } from '../../utils/parseData'
import { formatValue } from '../../utils/formatters'

interface DimensionBreakdownProps {
  kpi: KpiResult
  rows: RawRow[]
}

const dimensions: Dimension[] = ['THEATER', 'PRODUCT', 'SEGMENT']

function dimensionLabel(dimension: Dimension) {
  switch (dimension) {
    case 'THEATER':
      return 'Theater'
    case 'PRODUCT':
      return 'Product'
    case 'SEGMENT':
      return 'Segment'
  }
}

function DimensionBreakdown({ kpi, rows }: DimensionBreakdownProps) {
  const [dimension, setDimension] = useState<Dimension>('THEATER')
  const data = computeByDimension(rows, kpi.id, dimension)

  return (
    <>
      <div className="drilldown-tabs">
        {dimensions.map((item) => (
          <button
            key={item}
            className={`drilldown-tab ${dimension === item ? 'drilldown-tab-active' : ''}`}
            onClick={() => setDimension(item)}
            aria-pressed={dimension === item}
          >
            {dimensionLabel(item)}
          </button>
        ))}
      </div>

      <div className="drilldown-panel">
        <table className="drilldown-table">
          <thead>
            <tr>
              <th>{dimensionLabel(dimension)}</th>
              <th>4QFY26 value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{formatValue(row.value, kpi.format)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default DimensionBreakdown
