import api from './'
import { batchFetch } from './batch-fetch'
import { chemicalFormulaLaTeX } from '@util'

export const fetchSampleData = (onProgress) => async () =>
  await batchFetch({
    endpoint: '/pfas_sample_data',
    perPage: 250,
    batchSize: 9,
    onProgress,
  })

export const fetchUcmr5SampleData = (onProgress) => async () =>
  await batchFetch({
    endpoint: '/pfas_sample_data2',
    perPage: 250,
    batchSize: 9,
    onProgress,
  })

export const fetchNonTargetedSampleData = (onProgress) => async () =>
  await batchFetch({
    endpoint: '/ntar_sample_data',
    perPage: 250,
    batchSize: 5,
    onProgress,
  })

export const fetchAnalytes = async () => await api.get(
    `${ process.env.API_HOST }/podm/api/pfas_name_classification_info/?`
      + `fields=abbreviation,chemical_name,dtxsid,formula`
      + `&abbreviation__istartswith=PF`
      + `&psize=100`
      + `&format=json`
  ).then(response => response.data.results
    .map(analyte => ({
      ...analyte,
      id: analyte.abbreviation.toLowerCase(),
      formula_latex: String(chemicalFormulaLaTeX(analyte.formula)),
    }))
  ).catch(error => {
    console.error(error.message)
    return []
  })
