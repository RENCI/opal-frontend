import { Fragment, useCallback, useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalClose,
  Typography,
} from '@mui/joy'
import {
  MenuBook as BrowseIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material'
import { Toolbar } from '@components/layout'
import { useData } from '@context'
import {
  ColumnSelect,
  DataTable,
  Pagination,
} from '@components/table'
import { TableCsvExportButton } from '@components/buttons'
import { SampleBrowser } from '@components/browse'
import { ClearFiltersButton } from '@components/filter'
import { AppStatus } from '@components/app-status'

//

export const TableView = () => {
  const { pfasData, podmTable } = useData()
  const [filtersVisibility, setFiltersVisibility] = useState(false)
  const { table, columnFilters } = podmTable
  const [isPreparingTable, setIsPreparingTable] = useState(true)  // table preparation state

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

  // once data is available and table is initialized, set `isPreparingTable` to false
  useEffect(() => {
    if (pfasData.isSuccess && table.getRowModel().rows.length > 0) {
      setIsPreparingTable(false); // data is now processed and table can be rendered
    }
  }, [pfasData.isSuccess, table.getRowModel().rows.length])

  return (
    <Fragment>      
      <Toolbar>
        <SampleCount />
        <Pagination table={ table } />
        <ColumnSelect table={ table } />
        <FilterControls />
        <TableCsvExportButton table={ table } />
        <TableBrowser />
      </Toolbar>

      {
        isPreparingTable
          ? <AppStatus message="Preparing table" />
          : <DataTable
              table={ table }
              sx={{
                '.filter': {
                  maxHeight: filtersVisibility ? '48px' : 0,
                  overflow: 'hidden',
                  transition: 'max-height 250ms',
                },
              }}
            />
      }

      <Toolbar>
        <SampleCount />
        <Pagination table={ table } />
      </Toolbar>
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
