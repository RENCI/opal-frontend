import PropTypes from 'prop-types'
import { Divider, Sheet, Stack } from '@mui/joy'
import { Brand } from '@components/brand'
import { Link } from '@components/link'

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
        zIndex: 999,
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
          component={ Link }
          to="/"
          alignItems="flex-start"
          justifyContent="center"
          sx={{
            flex: 2,
            marginLeft: '1rem',
            textDecoration: 'none',
            color: 'var(--joy-palette-text-secondary)',
            textShadow: '0 0 1px var(--joy-palette-neutral-500), 0 0 5px var(--joy-palette-primary-300)',
          }}
        ><Brand /></Stack>

        <Stack
          direction="row"
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
