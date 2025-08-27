import { useMemo, useState } from 'react';
import { Button, FormControl, Stack, Typography } from '@mui/joy';
import { analytes } from '@data';
import { PfasSelect } from './pfas-select';
import { NumberInput } from '@components/form';

const mediumTemplate = {
  medium: null,
  concentration: 0,
};

export const MediaConcentrations = () => {
  const [selectedAnalyteId, setSelectedAnalyteId] = useState(analytes[0].id);
  const selectedAnalyte = useMemo(() => {
    if (!selectedAnalyteId) { return ''; }
    return analytes.find(a => a.id === selectedAnalyteId);
  }, [selectedAnalyteId]);

  const [medium1, setMedium1] = useState({ ...mediumTemplate });
  const [medium2, setMedium2] = useState({ ...mediumTemplate });

  return (
    <>
      <Typography level="h2">Media Concentrations</Typography>
      
      <PfasSelect value={ selectedAnalyteId } onChange={ setSelectedAnalyteId } />

      <Stack direction="column" spacing={ 2 }>
        <FormControl orientation="horizontal" size="sm">
          <Button>Average</Button>
          <Typography>0.5</Typography>
        </FormControl>
        <FormControl orientation="horizontal" size="sm">
          <Button>Median</Button>
          <Typography>0.5</Typography>
        </FormControl>
        <FormControl orientation="horizontal" size="sm">
          <Button>0th percentile</Button>
          <Typography>0.5</Typography>
        </FormControl>
        <FormControl orientation="horizontal" size="sm">
          <Button>25th percentile</Button>
          <Typography>0.5</Typography>
        </FormControl>
        <FormControl orientation="horizontal" size="sm">
          <Button>50th percentile</Button>
          <Typography>0.5</Typography>
        </FormControl>
        <FormControl orientation="horizontal" size="sm">
          <Button>75th percentile</Button>
          <Typography>0.5</Typography>
        </FormControl>
        <FormControl orientation="horizontal" size="sm">
          <Button>100th percentile</Button>
          <Typography>0.5</Typography>
        </FormControl>
      </Stack>
      <pre>
        { JSON.stringify({ medium1, medium2 }, null, 2) }
      </pre>
    </>
  );
};
