import axios from 'axios'
import pLimit from 'p-limit'

const API_URL = `${ process.env.API_HOST }/podm/api`
const PER_PAGE = 1000
const CONCURRENT_LIMIT = 10 // number of concurrent requests, to avoid rate limits

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const fetchSampleData = accessToken => async () => {
  console.info(`Fetching data from ${ API_URL }/pfas_sample_data...`)

  if (!accessToken) {
    console.error('Missing access token')
    return []
  }

  const getFirstPage = async () => {
    try {
      const { data } = await axios.get(
        `${ API_URL }/pfas_sample_data?page=1&psize=1`,
        {
          timeout: 1000 * 5, // 5 seconds
          headers: {
            Authorization: `Bearer ${ accessToken }`,
            'Content-Type': 'application/json',
          },
        }
      )
      return data
    } catch (error) {
      console.error(error.message)
      return null
    }
  }

  // Fetch first page to determine total count
  const data = await getFirstPage()
  if (!data || !data.count) return []

  const numPages = Math.ceil(data.count / PER_PAGE)
  const limit = pLimit(CONCURRENT_LIMIT)

  const fetchPage = async (page) => {
    await delay(page * 100) // Stagger requests by 200ms per page
    try {
      const { data } = await axios.get(
        `${ API_URL }/pfas_sample_data?page=${ page + 1 }&psize=${ PER_PAGE }`,
        {
          timeout: 1000 * 5, // 5 seconds
          headers: {
            Authorization: `Bearer ${ accessToken }`,
            'Content-Type': 'application/json',
          },
        }
      )
      return data.results
    } catch (error) {
      console.error(`Error fetching page ${page + 1}:`, error.message)
      return []
    }
  }

  // Fetch all pages with concurrency control
  const fetchTasks = Array.from({ length: numPages }, (_, p) => limit(() => fetchPage(p)))
  return Promise.all(fetchTasks).then(responses => responses.flat())
}
