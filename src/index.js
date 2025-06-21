import { App } from './app'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@context'
import './index.css'
import '@fontsource/inter/'
import '@fontsource/inter/600.css'

const container = document.getElementById('root')
const root = createRoot(container)

const ProvisionedApp = () => (
  <BrowserRouter basename="/" forceRefresh={false}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)

root.render(<ProvisionedApp />)
