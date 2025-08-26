import { Stack, Typography } from '@mui/joy';
import { analytes } from '@data';

export const sampleDetectionSummary = sampleProperties => {
  return (
    <Stack gap={ 1 }>
      {
        analytes.map(({ id, abbreviation }) => (
          <Stack key={ `popup-${ id }` } direction="row" gap={ 2 }>
            <Typography>{ abbreviation }:</Typography>
            <Typography variant="soft" style={{ flex: 1, textAlign: 'right', fontFamily: 'monospace' }}>
              { sampleProperties[`${ id }_concentration`] ?? '---' }
            </Typography>
          </Stack>
        ))
      }
    </Stack>
  );
};