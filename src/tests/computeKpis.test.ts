import { expect, test } from '@jest/globals'
import { readFileSync } from 'node:fs'
import { computeAllKpis, computeByDimension } from '../utils/computeKpis'
import { parseRows } from '../utils/parseData'

const csv = readFileSync('public/kpi_dataset.csv', 'utf8')
const rows = parseRows(csv)
const kpis = computeAllKpis(rows)

const valueFor = (id: string) => kpis.find((kpi) => kpi.id === id)?.currentValue

test('computes the main KPI values', () => {
  expect(valueFor('bookings')).toBeCloseTo(47_357_213, -3)
  expect(valueFor('win-rate')).toBeCloseTo(44.1, 0)
  expect(valueFor('new-logos')).toBe(10)
  expect(valueFor('avg-deal-size')).toBeCloseTo(520_000, -4)
})

test('groups bookings by theater', () => {
  const theaters = computeByDimension(rows, 'bookings', 'THEATER')
  expect(theaters.map((theater) => theater.label)).toEqual(['Americas', 'EMEA', 'APJ'])
})
