import { useCallback, useState } from 'react'
import {
  Stack,
  Typography,
} from '@mui/joy'
import { useData } from '@context'
import { Toolbar } from '@components/layout'
import {
  DataTable,
} from '@components/table'
import { TableCsvExportButton } from '@components/csv-export-button'
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { analyteColumns } from '@data'

//

export const AnalytesView = () => {
  const { analytesData } = useData();

  const [sorting, setSorting] = useState([]);

  const analytesTable = useReactTable({
    data: analytesData.data,
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

  return (
    <Stack direction="column">
      <Toolbar>
        <AnalyteCount />
        <TableCsvExportButton table={ analytesTable } />
      </Toolbar>

      <DataTable table={ analytesTable } />

      <Toolbar>
        <AnalyteCount />
        <TableCsvExportButton table={ analytesTable } />
      </Toolbar>
    </Stack>
  )
}

