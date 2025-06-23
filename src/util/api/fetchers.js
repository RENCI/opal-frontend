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

export const fetchSuperfundSites = () => async () => {
  // simulate delay in API call
  await new Promise(resolve => setTimeout(resolve, 500));
  // mock data
  const data = [
    { id: 'libby-montana',    name: 'Libby Asbestos Site',         latitude: 48.3884, longitude: -115.5511 },
    { id: 'hudson-river-ny',  name: 'Hudson River PCBs',           latitude: 42.8121, longitude: -73.9396 },
    { id: 'love-canal-ny',    name: 'Love Canal',                  latitude: 43.0866, longitude: -78.9548 },
    { id: 'times-beach-mo',   name: 'Times Beach Dioxin Site',     latitude: 38.4936, longitude: -90.7813 },
    { id: 'hanford-wa',       name: 'Hanford Nuclear Reservation', latitude: 46.5547, longitude: -119.4432  },
  ];
  return data;
};
