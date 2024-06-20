import { Button } from '@mui/joy'
import {
  Login as LoginIcon,
} from '@mui/icons-material'
import { useAuth } from '@context'

export const LoginButton = () => {
  const auth = useAuth()

  return (
    <Button
      variant="soft"
      size="lg"
      onClick={ auth.login }
      startDecorator={ <LoginIcon /> }
    >Login</Button>
  )
}
