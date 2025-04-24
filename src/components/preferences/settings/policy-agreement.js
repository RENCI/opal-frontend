import * as React from 'react'
import {
  IconButton,
  Stack,
  Typography,
} from '@mui/joy'
import {
  Policy as PolicyIcon,
} from '@mui/icons-material'
import { usePreferences } from '@context'

export const PolicyAgreementSelect = () => {
  const preferences = usePreferences()
  
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={ 2 }
    >
      <PolicyAgreementToggle />
      <div>
        <Typography level="title-md">
          <Typography variant="soft" color="primary">{
            preferences.showPolicyAgreementOnStart.enabled ? 'Show' : 'Hide'
          }</Typography> on Startup
        </Typography>
        <Typography level="body-xs">
          Toggle whether the policy agreement appears when this application starts.
        </Typography>
      </div>
    </Stack>
  )
}

export const PolicyAgreementToggle = () => {
  const preferences = usePreferences()

  const handleClick = () => {
    preferences.showPolicyAgreementOnStart.toggle()
  }

  return (
    <IconButton
      id="show-policy-agreement"
      size="lg"
      onClick={ handleClick }
      variant="outlined"
    >
      <PolicyIcon
        color={ preferences.showPolicyAgreementOnStart.enabled ? 'primary' : 'neutral' }
      />
    </IconButton>
  )
}