import { Stack, Typography } from '@mui/joy'

export const Brand = () => {
  return (
    <Stack
      direction={{ md: 'column', lg: 'row' }}
      alignItems={{ md: 'flex-start', lg: 'flex-end' }}
      justifyContent="flex-start"
      gap={{ md: 0, lg: 1 }}
      sx={{
        width: '100%',
        containerType: 'inline-size',
        containerName: 'brand-container',
        '.MuiTypography-root': {
          '@container brand-container (max-width: 250px)': {
            '.primary': { display: 'block' },
            '.secondary': { display: 'none' },
          },
        },
      }}
    >
      <Typography
        level="h4"
        component="h1"
        color="primary.text"
        fontSize="22pt"
        sx={{
          lineHeight: 1,
        }}
      ><span className="primary">OPAL</span></Typography>
      <Typography
        level="body-xs"
        color="primary.text"
        sx={{
          fontSize: '9pt',
          lineHeight: 1,
        }}
      ><span className="secondary">Observational PFAS Access portaL</span></Typography>
    </Stack>
  )
}
