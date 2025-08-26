import PropTypes from 'prop-types';
import { useState } from 'react';
import { Divider, IconButton, Stack, Typography } from '@mui/joy';
import {
  ChevronLeft as PreviousSampleIcon,
  ChevronRight as NextSampleIcon,
} from '@mui/icons-material';
import { PointBrowserTabs } from './samples-point-browser';

export const ClusterBrowser = ({ samples = [] }) => {
  const [index, setIndex] = useState(0);
  const samplesCount = samples.length;
  
  const handeClickPrev = () => setIndex(prev => (prev - 1 + samplesCount) % samplesCount)
  const handeClickNext = () => setIndex(prev => (prev + 1) % samplesCount)

  return (
    <>
      <Stack direction="row" align="stretch" gap={ 1 } sx={{ width: '100%', margin: 'var(--joy-spacing) 0' }}>
        <IconButton onClick={ handeClickPrev } color="primary" size="sm" variant="soft"><PreviousSampleIcon /></IconButton>
        <Typography level="body-xs" variant="soft" color="primary" sx={{ whiteSpace: 'nowrap', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Sample { index + 1 } of { samplesCount }<br />
          <Typography level="title-sm">
            ID: { samples[index].sample_id }
          </Typography>
        </Typography>
        <IconButton onClick={ handeClickNext } color="primary" size="sm" variant="soft"><NextSampleIcon /></IconButton>
      </Stack>

      <Divider />
      
      <PointBrowserTabs properties={ samples[index] } />
    </>
  );
};

ClusterBrowser.propTypes = {
  samples: PropTypes.array.isRequired,
};