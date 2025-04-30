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
import { Markdown } from '@components/markdown'

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
          <Markdown>{ description }</Markdown>
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

const viewCards = [
  {
    path: '/pfas',
    icon: <TableIcon />,
    title: 'Targeted Primary Data',
    description:
      `**Explore over 45,000 environmental and biological samples ` +
      `collected across 37 U.S. states.** Visualize and filter PFAS ` +
      `measurements by location, media type (e.g., water, dust, blood), ` +
      `collection date, and analyte. Uncover exposure patterns through ` +
      `interactive tables and charts.`,
  },
  {
    path: '/pfas2',
    icon: <TableIcon />,
    title: 'Targeted Secondary Data',
    description:
      `**View PFAS measurements from the UCMR5 study, covering public ` +
      `water systems across the U.S.** Search and filter this high-profile ` +
      `dataset by location, collection details, and analyte. While similar ` +
      `to primary data, unit differences and standardized sampling make ` +
      `this dataset distinct.`,
  },
  {
    path: '/non-targeted',
    icon: <TableIcon />,
    title: 'Non-Targeted Data',
    description:
      `**Browse compounds detected through non-targeted analysis ` +
      `techniques across multiple studies.** Each record links a compound ` +
      `to a sample, helping to explore novel or unexpected PFAS exposures ` +
      `revealed through detection-first workflows.`,
  },
  {
    path: '/analytes',
    icon: <TableIcon />,
    title: 'Analytes Index',
    description:
      `**Explore a complete index of PFAS analytes represented ` +
      `in the dataset.** Review identifiers, names, and additional ` +
      `metadata for each compound, with links to detailed profiles ` +
      `in the CompTox Chemical Dashboard.`,
  },
]

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

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={ 4 }
        useFlexGap
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          '& > .MuiCard-root': { flex: 1 },
          '.MuiLink-root:hover': {
            textDecoration: 'none',
          },
          '.MuiCard-root': {
            minHeight: '250px',
            flex: {
              xs: '1 0 250px',
              md: '1 0 400px',
            },
          }
        }}
      >
        {
          viewCards.map(({ path, icon, title, description }) => (
            <ViewCard
              key={ `card-${ path }` }
              path={ path }
              icon={ icon }
              title={ title }
              description={ description }
            />
          ))
        }
      </Stack>
    
    </ContentPage>
  )
}
