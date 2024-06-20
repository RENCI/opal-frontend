import * as React from 'react'
import {
  IconButton,
  Stack,
  Typography,
} from '@mui/joy'
import {
  Inventory as CacheIcon,
} from '@mui/icons-material'
import { usePreferences } from '@context'

export const CacheSelect = () => {
  const preferences = usePreferences()
  
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={ 2 }
    >
      <CacheToggle />
      <div>
        <Typography level="title-md">
          Cache <Typography variant="soft" color="primary">{
            preferences.cache.enabled ? 'Enabled' : 'Disabled'
          }</Typography>
        </Typography>
        <Typography level="body-xs">
          Enabling cache saves time and enhances your experience
          by saving data in your browser&apos;s local storage.
        </Typography>
      </div>
    </Stack>
  )
}

export const CacheToggle = () => {
  const preferences = usePreferences()

  const handleClick = () => {
    preferences.cache.toggle()
  }

  return (
    <IconButton
      id="cache-mode"
      size="lg"
      onClick={ handleClick }
      variant="outlined"
    >
      <CacheIcon
        color={ preferences.cache.enabled ? 'primary' : 'neutral' }
      />
    </IconButton>
  )
}