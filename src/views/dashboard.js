import { useMemo } from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'
import { Sheet } from '@mui/joy'
import { useTheme } from '@mui/joy/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AuthMenu } from '@components/auth'
import {
  DataProvider,
  PreferencesProvider,
} from '@context'
import {
  CompactDashboardMenu,
  DashboardMenu,
  DashboardHeader,
  Footer,
} from '@components/layout'

import { HomeView } from './home'
import { AboutView } from './about'

import { PfasView } from './pfas'
import { TableView } from './pfas/table'
import { ChartsView } from './pfas/charts'
import { CompareView } from './pfas/compare'

import { AnalytesView } from './analytes'
import { Ucmr5View } from './ucmr5'
import { NonTargetedView } from './non-targeted'
import { NotFoundView } from './'
import { PolicyAgreementDialog } from '@components/policy-agreement'

//

export const DashboardView = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down(1000));

  const headerEndActions = useMemo(() => {
    let actions = [<AuthMenu key="auth-action-button" />];
    if (!smallScreen) {
      actions.unshift(<DashboardMenu key="dashboard-menu" />);
    }
    return actions;
  }, [smallScreen]);

  const headerStartActions = useMemo(() => {
    let actions = [];
    if (smallScreen) {
      actions.push(<CompactDashboardMenu key="dashboard-menu-button" />);
    }
    return actions;
  }, [smallScreen]);

  return (
    <PreferencesProvider>
      <DataProvider>
        <DashboardHeader
          startAction={ headerStartActions }
          endActions={ headerEndActions }
        />
        <Sheet component="main" sx={{
          width: '100vw',
          transition: 'margin-left 250ms ease-out, min-width 250ms ease-out',
          overflow: 'auto',
          position: 'relative',
          px: 2,
          pt: 6,
        }}>
          <Routes>
            <Route index element={ <HomeView /> } />
            <Route path="about" element={ <AboutView /> } />
            <Route path="pfas" element={ <PfasView /> }>
              <Route index element={ <TableView /> } />
              <Route path="table" element={ <TableView /> } />
              <Route path="charts" element={ <ChartsView /> } />
              <Route path="compare" element={ <CompareView /> } />
            </Route>
            <Route path="pfas2" element={ <Ucmr5View /> } />
            <Route path="analytes" element={ <AnalytesView /> } />
            <Route path="non-targeted" element={ <NonTargetedView /> } />
            <Route path="*" element={ <NotFoundView /> } />
          </Routes>
        </Sheet>
        <Footer />
        <PolicyAgreementDialog />
      </DataProvider>
    </PreferencesProvider>
  )
}
