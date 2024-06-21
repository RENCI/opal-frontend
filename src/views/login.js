import { Card, CardContent, Divider, Stack, Typography } from '@mui/joy'
import { Warning as WarningIcon } from '@mui/icons-material'
import { ContentPage } from '@components/layout'
import { LoginButton } from '@components/auth'
import { useAuth } from '@context'
import { Brand } from '@components/brand'

export const LoginView = () => {
  const auth = useAuth()

  return (
    <ContentPage
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 2,
        width: '100%',
        pt: 3,
      }}
    >
      <Brand />
      
      <Card color="warning" variant="soft" sx={{ mt: 1, mx: 'auto' }}>
        <Stack direction="row" justifyContent="center" alignItems="center" gap={ 2 }>
          <WarningIcon color="warning" fontSize="large" />
          <Typography level="title-lg" color="warning">Authentication Required</Typography>
        </Stack>
            
        <Divider />

        <Stack
          component={ CardContent }
          direction="column"
          gap={ 4 }
          sx={{ py: 2, px: 3 }}
        >
          <Typography level="body-lg">
            <em>Access to OPAL is restricted!</em>
            <br />
            <br />
            Please use the button below to identify yourself and gain access.
          </Typography>

          <Typography level="body-xs" fontStyle="italic">
            Note: you will be temprarily redirected to <em>renci.auth0.com</em>.
          </Typography>
        </Stack>

        <CardContent>
          <LoginButton />
        </CardContent>
      </Card>

      {
        auth.user && !auth.user.email_verified && (
          <Card color="netural">
            <CardContent>
              <Typography level="body-sm" fontStyle="italic">
                If you have already have an account, you may need to verify your email.
              </Typography>
            </CardContent>
          </Card>
        )
      }

    </ContentPage>
  )
}
