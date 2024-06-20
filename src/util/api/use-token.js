import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import { API_URL } from './'

// this hook is responsible for fetching & refreshing api tokens
export const useToken = () => {
  const [accessToken, setAccessToken] = useState(null)
  const [error, setError] = useState(null)

  const fetchToken = useCallback(async () => {
    try {
      const response = await axios.post(
        // the trailing slash is necessary here,
        // as it matches urls.py in the backend.
        `${ API_URL }/token/`,
        {
          username: process.env.API_USERNAME,
          password: process.env.API_PASSWORD,
        },
      )
      if (response.status !== 200) {
        throw new Error('invalid response')
      }
      const { access, refresh } = await response.data
      if (!access || !refresh) {
        throw new Error('could not locate tokens')
      }
      setAccessToken(access)
    } catch (error) {
      console.error(error.message)
      setError('An error occurred.')
      return
    }
  }, [])

  useEffect(() => {
    fetchToken()
  }, [])

  return { accessToken, error, fetchToken }
}