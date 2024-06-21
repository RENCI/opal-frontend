import { useCallback, useState } from 'react'
import {
  Divider,
  Stack,
  Typography,
} from '@mui/joy'
import { useData } from '@context'
import {
  DataTable,
  ExportButton,
} from '@components/table'
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { analyteColumns } from '@data'

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
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={ 2 }
        divider={ <Divider orientation="vertical" /> }
        sx={{
          position: 'sticky',
          left: 0,
          mb: 2,
          display: 'inline-flex'
        }}
      >
        <AnalyteCount />
        <ExportButton table={ analytesTable } />
      </Stack>

      <DataTable table={ analytesTable } />
    </Stack>
  )
}

