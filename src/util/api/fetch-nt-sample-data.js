import { batchFetch } from './batch-fetch'

export const fetchNonTargetedSampleData = accessToken => async () =>
  batchFetch({
    accessToken,
    endpoint: '/ntar_sample_data',
    perPage: 250,
    batchSize: 5,
  })
