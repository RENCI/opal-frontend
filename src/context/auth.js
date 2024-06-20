import { createContext, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'

import { useNavigate } from 'react-router-dom'

const AuthContext = createContext({ })

export const useAuth = () => useContext(AuthContext)

const useDevelopmentAuth0 = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const user = useMemo(() => {
    if (!isAuthenticated) {
      return undefined
    }
    return {
      email: "email@ddre.ss",
      email_verified: true,
      family_name: "Doe",
      given_name: "J",
      locale: "en",
      name: "J Doe",
      nickname: "jdoe",
      picture: null,
      sub: "google-oauth2|XXXXXXXXXXXXXXXXXXXXX",
      updated_at: new Date().toISOString(),
    }
  }, [isAuthenticated])

  const loginWithRedirect = () => {
    setIsAuthenticated(true)
    navigate('/')
  }
  
  const logout = () => {
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  }
}

export const AuthInterface = ({ children }) => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout: auth0Logout,
  } = process.env.NODE_ENV !== 'production'
    ? useDevelopmentAuth0()
    : useAuth0()

  // these are simply wrappers around the Auth0 functions,
  // allowing injection of custom app-related logic.
  const login = () => {
    loginWithRedirect({
      appState: { targetUrl: '/' }
    })
  }
  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      }
    })
  }

  const providedValue = useMemo(() => ({ user, login, logout, isAuthenticated }), [user])

  return (
    <AuthContext.Provider value={ providedValue }>
      { children }
    </AuthContext.Provider>
  )
}

AuthInterface.propTypes = {
  children: PropTypes.node,
}

export const AuthProvider = ({ children }) => {
  return (
    <Auth0Provider
      domain="renci.auth0.com"
      clientId="wVibbe3STC4m6mh7EDL9Bk6aXLEljmFR"
      authorizationParams={{
        redirect_uri: `${ window.location.origin }`
      }}
    >
      <AuthInterface>
        { children }
      </AuthInterface>
    </Auth0Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}
