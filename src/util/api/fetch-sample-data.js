import { batchFetch } from './batch-fetch'

export const fetchSampleData = (onProgress) => async () =>
  await batchFetch({
    endpoint: '/pfas_sample_data',
    perPage: 250,
    batchSize: 9,
    onProgress,
  })
