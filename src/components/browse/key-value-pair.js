import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/joy'

export const KeyValuePair = ({ property, startDecorator = null, value }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={ 1 }
    >
      { startDecorator }
      <Typography level="body-sm">
        { property ?? '...' }:
      </Typography>
      <Typography
        level="body-sm"
        variant="soft"
        sx={{ fontFamily: 'monospace' }}
      >
        { value ? value : value === 0 ? 0 : 'NULL' }
      </Typography>
    </Stack>
  )
}

KeyValuePair.propTypes = {
  property: PropTypes.string.isRequired,
  startDecorator: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.number,
    PropTypes.string,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

