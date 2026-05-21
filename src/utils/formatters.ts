export type ValueFormat = 'dollar' | 'percent' | 'number'

const MONEY_UNITS = [
  { value: 1e9, suffix: 'B' },
  { value: 1e6, suffix: 'M' },
  { value: 1e3, suffix: 'K' },
]

export function formatValue(value: number, format: ValueFormat): string {
  if (format === 'dollar') {
    const unit = MONEY_UNITS.find((item) => value >= item.value)
    if (unit) return '$' + (value / unit.value).toFixed(1) + unit.suffix
    return '$' + value.toFixed(0)
  }

  if (format === 'percent') return value.toFixed(1) + '%'

  return Math.round(value).toLocaleString()
}

export function formatDelta(delta: number, format: ValueFormat): string {
  const prefix = delta >= 0 ? '+' : '-'
  return prefix + formatValue(Math.abs(delta), format)
}
