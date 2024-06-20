import { useMemo } from 'react'
import {
  Avatar,
  Dropdown,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  ListItemContent,
  Stack,
  Typography,
} from '@mui/joy'
import {
  Logout as LogoutIcon,
  Tune as PreferencesIcon,
} from '@mui/icons-material'
import { usePreferences, useAuth } from '@context'
import { LoginButton } from './login-button'

//

export const AuthMenu = () => {
  const auth = useAuth()
  const preferences = usePreferences()

  const handleClickLogout = () => {
    auth.logout()
  }

  const handleClickPreferences = () => {
    preferences.show()
  }

  const initials = useMemo(() => {
    try {
      if (auth.isAuthenticated) {
        return auth.user.given_name[0] + auth.user.family_name[0]
      }
    } catch (error) {
      return '?'
    }
  }, [auth.isAuthenticated])

  if (!auth.isAuthenticated) {
    return <LoginButton />
  }

  return (
    <Dropdown>
      <MenuButton
        variant="solid"
        color="primary"
        slots={{ root: IconButton }}
        slotProps={{ root: { size: 'sm', color: 'primary', sx: { p: 1 } } }}
        sx={{ borderRadius: '18px' }}
      ><Avatar variant="soft" color="primary" size="sm">{ initials }</Avatar></MenuButton>

      <Menu placement="bottom-end" sx={{ width: '250px' }}>
        <Stack flexDirection="row" justifyContent="center" alignItems="center" p={ 2 } gap={ 2 }>
          <Avatar>{ initials }</Avatar>
          <ListItemContent>
            <Typography level="body-sm">Logged in as</Typography>
            <Typography level="body-md">{ auth.user.name }</Typography>
          </ListItemContent>
        </Stack>

        <ListDivider />

        <MenuItem onClick={ handleClickPreferences }>
          <ListItemDecorator>
            <PreferencesIcon />
          </ListItemDecorator>
          <ListItemContent>
            Preferences
          </ListItemContent>
        </MenuItem>
        
        <ListDivider />

        <MenuItem onClick={ handleClickLogout }>
          <ListItemDecorator>
            <LogoutIcon />
          </ListItemDecorator>
          <ListItemContent>
            Logout
          </ListItemContent>
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
