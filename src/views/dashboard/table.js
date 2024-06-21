import { Fragment, useCallback, useState } from 'react'
import {
  Button,
  CircularProgress,
  Divider,
  Modal,
  ModalClose,
  Stack,
  Typography,
} from '@mui/joy'
import {
  MenuBook as BrowseIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material'
import { useData } from '@context'
import {
  ColumnSelect,
  DataTable,
  Pagination,
} from '@components/table'
import { TableCsvExportButton } from '@components/csv-export-button'
import { SampleBrowser } from '@components/browse'
import {
  ClearFiltersButton,
} from '@components/filter'

export const TableView = () => {
  const { pfasData, podmTable } = useData()
  const [filtersVisibility, setFiltersVisibility] = useState(false)
  const { table, columnFilters } = podmTable

  const handleToggleFiltersVisibility = () => setFiltersVisibility(!filtersVisibility)

  const FilterControls = useCallback(() => [
    <Button
      key="visibility-toggle"
      variant={ filtersVisibility ? 'soft' : 'outlined' }
      color="neutral"
      size="sm"
      onClick={ handleToggleFiltersVisibility }
      startDecorator={ <FilterIcon fontSize="sm" /> }
      sx={{ whiteSpace: 'nowrap' }}
    >{ filtersVisibility ? 'Hide' : 'Show' } Filters</Button>,
    <ClearFiltersButton key="clear-selections" />,
  ], [columnFilters, filtersVisibility])

  const SampleCount = useCallback(() => (
    <Typography level="body-md" sx={{ whiteSpace: 'nowrap' }}>
      { table.getPrePaginationRowModel().rows.length } samples
    </Typography>
  ), [table.getPrePaginationRowModel().rows.length])

  if (pfasData.isLoading) {
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
    <Fragment>      
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
        <SampleCount />
        <Pagination table={ table } />
        <ColumnSelect table={ table } />
        <FilterControls />
        <TableCsvExportButton table={ table } />
        <TableBrowser />
      </Stack>

      <DataTable
        table={ table }
        sx={{
          '.filter': {
            maxHeight: filtersVisibility ? '48px' : 0,
            overflow: 'hidden',
            transition: 'max-height 250ms',
          },
        }}
      />

      <Stack
        direction="row"
        py={ 2 }
        gap={ 2 }
        divider={ <Divider orientation="vertical" /> }
      >
        <SampleCount />
        <Pagination table={ table } />
      </Stack>
    </Fragment>
  )
}

const TableBrowser = () => {
  const { podmTable: { table } } = useData()
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        onClick={ () => setOpen(true) }
        startDecorator={ <BrowseIcon />}
      >Browse</Button>
      <Modal
        open={ open }
        onClose={ () => setOpen(false) }
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Fragment>
          <ModalClose variant="solid" />
          <SampleBrowser data={ table.getPaginationRowModel().rows } />
        </Fragment>
      </Modal>
    </Fragment>
  )
}
