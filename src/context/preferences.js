import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles'
import { theme } from '../theme'
import { useToggleLocalStorage } from '@hooks'
import { PreferencesDrawer } from '@components/preferences'

//

const PreferencesContext = createContext({ })

export const usePreferences = () => useContext(PreferencesContext)

const PreferencesInterface = ({ children }) => {
  const { mode, setMode } = useColorScheme()
  const [drawerVisibility, setDrawerVisibility] = useState(false)

  const togglePreferences = () => setDrawerVisibility(!drawerVisibility)
  const closePreferences = () => setDrawerVisibility(false)
  const openPreferences = () => setDrawerVisibility(true)

  const inLightMode = useMemo(() => mode === 'light', [mode])
  const inDarkMode = useMemo(() => mode === 'dark', [mode])
  const otherColorMode = useMemo(() => inDarkMode ? 'light' : 'dark', [mode])
  const toggleColorMode = useCallback(() => setMode(otherColorMode), [mode])

  const cache = useToggleLocalStorage('use-cache')
  const showPolicyAgreementOnStart = useToggleLocalStorage('show-policy-agreement-on-start')

  useEffect(() => {
    if (!cache.enabled) { localStorage.removeItem('PFAS_DATA_CACHE') }
  }, [cache.enabled])

  return (
    <PreferencesContext.Provider value={{
      visibility: drawerVisibility,
      hide: closePreferences,
      show: openPreferences,
      toggle: togglePreferences,
      colorMode: {
        current: mode,
        other: otherColorMode,
        toggle: toggleColorMode,
        light: inLightMode,
        dark: inDarkMode,
      },
      showPolicyAgreementOnStart,
      cache,
    }}>
      { children }
      <PreferencesDrawer />
    </PreferencesContext.Provider>
  )
}

PreferencesInterface.propTypes = {
  children: PropTypes.node,
}

//

export const PreferencesProvider = ({ children }) => {
  return (
    <CssVarsProvider
      theme={ theme }
      defaultMode="light"
    >
      <PreferencesInterface>
        { children }
      </PreferencesInterface>
    </CssVarsProvider>
  )
}

PreferencesProvider.propTypes = {
  children: PropTypes.node,
}
