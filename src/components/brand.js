import { Stack, Typography } from '@mui/joy'

export const Brand = () => {
  return (
    <Stack
      alignItems="flex-start"
      justifyContent="center"
    >
      <Typography
        level="h4"
        component="h1"
        color="primary.text"
        sx={{ fontSize: '22pt', lineHeight: 1 }}
      >OPAL</Typography>
      <Typography
        level="body-xs"
        color="primary.text"
        sx={{ fontSize: '9pt', lineHeight: 1 }}
      >Observational PFAS Access paneL</Typography>
    </Stack>
  )
}
