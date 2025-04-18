import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { set, get, del } from 'idb-keyval'
// import { compress, decompress } from 'lz-string'
import { usePreferences } from '@context'

// context for the app's data (and table)
const DataContext = createContext({ })
export const useData = () => useContext(DataContext)

// tanstack Query machinery
const asyncPersister = createAsyncStoragePersister({
  storage: {
    getItem: async (key) => {
      const raw = await get(key);
      return raw ? JSON.parse(raw) : null;
    },
    setItem: async (key, value) => {
      const compressed = JSON.stringify(value);
      await set(key, compressed);
    },
    removeItem: async (key) => {
      await del(key);
    },
  },
})
const queryClient = new QueryClient({
  defaultOptions: { queries: {
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25,    // 25 hours (slightly longer than staleTime)
  }, },
})

export const DataProvider = ({ children }) => {
  const preferences = usePreferences()

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncPersister,
        dehydrateOptions: {
          shouldDehydrateQuery: () => preferences.cache.enabled,
        },
      }}
    >
      { children }
    </PersistQueryClientProvider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node,
}
