import { ContentPage } from '@components/layout'
import { Link } from '@components/link'
import {
  Card,
  CardContent,
  Link as JoyLink,
  Stack,
  Typography,
} from '@mui/joy'

export const HomeView = () => {
  return (
    <ContentPage>
      <strong>agree to this:</strong>
      <p>Id quis irure voluptate in non do aliquip consequat aliquip sint ut ut qui.</p>

      <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }} sx={{
        width: '100%',
        '& > .MuiCard-root': { flex: 1 },
      }}>
        <Card variant="soft">
          <CardContent>
            <JoyLink overlay component={ Link } to="/pfas">PFAS</JoyLink>
          </CardContent>
        </Card>

        <Card variant="soft">
          <CardContent>
            <JoyLink overlay component={ Link } to="/non-targeted">Non-Targeted</JoyLink>
            <Typography>Description of the card.</Typography>
          </CardContent>
        </Card>

        <Card variant="soft">
          <CardContent>
            <JoyLink overlay component={ Link } to="/analytes">Analytes</JoyLink>
            <Typography>Description of the card.</Typography>
          </CardContent>
        </Card>
      </Stack>
    </ContentPage>
  )
}
