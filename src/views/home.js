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
    <Card variant="outlined" sx={{ padding: 0 }}>
      <CardContent component={ Stack } direction="column" sx={{
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
        '&::before': {
          zIndex: -1,
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: 'calc(100% + 2rem)',
          height: '100%',
          backgroundColor: 'var(--joy-palette-primary-200)',
          filter: 'opacity(0.1)',
          transform: 'translate(calc(100% - 3rem))',
          clipPath: 'polygon(2rem 0, 100% 0, 100% 100%, 0 100%)',
          transition: 'transform 150ms 100ms, filter 250ms',
        },
        '&:hover::before': {
          filter: 'opacity(0.2)',
          transform: ' translate(-2rem)',
          transition: 'transform 150ms, filter 350ms',
        }
      }}>
        <Stack sx={{
          padding: '2rem',
          flex: '0 0 40px',
        }}>
          <Typography level="h3" startDecorator={ icon } sx={{ fontWeight: '300' }}>
            <JoyLink overlay component={ Link } to={ path }>{ title }</JoyLink>
          </Typography>
        </Stack>
        <Divider />
        <Box sx={{ padding: '1rem', flex: 1 }}>
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
      <Box sx={{ textAlign: 'center' }}>
        <Typography level="h1">OPAL</Typography>
        <Typography level="h2" sx={{ fontWeight: '200' }}>Observational PFAS Access portaL</Typography>
      </Box>
      
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
            Browse analytes detected across studies. View records by compound to
            discover non-targeted exposure identified samples.
          ` }
        />

        <ViewCard
          path="/analytes"
          icon={ <TableIcon /> }
          title="Analytes Index"
          description={ `
            Explore the full list of analytes, each with a few details and a link
            to their page in the CompTox Chemical Dashboard.
          ` }
        />
      </Stack>
    
    </ContentPage>
  )
}
