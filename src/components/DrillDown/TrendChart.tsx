import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { CURRENT_Q } from '../../utils/computeKpis'
import type { KpiResult } from '../../utils/computeKpis'
import { formatValue } from '../../utils/formatters'

interface TrendChartProps {
  kpi: KpiResult
}

const axisTick = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  fill: 'var(--text-muted)',
}

const barLabel = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  fill: 'var(--text-secondary)',
}

function TrendChart({ kpi }: TrendChartProps) {
  const formatChartValue = (value: unknown) => formatValue(Number(value), kpi.format)

  return (
    <div className="drilldown-panel">
      <div className="drilldown-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={kpi.trend} margin={{ top: 20, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--brand)"
              strokeOpacity={0.18}
              vertical={false}
            />
            <XAxis
              dataKey="quarter"
              tick={axisTick}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatChartValue}
              width={72}
              tick={axisTick}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {kpi.trend.map((item) => (
                <Cell
                  key={item.quarter}
                  fill="var(--brand)"
                  fillOpacity={item.quarter === CURRENT_Q ? 1 : 0.3}
                />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                formatter={formatChartValue}
                style={barLabel}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TrendChart
