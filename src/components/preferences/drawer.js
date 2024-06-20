import { Fragment } from 'react'
import {
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  ModalClose,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy'
import {
  Tune as MenuIcon,
} from '@mui/icons-material'
import { usePreferences } from '@context'
import {
  CacheSelect,
  ColorModeSelect,
} from './settings'

export const PreferencesDrawer = () => {
  const preferences = usePreferences()

  return (
    <Drawer
      anchor="right"
      size="md"
      open={ preferences.visibility }
      onClose={ preferences.hide }
      slotProps={{
        content: {
          sx: {
            bgcolor: 'transparent',
            p: { lg: 4, md: 2, sm: 1, xs: 0 },
            boxShadow: 'none',
          },
        },
      }}
    >
      <Sheet sx={{
        borderRadius: { xs: 0, sm: 'md' },
        p: 2,
        height: '100%',
        overflow: 'auto',
      }}>
        <Stack
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          gap={ 2 }
        >
          <ModalClose size="lg" />

          <DialogTitle>Preferences</DialogTitle>

          <Divider />

          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography level="title-md">Look & Feel</Typography>
            
            <ColorModeSelect />
          </DialogContent>

          <Divider />

          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography level="title-md">Behavior</Typography>

            <CacheSelect />
          </DialogContent>
          <Divider />
          
        </Stack>
      </Sheet>
    </Drawer>
  )
}

export const PreferencesToggle = () => {
  const { preferences } = usePreferences()

  return (
    <IconButton
      size="lg"
      color="neutral"
      onClick={ preferences.toggle }
    >
      <MenuIcon />
    </IconButton>
  )
}


// all-in-one button and drawer.
// use this for an ever-present toggle button.
export const Preferences = () => {
  return (
    <Fragment>
      <PreferencesToggle />
      <PreferencesDrawer />
    </Fragment>
  )
}
