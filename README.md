# NorthStar KPI Dashboard

## Run
```bash
npm run dev
```

## Test
```bash
npm run test
```

## Styling
- `src/index.css` holds the core color palette, body styles, fonts, and the small global reset.
- Component CSS files own layout, responsive behavior, spacing, borders, colors, typography, radius, hover states, and chart/table styling.
- Softer palette variants use `rgba(var(--*-rgb), opacity)`, so color values stay centralized.
- Components should use CSS variables for visual values instead of hardcoded colors.

## Data Flow
- `useKpiData()` loads `public/kpi_dataset.csv`, computes KPI summaries, and writes shared data to Redux.
- Redux stores `rows`, `kpis`, `status`, and `errorMsg`.
- Pages read shared data from Redux and render either the KPI grid or a route-based drilldown.

## Routing
- `/` shows the executive KPI grid.
- `/kpi/:kpiId` shows a drilldown page for that KPI.
- Sidebar KPI paths are generated from the loaded KPI data, so navigation stays synced with Redux.

## Accessibility
- KPI cards are real buttons with clear `aria-label` text, so they work with keyboard and screen readers.
- Sidebar items use React Router `NavLink`, which exposes the active route state and keeps navigation semantic.
- Text colors come from shared tokens and are chosen for readable contrast on the dark theme.
- Drilldown details are available as a table, so the dimension breakdown is not chart-only.

## Adding A New KPI
1. Add one entry to `KPI_LIST` in `src/utils/computeKpis.ts`.
2. Add one case to `getValue()` in `src/utils/computeKpis.ts`.
3. Add the KPI to the sidebar/icon maps if it should be navigable.

## Architecture
- `src/utils/computeKpis.ts` has pure business logic and computes KPI values from parsed CSV rows.
- `src/utils/formatters.ts` owns all number formatting for delta positive/negative, for money suffix(M, B, K).
- `src/utils/parseData.ts` owns CSV parsing.
- `src/hooks/useKpiData.ts` owns loading and error handling, and feeds data to the store.
- `src/store` owns Redux state.

## Library Choices

- React Router — Used for dynamic client-side routing and KPI drilldown pages.
- Redux Toolkit — Used for centralized shared state management, avoiding unnecessary re-renders and keeping KPI data accessible across routes/components.
- Recharts — Used for responsive KPI visualizations and trend charts with simple React integration.
- React Icons — Used for lightweight and consistent KPI/navigation icons.
- Papa Parse — Used for fast and reliable CSV parsing. 
