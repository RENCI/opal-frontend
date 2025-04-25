import axios from 'axios'
import { getValidToken } from './token'
import { API_URL } from '@util/api/url'

export * from './fetchers'

const api = axios.create({
  baseURL: API_URL,
})

// Request interceptor: attach token
api.interceptors.request.use(async (config) => {
  const token = await getValidToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Optional: response interceptor to retry on 401
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      await getValidToken()
      const token = await getValidToken()
      originalRequest.headers.Authorization = `Bearer ${token}`
      return api(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default api
