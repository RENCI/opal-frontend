import PropTypes from 'prop-types';
import { useState } from 'react';
import { Divider, IconButton, Stack, Typography } from '@mui/joy';
import {
  ChevronLeft as PreviousSampleIcon,
  ChevronRight as NextSampleIcon,
} from '@mui/icons-material';
import { PointBrowserTabs } from './samples-point-browser';
import { MediumIcon } from './medium-icon';

export const ClusterBrowser = ({ samples = [] }) => {
  const [index, setIndex] = useState(0);
  const samplesCount = samples.length;
  
  const handeClickPrev = () => setIndex(prev => (prev - 1 + samplesCount) % samplesCount)
  const handeClickNext = () => setIndex(prev => (prev + 1) % samplesCount)

  return (
    <>
      <Stack direction="row" align="stretch" gap={ 1 } sx={{ width: '100%', margin: 'var(--joy-spacing) 0' }}>
        <IconButton onClick={ handeClickPrev } color="primary" size="sm" variant="soft"><PreviousSampleIcon /></IconButton>
        <Stack direction="row" gap={ 1 } sx={{ flex: 1 }} bgcolor="primary.softBg">
          <MediumIcon medium={ samples[index].medium } sx={{ fontSize: '2rem', alignSelf: 'center' }} />
          <Stack sx={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Typography level="title-xs" p={ 0 }>Sample { index + 1 } of { samplesCount }</Typography>
            <Typography level="title-sm" p={ 0 }>ID: { samples[index].sample_id }</Typography>
          </Stack>
        </Stack>
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