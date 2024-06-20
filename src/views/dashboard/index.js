import { useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Sheet } from '@mui/joy'
import { AuthMenu } from '@components/auth'
import { DataProvider, PreferencesProvider } from '@context'
import {
  DashboardHeader,
  DashboardMenu,
} from '@components/layout'
import { useToggleState } from '@hooks'
import { ChartView } from './chart'
import { AnalytesView } from './analytes'
import { CompareView } from './compare'
import { NonTargetedView } from './non-targeted'
import { NotFoundView } from '../'
import { TableView } from './table'
import { 
  FiltersDrawer,
  FiltersDrawerToggle,
} from '@components/filter'

//

export const DashboardView = () => {
  const filtersDrawer = useToggleState(false)

  const headerStartAction = useMemo(() => (
    <FiltersDrawerToggle
      active={ filtersDrawer.enabled }
      onClick={ filtersDrawer.toggle }
    />
  ), [filtersDrawer.enabled])

  const headerEndActions = useMemo(() => [
    <DashboardMenu key="dashboard-menu" />,
    <AuthMenu key="auth-action-button" />,
  ], [])

  return (
    <PreferencesProvider>
      <DataProvider>
        <DashboardHeader
          startAction={ headerStartAction }
          endActions={ headerEndActions }
        />
        <Sheet component="main" sx={{
          width: filtersDrawer.enabled ? 'calc(100vw - 360px)' : '100vw',
          marginLeft: filtersDrawer.enabled ? '360px' : '0',
          transition: 'margin-left 250ms ease-out, min-width 250ms ease-out',
          overflow: 'auto',
          position: 'relative',
          px: 2,
          pt: 8,
        }}>
          <Routes>
            <Route index element={ <TableView /> } />
            <Route path="analytes" element={ <AnalytesView /> } />
            <Route path="charts" element={ <ChartView /> } />
            <Route path="compare" element={ <CompareView /> } />
            <Route path="non-targeted" element={ <NonTargetedView /> } />
            <Route path="*" element={ <NotFoundView /> } />
          </Routes>
          <FiltersDrawer
            open={ filtersDrawer.enabled }
            onClose={ filtersDrawer.unset }
          />
        </Sheet>
      </DataProvider>
    </PreferencesProvider>
  )
}
