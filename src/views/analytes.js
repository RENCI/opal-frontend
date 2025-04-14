import { useCallback, useEffect, useState } from 'react'
import {
  Stack,
  Typography,
} from '@mui/joy'
import { useData } from '@context'
import { Toolbar } from '@components/layout'
import {
  DataTable,
} from '@components/table'
import { TableCsvExportButton } from '@components/buttons'
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { analyteColumns } from '@data'
import { AppStatus } from '@components/app-status'

//

export const AnalytesView = () => {
  const { analytesData, analytesProgress } = useData();
  const [isPreparingTable, setIsPreparingTable] = useState(true)  // table preparation state

  const [sorting, setSorting] = useState([]);

  const analytesTable = useReactTable({
    data: analytesData.data ?? [],
    columns: analyteColumns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  const AnalyteCount = useCallback(() => (
    <Typography level="body-md" sx={{ whiteSpace: 'nowrap' }}>
      { analytesTable.getCoreRowModel().rows.length } analytes
    </Typography>
  ), [analytesTable.getCoreRowModel().rows.length])

  // once data is available and table is initialized, set `isPreparingTable` to false
  useEffect(() => {
    if (analytesData.isSuccess && analytesTable.getRowModel().rows.length > 0) {
      setIsPreparingTable(false); // data is now processed and table can be rendered
    }
  }, [analytesData.isSuccess, analytesTable.getRowModel().rows.length])

  return (
    <Stack direction="column">
      <Toolbar>
        <AnalyteCount />
        <TableCsvExportButton table={ analytesTable } />
      </Toolbar>

      {
        // has not started or is still going
        analytesData.isPending || analytesData.isLoading
          ? <AppStatus message={ `Loading analytes data :: ${analytesProgress.percent}%` } />
          : isPreparingTable
            ? <AppStatus message="Preparing table" />
            : <DataTable table={ analytesTable } />
      }

      <Toolbar>
        <AnalyteCount />
        <TableCsvExportButton table={ analytesTable } />
      </Toolbar>
    </Stack>
  )
}

