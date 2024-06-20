import axios from 'axios'

const API_URL = `${ process.env.API_HOST }/podm/api`

export const fetchNonTargetedSampleData = accessToken => async () => {
  console.log(`fetching data from ${ API_URL }/ntar_sample_data...`)

  if (!accessToken) {
    console.error('missing access token')
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

  // first, let's get the first page and check the total number of pages.
  const data = await getFirstPage()

  if (!data.count) {
    return []
  }

  // if we're here, we have a non-zero number of pages,
  // so we make the neccssary number of requests.
  const PER_PAGE = 1000
  const promises = [...Array(Math.ceil(data.count / PER_PAGE)).keys()]
    .map(p => axios.get(
      `${ API_URL }/ntar_sample_data?`
        + `fields=sample_id,study,pi,units,medium,city,state,zipcode,pfas_short_name,pfas_long_name,flags,measurement`
        + `&page=${ p + 1 }&psize=${ PER_PAGE }`,
      {
        timeout: 1000 * 5, // 5 seconds
        headers: {
          Authorization: `Bearer ${ accessToken }`,
          'Content-Type': 'application/json',
        },
      }
    ))

  // return all results in one array.
  return Promise.all(promises)
    .then(responses => responses.map(r => r.data.results)
      .reduce((allData, d) => {
        allData.push(...d)
        return allData
      }, [])
    )
    .catch(error => {
      console.error(error)
      return []
    })
}
