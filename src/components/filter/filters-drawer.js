import PropTypes from 'prop-types'
import { Box, Sheet, DialogTitle, Divider } from '@mui/joy'
import { ColumnFilters, ClearFiltersButton } from '@components/filter'

export const FiltersDrawer = ({ open, onClose }) => {
  return (
    <Sheet
      variant="soft"
      sx={{
        pt: '3rem',
        zIndex: 9,
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        borderRight: '1px solid #999',
        width: '360px',
        transform: open ?
          'translate3d(0, 0, 0)' :
          'translate3d(-400px, 0, 0)',
        transition: 'transform 250ms ease-out',
        boxShadow: 'none',
        overflow: 'auto',
      }}
      open={ open }
      onClose={ onClose }
    >
      <Box sx={{ position: 'relative' }}>
        <DialogTitle sx={{ p: 2 }}>Filters</DialogTitle>

        <ClearFiltersButton
          sx={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
          }}
        />
      </Box>
      
      <Divider />

      <ColumnFilters />
    </Sheet>
  )
}

FiltersDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
