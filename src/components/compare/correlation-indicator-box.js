import { Box } from '@mui/joy'
import PropTypes from 'prop-types'

export const IndicatorBox = ({ alpha, size }) => (
  <Box
    sx={{
      border: '1px solid var(--joy-palette-primary-main)',
      background: `rgb(var(--joy-palette-primary-mainChannel) / ${ alpha })`,
      height: `calc(100% * ${ size })`,
      width: `calc(100% * ${ size })`,
    }}
  />
)

IndicatorBox.propTypes = {
  alpha: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
}

