import { Button } from '@mui/joy'
import PropTypes from 'prop-types'
import {
  Close as ClearFiltersIcon,
} from '@mui/icons-material'
import { usePfas } from '@views/pfas'

export const ClearFiltersButton = ({ sx = {}, ...props }) => {
  const { table } = usePfas()

  if (!table) {
    return '...'
  }

  const noActiveFilters = !table.getAllLeafColumns().some(col => col.getIsFiltered() )

  return (
    <Button
      key="clear-selections"
      variant="outlined"
      size="sm"
      color="neutral"
      onClick={ () => table.resetColumnFilters() }
      startDecorator={ <ClearFiltersIcon fontSize="sm" /> }
      { ...props }
      sx={{ whiteSpace: 'nowrap', ...sx }}
      disabled={ noActiveFilters }
    >Clear Filters</Button>
  )
}

ClearFiltersButton.propTypes = {
  sx: PropTypes.object,
}
