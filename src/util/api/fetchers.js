import api from './';
import { batchFetch } from './batch-fetch';
import { chemicalFormulaLaTeX } from '@util';

export const fetchSampleData = (onProgress) => async () =>
  await batchFetch({
    endpoint: '/pfas_sample_data_npl',
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
    console.error(`Fetching superfund sites failed: ${ error.message }`);
    return [];
  })

export const fetchSuperfundSites = (onProgress) => async () =>
  await batchFetch({
    endpoint: '/superfund_npl',
    perPage: 25,
    batchSize: 5,
    onProgress,
  });

export const fetchSamplesNearSuperfundSites = ({
  miles,
  pi,
  pfasb,
}) => async () => {
  const baseUrl = `${ process.env.API_HOST }/podm/api/distance_from_npl`;
  
  // build query path
  let path = `/miles=${ miles }&pi=${ pi }`;
  if (pfasb !== undefined) {
    path += `&pfasb=${ pfasb ? 'True' : 'False' }`;
  }
  path += '/get-distance/?format=json';

  try {
    const response = await fetch(`${ baseUrl }${ path }`);
    if (!response.ok) {
      throw new Error(`Fetching superfund sites failed: ${ response.statusText }`);
    }

    const data = await response.json();

    // transform
    return data.map(entry => ({
      id: entry.ogc_fid.toString(),
      name: entry.npl_site_name,
      latitude: entry.npd_latitude,
      longitude: entry.npl_longitude,
      pfas: entry.pfas,
      score: entry.npl_site_score,
    }));
  } catch (error) {
    console.error('Failed to fetch Superfund sites:', error);
    return [];
  }
};
