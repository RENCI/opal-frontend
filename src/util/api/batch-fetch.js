import api from './api'
import { delay } from '../delay'

const baseUrl = `${process.env.API_HOST}/podm/api`

export const batchFetch = async ({
  endpoint,
  fields = '',
  perPage = 100,
  batchSize = 5,
  onProgress,
}) => {
  const API_URL = `${baseUrl}${endpoint}`

  const fieldParam = fields ? `fields=${fields}&` : ''

  const getFirstPage = async () => {
    try {
      const { data } = await api.get(`${API_URL}?${fieldParam}page=1&psize=1`)
      return data
    } catch (error) {
      console.error(error.message)
      return null
    }
  }

  const firstPage = await getFirstPage()
  if (!firstPage || !firstPage.count) return []

  const numPages = Math.ceil(firstPage.count / perPage)
  let pagesFetched = 0
  const results = []

  const fetchPage = async (page) => {
    try {
      const { data } = await api.get(`${API_URL}?${fieldParam}page=${page + 1}&psize=${perPage}`)
      pagesFetched += 1

      if (onProgress) onProgress(pagesFetched, numPages)

      return data.results
    } catch (error) {
      console.error(`Error fetching page ${page + 1}:`, error.message)
      return []
    }
  }

  for (let i = 0; i < numPages; i += batchSize) {
    const batch = []
    for (let j = 0; j < batchSize && i + j < numPages; j++) {
      batch.push(fetchPage(i + j))
    }

    const batchResults = await Promise.all(batch)
    results.push(...batchResults.flat())

    await delay(200)
  }

  return results
}
