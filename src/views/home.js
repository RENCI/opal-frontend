import { ContentPage } from '@components/layout'
import {
  Box,
  Stack,
  Typography,
} from '@mui/joy'
import {
  ViewList as TableIcon,
} from '@mui/icons-material'
import { PolicyCard } from '@components/policy-card'
import { ViewCard } from '@components/view-card';

const dataViews = [
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

export const HomeView = () => {
  return (
    <ContentPage maxWidth="lg">

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={ 4 }
        sx={{
          borderLeft: '1.5px solid var(--joy-palette-divider)',
          borderBottom: '1.5px solid var(--joy-palette-divider)',
          borderTopLeftRadius: '2rem',
        }}
      >
        <Box sx={{ flex: 3 }} pl={ 3 }>
          <Typography level="h1" sx={{ fontSize: '400%' }}>OPAL</Typography>
          <Typography level="h2" sx={{ fontWeight: '200' }}>Observational PFAS Access portaL</Typography>
        </Box>
        <Box sx={{ flex: 2 }}>
          <PolicyCard />
        </Box>
      </Stack>

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
          dataViews.map(cardData => <ViewCard key={ `card-${ cardData.path }` } { ...cardData } />)
        }
      </Stack>
    
    </ContentPage>
  )
}
