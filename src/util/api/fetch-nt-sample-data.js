import axios from 'axios'
import pLimit from 'p-limit'
import { delay } from '../delay'

const API_URL = `${ process.env.API_HOST }/podm/api`
const PER_PAGE = 500
const CONCURRENT_LIMIT = 5 // number of concurrent requests

export const fetchNonTargetedSampleData = accessToken => async () => {
  console.log(`Fetching data from ${ API_URL }/ntar_sample_data...`)

  if (!accessToken) {
    console.error('Missing access token')
    return []
  }

  const getFirstPage = async () => {
    try {
      const { data } = await axios.get(
        `${ API_URL }/ntar_sample_data?`
        + `fields=sample_id,study,pi,units,medium,city,state,zipcode,pfas_short_name,pfas_long_name,flags,measurement`
        + `&page=1&psize=1`,
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

  // fetch first page; determine total count
  const data = await getFirstPage()
  if (!data || !data.count) return []

  const numPages = Math.ceil(data.count / PER_PAGE)
  const limit = pLimit(CONCURRENT_LIMIT)

  const fetchPage = async (page) => {
    await delay(page * 50) // stagger requests per page
    try {
      const { data } = await axios.get(
        `${ API_URL }/ntar_sample_data?`
        + `fields=sample_id,study,pi,units,medium,city,state,zipcode,pfas_short_name,pfas_long_name,flags,measurement`
        + `&page=${ page + 1 }&psize=${ PER_PAGE }`,
        {
          timeout: 1000 * 10, // 5 seconds
          headers: {
            Authorization: `Bearer ${ accessToken }`,
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(`ntar_sample_data: ${ page + 1 } / ${ numPages }`)
      return data.results
    } catch (error) {
      console.error(`Error fetching page ${page + 1}:`, error.message)
      return []
    }
  }

  // fetch all pages with concurrency control
  const fetchTasks = Array.from({ length: numPages }, (_, p) => limit(() => fetchPage(p)))
  return Promise.all(fetchTasks).then(responses => responses.flat())
}
