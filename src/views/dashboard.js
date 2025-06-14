import { useMemo } from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'
import { Sheet } from '@mui/joy'
import { AuthMenu } from '@components/auth'
import {
  DataProvider,
  PreferencesProvider,
} from '@context'
import {
  DashboardHeader,
  DashboardMenu,
  Footer,
} from '@components/layout'
import { useToggleState } from '@hooks'

import { HomeView } from './home'

import { PfasView } from './pfas'
import { TableView } from './pfas/table'
import { ChartsView } from './pfas/charts'
import { CompareView } from './pfas/compare'

import { AnalytesView } from './analytes'
import { PolicyView } from './policy'
import { Ucmr5View } from './ucmr5'
import { NonTargetedView } from './non-targeted'
import { NotFoundView } from './'
import { PolicyAgreementDialog } from '@components/policy-agreement'

//

export const DashboardView = () => {
  const filtersDrawer = useToggleState(false)

  const headerEndActions = useMemo(() => [
    <DashboardMenu key="dashboard-menu" />,
    <AuthMenu key="auth-action-button" />,
  ], [])

  return (
    <PreferencesProvider>
      <DataProvider>
        <DashboardHeader
          startAction={ null }
          endActions={ headerEndActions }
        />
        <Sheet component="main" sx={{
          width: filtersDrawer.enabled ? 'calc(100vw - 360px)' : '100vw',
          marginLeft: filtersDrawer.enabled ? '360px' : '0',
          transition: 'margin-left 250ms ease-out, min-width 250ms ease-out',
          overflow: 'auto',
          position: 'relative',
          px: 2,
          pt: 6,
        }}>
          <Routes>
            <Route index element={ <HomeView /> } />
            <Route path="pfas" element={ <PfasView /> }>
              <Route index element={ <TableView /> } />
              <Route path="table" element={ <TableView /> } />
              <Route path="charts" element={ <ChartsView /> } />
              <Route path="compare" element={ <CompareView /> } />
            </Route>
            <Route path="pfas2" element={ <Ucmr5View /> } />
            <Route path="analytes" element={ <AnalytesView /> } />
            <Route path="non-targeted" element={ <NonTargetedView /> } />
            <Route path="policy" element={ <PolicyView /> } />
            <Route path="*" element={ <NotFoundView /> } />
          </Routes>
{/*
          <FiltersDrawer open={ filtersDrawer.enabled } onClose={ filtersDrawer.unset } />
*/}
        </Sheet>
        <Footer />
        <PolicyAgreementDialog />
      </DataProvider>
    </PreferencesProvider>
  )
}
