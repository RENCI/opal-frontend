// auth.js
import axios from 'axios'
import { API_URL } from './url'

let accessToken = null
let tokenExpiry = null
let isRefreshing = false
let refreshPromise = null

const fetchToken = async () => {
  const response = await axios.post(`${API_URL}/token/`, {
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
  })
  const { access } = response.data
  const payload = JSON.parse(atob(access.split('.')[1]))
  accessToken = access
  tokenExpiry = payload.exp * 1000
}

const getValidToken = async () => {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken
  }

  if (!isRefreshing) {
    isRefreshing = true
    refreshPromise = fetchToken().finally(() => {
      isRefreshing = false
    })
  }

  await refreshPromise
  return accessToken
}

export { getValidToken }
