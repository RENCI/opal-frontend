import { Stack, Typography } from '@mui/joy'

export const Brand = () => {
  return (
    <Stack
      alignItems={{ md: 'flex-end', lg: 'flex-start' }}
      justifyContent="center"
      direction={{ md: 'row', lg: 'column' }}
      gap={{ md: 1, lg: 0 }}
    >
      <Typography
        level="h4"
        component="h1"
        color="primary.text"
        fontSize="22pt"
        sx={{ lineHeight: 1 }}
      >OPAL</Typography>
      <Typography
        level="body-xs"
        color="primary.text"
        sx={{
          fontSize: '9pt',
          lineHeight: 1,
          display: { sm: 'none', md: 'block' },
          maxWidth: { md: '9rem', lg: 'none' }
        }}
      >Observational PFAS Access portaL</Typography>
    </Stack>
  )
}
