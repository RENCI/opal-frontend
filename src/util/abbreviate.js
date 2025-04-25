import { analytes } from '@data'

export const abbreviate = id => analytes?.find(a => a.id === id)?.abbreviation || 'Unknown';
