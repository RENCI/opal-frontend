import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import PropTypes from 'prop-types'

import { useLocation } from 'react-router-dom';

import { QueryClient, useQuery } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { set, get, del } from 'idb-keyval'

import { compress, decompress } from 'lz-string'

import { usePreferences } from '@context'
import { analytes, podmColumns } from '@data'
import { ConnectionStatus } from '@components/connection-status'

import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  fetchAnalytes,
  fetchNonTargetedSampleData,
  fetchSampleData,
  useToken,
} from '@util'

// utility hook to track loading progress
export function useProgress() {
  const [fetched, setFetched] = useState(0)
  const [total, setTotal] = useState(0)

  const onProgress = useCallback((rowsFetched, totalRows) => {
    setFetched(rowsFetched)
    setTotal(totalRows)
  }, [])

  const percent = total ? Math.round((fetched / total) * 100) : 0

  return {
    fetched,
    total,
    percent,
    onProgress,
  }
}

// context for the app's data (and table)
const DataContext = createContext({ })
export const useData = () => useContext(DataContext)

export const DataWrangler = ({ accessToken, children }) => {
  const location = useLocation()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [isPreparingTable, setIsPreparingTable] = useState(true)  // table preparation state

  const pfasProgress = useProgress()

  // queries for PFAS, NTAR, and analytes
  const pfasQueryEnabled = true // always
  const pfasDataQuery = useQuery({
    queryKey: ['pfas_sample_data', accessToken],
    queryFn: fetchSampleData(accessToken, pfasProgress.onProgress),
    enabled: pfasQueryEnabled,
  })

  const nonTargetedQueryEnabled = location.pathname === '/non-targeted'
  const nonTargetedDataQuery = useQuery({
    queryKey: ['non_targeted_sample_data', accessToken],
    queryFn: fetchNonTargetedSampleData(accessToken),
    enabled: nonTargetedQueryEnabled,
  })

  const analytesQueryEnabled = location.pathname === '/analytes'
  const analytesQuery = useQuery({
    queryKey: ['analytes', accessToken],
    queryFn: fetchAnalytes(accessToken),
    enabled: analytesQueryEnabled,
  })

  // table for displaying PFAS data
  const table = useReactTable({
    data: pfasDataQuery.data ?? [],
    columns: podmColumns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state: {
      columnFilters,
      pagination,
      sorting,
    },
    debugAll: false,
  })

  // once data is available and table is initialized, set `isPreparingTable` to false
  useEffect(() => {
    if (pfasDataQuery.isSuccess && table.getRowModel().rows.length > 0) {
      setIsPreparingTable(false); // data is now processed and table can be rendered
    }
  }, [pfasDataQuery.isSuccess, table.getRowModel().rows.length])

  const filterCount = table.getAllLeafColumns().filter(col => col.getIsFiltered()).length

  const abbreviate = useCallback(id => analytes?.find(a => a.id === id)?.abbreviation || 'Unknown', [])

  return (
    <DataContext.Provider value={{
      pfasData: pfasDataQuery,
      ntarData: nonTargetedDataQuery,
      analytesData: analytesQuery,
      analytes,
      abbreviate,
      podmTable: {
        table,
        columnFilters, setColumnFilters,
        sorting, setSorting,
      },
      filterCount,
    }}>
      {
        // hasn't started       or is still going
        pfasDataQuery.isPending || pfasDataQuery.isLoading
          ? <ConnectionStatus message={ `Loading PFAS data :: ${pfasProgress.percent}%` } />
          : isPreparingTable
            ? <ConnectionStatus message="Preparing table" />
            : children
      }
    </DataContext.Provider>
  )
}

DataWrangler.propTypes = {
  children: PropTypes.node,
  accessToken: PropTypes.string,
}

// tanstack Query machinery
const asyncPersister = createAsyncStoragePersister({
  storage: {
    getItem: async (key) => {
      const raw = await get(key);
      return raw ? JSON.parse(decompress(raw)) : null;
    },
    setItem: async (key, value) => {
      const compressed = compress(JSON.stringify(value));
      await set(key, compressed);
    },
    removeItem: async (key) => {
      await del(key);
    },
  },
})
const queryClient = new QueryClient({
  defaultOptions: { queries: {
    staleTime: 1000 * 60 * 60 * 24, // 1 day,
  }, },
})

export const DataProvider = ({ children }) => {
  const preferences = usePreferences()

  const { accessToken, error } = useToken()

  if (!accessToken && !error) {
    return (
      <ConnectionStatus
        message="Establishing connection to API"
      />
    )
  }

  if (!accessToken && error) {
    return (
      <ConnectionStatus
        message={ error }
        status="error"
      />
    )
  }

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
      <DataWrangler accessToken={ accessToken }>
        { children }
      </DataWrangler>
    </PersistQueryClientProvider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node,
}
