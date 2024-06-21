import { useCallback, useMemo, useState } from 'react'
import {
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/joy'
import { useData } from '@context'

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { nonTargetedColumns } from '@data'
import {
  ColumnSelect,
  DataTable,
  ExportButton,
  Pagination,
} from '@components/table'

const relevantFilterKeys = [
  'sample_id', 'study', 'pi', 'units', 'medium',
  'city', 'state', 'zipcode',
]

export const NonTargetedView = () => {
  const { ntarData, podmTable } = useData()

  const relevantFilters = useMemo(() => podmTable
      .columnFilters
      .filter(f => relevantFilterKeys.includes(f.id)),
    [podmTable.columnFilters.length]
  )
  
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data: ntarData.data,
    columns: nonTargetedColumns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      columnFilters: relevantFilters,
      pagination,
      sorting,
    },
  })

  const RowsCount = () => (
    <Typography level="body-md" sx={{ whiteSpace: 'nowrap' }}>
      { table.getPrePaginationRowModel().rows.length } rows
    </Typography>
  )

  const Toolbar = useCallback(() => (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      gap={ 2 }
      divider={ <Divider orientation="vertical" /> }
      sx={{
        position: 'sticky',
        left: 0,
        display: 'inline-flex',
      }}
    >
      <RowsCount />
      <Pagination table={ table } />
      <ColumnSelect table={ table } />
      <ExportButton table={ table } />
    </Stack>
  ))

  if (ntarData.isPending || ntarData.isLoading) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 'calc(100px + 5rem)' }}
      >
        <CircularProgress size="lg" />
      </Stack>
    )
  }

  return (
    <Stack direction="column" gap={ 2 }>
      <Toolbar />
      
      <DataTable
        table={ table }
        sx={{ '.filter': { display: 'none' } }}
      />

      <Toolbar />
    </Stack>
  )
}
