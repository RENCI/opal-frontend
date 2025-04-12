import { batchFetch } from './batch-fetch'

export const fetchSampleData = (accessToken, onProgress) => async () =>
  batchFetch({
    accessToken,
    endpoint: '/pfas_sample_data',
    perPage: 250,
    batchSize: 5,
    onProgress,
  })
