import { Badge, Button } from '@mui/joy'
import PropTypes from 'prop-types'
import {
  MenuOpen as DrawerIcon,
} from '@mui/icons-material'
import { useData } from '@context'

export const FiltersDrawerToggle = ({ active = false, onClick }) => {
  const { filterCount } = useData()
  
  return (
    <Button
      size="lg"
      variant="soft"
      color="primary"
      onClick={ onClick }
      sx={{ borderRight: '1px solid var(--joy-palette-divider)' }}
      startDecorator={
        <DrawerIcon
          fontSize="lg"
          sx={{
            transform: active ? 'scale(1, 1)' : 'scale(-1, 1)',
            transition: 'transform 150ms',
          }}
        />
      }
    >
      <Badge
        badgeContent={ filterCount }
        size="sm"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >Filters</Badge>
    </Button>
  )
}

FiltersDrawerToggle.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}
