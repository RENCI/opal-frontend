import { Fragment, useCallback, useState } from 'react'
import {
  Button,
  Modal,
  ModalClose,
} from '@mui/joy'
import {
  MenuBook as BrowseIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material'
import { Toolbar } from '@components/layout'
import { usePfas } from '@views/pfas'
import {
  ColumnSelect,
  DataTable,
  Pagination,
} from '@components/table'
import { TableCsvExportButton } from '@components/buttons'
import { SampleBrowser } from '@components/browse'
import { ClearFiltersButton } from '@components/filter'

//

export const TableView = () => {
  const { table, columnFilters } = usePfas()
  const [filtersVisibility, setFiltersVisibility] = useState(false)

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

  return (
    <Fragment>      
      <Toolbar>
        <Pagination table={ table } />
        <ColumnSelect table={ table } />
        <FilterControls />
        <TableCsvExportButton table={ table } />
        <TableBrowser />
      </Toolbar>

      <div style={{
        maxWidth: 'calc(100vw - 2rem)',
        position: 'relative',
        overflowX: 'scroll',
        borderRight: '1px solid #333',
      }}>
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
        
      </div>

      <Toolbar>
        <Pagination table={ table } />
      </Toolbar>
    </Fragment>
  )
}

const TableBrowser = () => {
  const { table } = usePfas()
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
