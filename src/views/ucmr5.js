import { useCallback, useEffect, useState } from 'react'
import {
  Stack,
  Typography,
} from '@mui/joy'
import { Toolbar } from '@components/layout'
import {
  ColumnSelect,
  DataTable,
  Pagination,
} from '@components/table'
import { TableCsvExportButton } from '@components/buttons'
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ucmr5Columns } from '@data'
import { fetchUcmr5SampleData } from '@util'
import { useProgress } from '@hooks'
import { AppStatus } from '@components/app-status'
import { useQuery } from '@tanstack/react-query'

//

export const Ucmr5View = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const progress = useProgress()
  const [isPreparingTable, setIsPreparingTable] = useState(true)
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([])

  const ucmr5Query = useQuery({
    queryKey: ['ucmr5'],
    queryFn: fetchUcmr5SampleData(progress.onProgress),
  })

  const ucmr5Table = useReactTable({
    data: ucmr5Query.data ?? [],
    columns: ucmr5Columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
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

  const SampleCount = useCallback(() => (
    <Typography level="body-md" sx={{ whiteSpace: 'nowrap' }}>
      { ucmr5Table.getPrePaginationRowModel().rows.length } samples
    </Typography>
  ), [ucmr5Table.getPrePaginationRowModel().rows.length])

  // once data is available and table is initialized, set `isPreparingTable` to false
  useEffect(() => {
    if (ucmr5Query.isSuccess && ucmr5Table.getRowModel().rows.length > 0) {
      setIsPreparingTable(false); // data is now processed and table can be rendered
    }
  }, [ucmr5Query.isSuccess, ucmr5Table.getRowModel().rows.length])

  return (
    <Stack direction="column">
      <Toolbar>
        <SampleCount />
        <Pagination table={ ucmr5Table } />
        <ColumnSelect table={ ucmr5Table } />
        <TableCsvExportButton table={ ucmr5Table } />
      </Toolbar>

      {
        // has not started or is still going
        ucmr5Query.isPending || ucmr5Query.isLoading
          ? <AppStatus message={ `Loading targeted secondary data :: ${progress.percent}%` } />
          : isPreparingTable
            ? <AppStatus message="Preparing table" />
            : <DataTable table={ ucmr5Table } />
      }

      <Toolbar>
        <SampleCount />
        <Pagination table={ ucmr5Table } />
      </Toolbar>
    </Stack>
  )
}

