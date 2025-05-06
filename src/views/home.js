import PropTypes from 'prop-types'
import { ContentPage } from '@components/layout'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/joy'
import {
  ViewList as TableIcon,
  ArrowForward as LinkIcon,
} from '@mui/icons-material'
import { Markdown } from '@components/markdown'
import { Link } from '@components/link'

const homeViewCards = [
  {
    path: '/pfas',
    icon: <TableIcon color="default" />,
    title: 'Targeted Primary Data',
    description:
`**Explore 16 commonly studied PFAS analytes
([Wallis et al. 2024](https://www.sciencedirect.com/science/article/pii/S0160412024007438)),
quantified using targeted chemical analysis methods
across more than 45,000 samples collected in 37 U.S. states.**
Visualize and filter PFAS measurements by location, media type
(e.g., water, dust, blood), collection date, and analyte.
Uncover exposure patterns through interactive tables and charts.`,
  },
  {
    path: '/pfas2',
    icon: <TableIcon color="default" />,
    title: 'Targeted Secondary Data',
    description:
`**Explore additional PFAS analytes, quantified using targeted
chemical analysis methods, in samples from public water systems
and tapwater across the U.S.** Search and filter by location,
collection details, and analyte.`,
  },
  {
    path: '/non-targeted',
    icon: <TableIcon color="default" />,
    title: 'Non-Targeted Data',
    description:
`**Browse compounds detected through non-targeted analysis
techniques across multiple studies.** Each record links a compound
to a sample, helping to explore novel or unexpected PFAS exposures
revealed through detection-first workflows.`,
  },
  {
    path: '/analytes',
    icon: <TableIcon color="default" />,
    title: 'Analytes Index',
    description:
`**Explore a complete index of PFAS analytes represented
in the dataset.** Review identifiers, names, and additional
metadata for each compound, with links to detailed profiles
in the CompTox Chemical Dashboard.`,
  },
]

const shimmerHoverStyle = {
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  '&::before': {
    zIndex: -1,
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    width: 'calc(100% + 1rem)',
    height: '100%',
    backgroundColor: 'var(--joy-palette-primary-300)',
    filter: 'opacity(0.2)',
    transform: 'translate(calc(100% - 2rem))',
    clipPath: 'polygon(1rem 0, 100% 0, 100% 100%, 0 100%)',
    transition: 'transform 300ms, filter 350ms 100ms',
  },
  '&:hover': {
    color: 'var(--joy-palette-text-primary)',
  },
  '&:hover::before': {
    filter: 'opacity(0.0)',
    transform: ' translate(-1rem)',
    transition: 'transform 300ms, filter 350ms 200ms',
  }
};

const animateButtonContentsStyle = {
  perspective: '100px',
  '.text': { fontSize: '150%', transform: 'translate3d(0, 0, -10px)', transition: 'transform 300ms' },
  '.icon': { transform: 'translate3d(0, 0, -10px)', transition: 'transform 200ms' },
  '&:hover .icon': { transform: 'translate3d(6px, 0, 0)', transition: 'transform 500ms ease-out' },
  '&:hover .text': { transform: 'translate3d(-2px, 0, 0)', transition: 'transform 250ms ease-out' },
};

const ViewCard = ({ title, description, icon, path }) => {
  return (
    <Card variant="outlined" sx={{ p: 1 }}>
      <CardContent component={ Stack } direction="column">
        <Stack sx={{
          padding: '2rem',
          flex: '0 0 40px',
        }}>
          <Typography level="h3" startDecorator={ icon } sx={{ fontWeight: '300' }}>
            { title }
          </Typography>
        </Stack>
        <Divider />
        <Box sx={{ padding: '1rem 1rem 0 1rem', flex: 1 }}>
          <Markdown>{ description }</Markdown>
        </Box>
      </CardContent>
      
      <CardActions>
        <Button
          variant="soft"
          component={ Link }
          to={ path }
          sx={{
            ...shimmerHoverStyle,
            ...animateButtonContentsStyle,
            padding: '1rem 0',
          }}
          endDecorator={ <LinkIcon className="icon" /> }
        ><span className="text">View</span></Button>
      </CardActions>
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
              xs: '1 0 350px',
              md: '1 0 400px',
            },
          }
        }}
      >
        {
          homeViewCards.map(({ path, icon, title, description }) => (
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
