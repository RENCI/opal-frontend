import { Box, Stack, Typography } from '@mui/joy';
import { analytes } from '@data';

export const sampleDetectionSummary = sampleProperties => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
      {
        analytes.map(({ id, abbreviation }) => (
          <Box key={ `popup-${ id }` } sx={{ gridColumn: 'span 6' }}>
            <Stack direction="row" gap={ 2 }>
              <Typography>{ abbreviation }:</Typography>
              <Typography variant="soft" style={{ flex: 1, textAlign: 'right', fontFamily: 'monospace' }}>
                { sampleProperties[`${ id }_concentration`] ?? '---' }
              </Typography>
            </Stack>
          </Box>
        ))
      }
    </Box>    
  );
};