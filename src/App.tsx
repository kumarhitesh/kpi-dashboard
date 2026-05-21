import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import GridPage from './pages/GridPage'

const DrillDownPage = lazy(() => import('./pages/DrillDownPage'))

function DrillDownRoute() {
  return (
    <Suspense fallback={<div className="page-loading">Loading KPI details...</div>}>
      <DrillDownPage />
    </Suspense>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<GridPage />} />
          <Route path="/kpi/:kpiId" element={<DrillDownRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
