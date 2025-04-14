import { useCallback, useEffect, useMemo, useState } from 'react'
import { Stack, Typography } from '@mui/joy'
import { Toolbar } from '@components/layout'
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
  Pagination,
} from '@components/table'
import { TableCsvExportButton } from '@components/buttons'

import { AppStatus } from '@components/app-status'

const relevantFilterKeys = [
  'sample_id', 'study', 'pi', 'units', 'medium',
  'city', 'state', 'zipcode',
]

export const NonTargetedView = () => {
  const { ntarData, ntarProgress, podmTable } = useData()
  const [isPreparingTable, setIsPreparingTable] = useState(true)  // table preparation state

  const relevantFilters = useMemo(() => podmTable
      .columnFilters
      .filter(f => relevantFilterKeys.includes(f.id)),
    [podmTable.columnFilters.length]
  )
  
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data: ntarData.data ?? [],
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

  const TableToolbar = useCallback(() => (
    <Toolbar>
      <RowsCount />
      <Pagination table={ table } />
      <ColumnSelect table={ table } />
      <TableCsvExportButton table={ table } />
    </Toolbar>
  ))

  // once data is available and table is initialized, set `isPreparingTable` to false
  useEffect(() => {
    if (ntarData.isSuccess && table.getRowModel().rows.length > 0) {
      setIsPreparingTable(false); // data is now processed and table can be rendered
    }
  }, [ntarData.isSuccess, table.getRowModel().rows.length])

  return (
    <Stack>
      <TableToolbar />
      
      {
        // has not started or is still going
        ntarData.isPending || ntarData.isLoading
          ? <AppStatus message={ `Loading Non-targeted data :: ${ntarProgress.percent}%` } />
          : isPreparingTable
            ? <AppStatus message="Preparing table" />
            : <DataTable
                table={ table }
                sx={{ '.filter': { display: 'none' } }}
              />
            }

      <TableToolbar />
    </Stack>
  )
}
