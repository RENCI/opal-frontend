import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useData } from '@context'
import { AppStatus } from '@components/app-status'

export const PfasView = () => {
  const { pfasData, pfasProgress } = useData()

  return (
    <Fragment>
      {
        // has not started or is still going
        pfasData.isPending || pfasData.isLoading
          ? <AppStatus message={ `Loading PFAS data :: ${pfasProgress.percent}%` } />
          : <Outlet />
      }
    </Fragment>
  )
}
