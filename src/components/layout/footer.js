import {
  Divider,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy'
import { usePreferences } from '@context'
import { Link } from '@components/link'
import ieLogo from '@images/ie-logo.png'
import renciLogo from '@images/renci-logo.png'
import renciLogoDark from '@images/renci-logo-dark.png'
import silsLogo from '@images/sils-logo.png'

//

export const Footer = () => {
  const { colorMode } = usePreferences()

  return (
    <Sheet
      variant="soft"
      component="footer"
      gap={ 2 }
      sx={{
        p: 2,
        borderTop: '1px solid var(--joy-palette-divider)',
        '.logo-list': {
          maxWidth: '800px',
          mx: 'auto',
          pb: 2,
        },
        '.copyright': {
          maxWidth: '800px',
          mx: 'auto',
        },
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        gap={ 2 }
        className="logo-list"
        justifyContent={{ xs: 'center', md: 'space-between' }}
        alignItems={{ xs: 'center', md: 'flex-end' }}
      >
        <Link to="https://renci.org/"><img
          src={ colorMode.light ? renciLogo : renciLogoDark }
          height="35px"
        /></Link>
        <Link to="https://ie.unc.edu/"><img
          src={ ieLogo }
          height="28px"
        /></Link>
        <Link to="https://sils.unc.edu/"><img
          src={ silsLogo }
          height="28px"
        /></Link>
      </Stack>

      <Divider />

      <Stack
        justifyContent="center"
        alignItems="center"
        className="copyright"
        gap={ 2 }
        p={ 2 } pb={ 0 }
      >
        <Typography level="body-sm" textAlign="center">
          OPAL is a joint creation of
          {' '}<Link to="https://renci.org">Renaissance Computing Insititute</Link> (RENCI),
          {' '}<Link to="https://ie.unc.edu/">Institute for the Environment</Link>, and
          {' '}<Link to="https://sils.unc.edu/">School of Information and Library Sciences</Link> (SILS)
          at the University of North Carolina at Chapel Hill.
          This prototype application was developed with guidance and funding from the United States
          Environmental Protection Agency (award #OTXXXXXXXX).
        </Typography>
        <Typography level="body-xs" textAlign="center">
          &copy; { new Date().getFullYear() }
        </Typography>
      </Stack>
    </Sheet>
  )
}
