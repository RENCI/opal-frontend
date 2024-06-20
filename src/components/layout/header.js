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
        borderBottom: '1px solid var(--joy-palette-divider)',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        gap={ 2 }
      >
        { startAction }
        <Stack
          alignItems="flex-start"
          justifyContent="center"
          sx={{ flex: 1 }}
        >
          <Typography
            level="h4"
            component="h1"
            color="primary.text"
            sx={{ fontSize: '22pt', lineHeight: 1 }}
          >OPAL</Typography>
          <Typography
            level="body-xs"
            color="primary.text"
            sx={{ fontSize: '9pt', lineHeight: 1 }}
          >Observational PFAS Access paneL</Typography>
        </Stack>
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
