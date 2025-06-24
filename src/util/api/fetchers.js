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
    { id: "love-canal", name: "Love Canal", latitude: 43.0826, longitude: -79.0006 },
    { id: "hanford-site", name: "Hanford Site", latitude: 46.5547, longitude: -119.4302 },
    { id: "tar-creek", name: "Tar Creek", latitude: 36.9511, longitude: -94.8424 },
    { id: "hudson-river-pcb", name: "Hudson River PCBs", latitude: 42.9487, longitude: -73.6775 },
    { id: "welsbach-co", name: "Welsbach & General Gas Mantle", latitude: 39.9286, longitude: -75.1196 },
    { id: "mcguire-afb", name: "McGuire Air Force Base", latitude: 40.0146, longitude: -74.5911 },
    { id: "oak-ridge-reservation", name: "Oak Ridge Reservation", latitude: 35.9606, longitude: -84.2551 },
    { id: "rocky-mountain-arsenal", name: "Rocky Mountain Arsenal", latitude: 39.8375, longitude: -104.8991 },
    { id: "butte-area", name: "Butte Priority Soils", latitude: 46.0038, longitude: -112.5341 },
    { id: "times-beach", name: "Times Beach", latitude: 38.5025, longitude: -90.6979 },
    { id: "bunker-hill", name: "Bunker Hill Mining & Metallurgical", latitude: 47.5381, longitude: -116.1258 },
    { id: "valley-of-drums", name: "Valley of the Drums", latitude: 38.0641, longitude: -85.7356 },
    { id: "tringle-chemical", name: "Triangle Chemical Co.", latitude: 30.5215, longitude: -87.2181 },
    { id: "libby-asbestos", name: "Libby Asbestos Site", latitude: 48.3925, longitude: -115.5525 },
    { id: "gowanus-canal", name: "Gowanus Canal", latitude: 40.6762, longitude: -73.9938 },
  ];
  return data;
};
