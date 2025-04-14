import PropTypes from 'prop-types'
import { ContentPage } from '@components/layout'
import { Link } from '@components/link'
import {
  Box,
  Card,
  CardContent,
  Divider,
  Link as JoyLink,
  Stack,
  Typography,
} from '@mui/joy'
import {
  TableChart as TableIcon,
} from '@mui/icons-material'

const ViewCard = ({ title, description, icon, path }) => {
  return (
    <Card variant="soft" sx={{ padding: 0 }}>
      <CardContent>
        <Stack sx={{ padding: '1rem', flex: '0 0 40px' }}>
          <Typography level="h3" startDecorator={ icon } sx={{ fontWeight: '300' }}>
            <JoyLink overlay component={ Link } to={ path }>{ title }</JoyLink>
          </Typography>
        </Stack>
        <Divider />
        <Box sx={{ padding: '1rem' }}>
          <Typography>{ description }</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

ViewCard.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

export const HomeView = () => {
  return (
    <ContentPage maxWidth="lg">
      <Typography level="h1">OPAL</Typography>
      <Typography level="h2" sx={{ fontWeight: '200' }}>Observational PFAS Access portaL</Typography>
      
      <br />
      <Divider />
      <br />

      <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }} sx={{
        width: '100%',
        '& > .MuiCard-root': { flex: 1 },
        '.MuiLink-root:hover': {
          textDecoration: 'none',
        }
      }}>
        <ViewCard
          path="/pfas"
          icon={ <TableIcon /> }
          title="PFAS Sample Data"
          description={ `
            Explore over 45,000 environmental and biological samples collected across 37 states
            in tabular and visual formats.
            Filter by location, media type (water, dust, blood), collection date, and collection
            details for specific analytes to uncover patterns in PFAS exposure.
          ` }
        />

        <ViewCard
          path="/non-targeted"
          icon={ <TableIcon /> }
          title="Non-Targeted Data"
          description={ `
            Browse unexpected analytes detected across studies. View findings grouped by each
            compound to discover non-targeted exposure identified in water, dust, and biological samples.
          ` }
        />

        <ViewCard
          path="/analytes"
          icon={ <TableIcon /> }
          title="Analytes Overview"
          description={ `
            Explore the full list of PFAS analytes.
          ` }
        />
      </Stack>
    </ContentPage>
  )
}
