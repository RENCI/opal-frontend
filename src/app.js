import { Sheet } from '@mui/joy'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '@context'
import {
  DashboardView,
  LoginView,
} from './views'
import { Footer } from '@components/layout'

//

const ClosedApp = () => (
  <Sheet component="main">
    <Routes>
      <Route path="*" element={ <LoginView /> } />
    </Routes>
    <Footer />
  </Sheet>
)

//

export const App = () => {
  const auth = useAuth()

  if (!auth?.user || !auth?.user?.email_verified) {
    return <ClosedApp />
  }

  return <DashboardView />
}
