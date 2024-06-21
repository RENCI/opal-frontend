import PropTypes from 'prop-types'
import {
  Divider,
  Stack,
} from '@mui/joy'

//

export const Toolbar = ({ children }) => {
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      gap={ 2 }
      divider={ <Divider orientation="vertical" /> }
      sx={{
        position: 'sticky',
        left: 0,
        my: 2,
        display: 'inline-flex',
      }}
    >
      { children }
    </Stack>
  )
}

Toolbar.propTypes = {
  children: PropTypes.node,
}
