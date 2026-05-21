import { parse } from 'papaparse'

export interface RawRow {
  KPI: string
  KPI_VALUE: number
  FISCAL_QUARTER_NAME: string
  FISCAL_QUARTER_KEY: number
  THEATER: string
  PRODUCT: string
  SEGMENT: string
  OPPORTUNITY_ID: string
  ACCOUNT_ID: string
  NEW_LOGO_FLAG: string
}

const CSV_PATH = '/kpi_dataset.csv'

export function parseRows(text: string): RawRow[] {
  const { data, errors } = parse<RawRow>(text, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  })

  if (errors.length > 0) throw new Error('Failed to load CSV')

  return data
}

export async function loadData(): Promise<RawRow[]> {
  try {
    const response = await fetch(CSV_PATH)
    if (!response.ok) throw new Error('Failed to load CSV')
    return parseRows(await response.text())
  } catch (error) {
    throw new Error('Failed to load CSV', { cause: error })
  }
}
