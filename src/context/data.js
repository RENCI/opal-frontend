/*
  this context provider is responsible for application data.
  it fetches, massages, assembles, and--of course--provides data.
*/
import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import {
  CircularProgress,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy'
import {
  ErrorOutline as ErrorIcon
} from '@mui/icons-material'

import { QueryClient, useQuery } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import { compress, decompress } from 'lz-string'

import { usePreferences } from '@context'
import { analytes } from '@data'

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
import { podmColumns } from '@data'
import {
  fetchAnalytes,
  fetchNonTargetedSampleData,
  fetchSampleData,
  useToken,
} from '@util'

//

const CACHE_KEY = 'PFAS_DATA_CACHE'

const CONNECTION_STATE_ICONS = {
  busy: <CircularProgress size="sm" />,
  error: <ErrorIcon color="error" />
}

const ConnectionStatus = ({
  message = '',
  status = 'busy',
}) => {
  return (
    <Sheet
      component={ Stack }
      variant="solid"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'absolute',
        left: 0, right: 0,
        top: 0, bottom: 0,
        '.MuiTypography-root': {
          p: 2,
        },
      }}
    >
      <Typography
        level="body-xl"
        variant="soft"
        startDecorator={ CONNECTION_STATE_ICONS[status] }
      >{ message }</Typography>
    </Sheet>
  )
}

ConnectionStatus.propTypes = {
  message: PropTypes.string,
  status: PropTypes.oneOf(Object.keys(CONNECTION_STATE_ICONS)),
}


// we want tanstack's queryClient available within our data context,
// so we create a wrapper that provides tanstack query functionality.

const DataContext = createContext({ })
export const useData = () => useContext(DataContext)

export const DataWrangler = ({ accessToken, children }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])

  const pfasDataQuery = useQuery({
    queryKey: ['pfas_sample_data'],
    queryFn: fetchSampleData(accessToken),
  })

  const nonTargetedDataQuery = useQuery({
    queryKey: ['ntar_sample_data'],
    queryFn: fetchNonTargetedSampleData(accessToken),
  })

  const analytesQuery = useQuery({
    queryKey: ['pfas_name_classification_info'],
    queryFn: fetchAnalytes(accessToken)
  });

  const table = useReactTable({
    data: pfasDataQuery.data,
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
  })

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
        pfasDataQuery.isPending || pfasDataQuery.isLoading
          ? <ConnectionStatus message="Fetching data" />
          : children
      }
    </DataContext.Provider>
  )
}

DataWrangler.propTypes = {
  children: PropTypes.node,
  accessToken: PropTypes.string,
}

// Tanstack Query machinery
const persister = createSyncStoragePersister({
  key: CACHE_KEY,
  storage: window.localStorage,
  // we're potentially dealing with a significant
  // amount of data, and local storage isn't huge,
  // so we want to pack it down as much as we can.
  serialize: data => compress(JSON.stringify(data)),
  deserialize: data => JSON.parse(decompress(data)),
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
      client={ queryClient }
      persistOptions={{
        persister,
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
