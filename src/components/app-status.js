import PropTypes from 'prop-types'
import {
  Box,
  CircularProgress,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy'
import {
  ErrorOutline as ErrorIcon
} from '@mui/icons-material'

const CONNECTION_STATE_ICONS = {
  busy: <CircularProgress size="sm" />,
  error: <ErrorIcon color="error" />
}

export const AppStatus = ({
  message = '',
  status = 'busy',
}) => {
  return (
    <Sheet
      component={ Stack }
      variant="solid"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'absolute',
        left: 0, right: 0,
        top: 0, bottom: 0,
        backgroundColor: 'color-mix(in srgb, var(--joy-palette-background-surface) 20%, transparent)',
        backdropFilter: 'blur(4px)',
        zIndex: 99,
        '.MuiTypography-root': {
          p: 2,
        },
      }}
    >
      <Typography
        level="body-xl"
        variant="soft"
        startDecorator={ <Box sx={{ mr: '0.5rem'}}>{CONNECTION_STATE_ICONS[status]}</Box> }
      >{ message }</Typography>
    </Sheet>
  )
}

AppStatus.propTypes = {
  message: PropTypes.string,
  status: PropTypes.oneOf(Object.keys(CONNECTION_STATE_ICONS)),
}
