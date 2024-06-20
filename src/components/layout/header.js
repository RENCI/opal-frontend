import PropTypes from 'prop-types'
import { Divider, Stack, Sheet, Typography } from '@mui/joy'

//

export const DashboardHeader = ({ endActions = [], startAction = null }) => {
  return (
    <Sheet
      variant="soft"
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 99,
        borderBottom: '1px solid #999',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        gap={ 2 }
      >
        { startAction }
        <Typography
          level="h4"
          component="h1"
          color="primary.text"
          sx={{ alignSelf: 'center' }}
        >PFAS Dashboard</Typography>
        <Stack
          direction="row"
          gap={ 1 }
          divider={ <Divider orientation="vertical" />}
        >{ endActions }</Stack>
      </Stack>
    </Sheet>
  )
}

DashboardHeader.propTypes = {
  startAction: PropTypes.node,
  endActions: PropTypes.arrayOf(PropTypes.node),
}
