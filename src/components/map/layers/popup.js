import PropTypes from 'prop-types';
import { useState } from 'react';
import { Popup } from 'react-map-gl/mapbox';
import { Divider, IconButton, Stack, Typography } from '@mui/joy';
import { analytes } from '@data';
import {
  ChevronLeft as PreviousSampleIcon,
  ChevronRight as NextSampleIcon,
} from '@mui/icons-material';
import './layers.css';

const sampleDetectionSummary = sampleProperties => {
  return (
    <Stack gap={ 1 }>
      <Typography size="body-md" textAlign="center">
        PFAS Concentrations:
      </Typography>
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

export const SampleClusterPopup = ({ info, onClose }) => {
  const [index, setIndex] = useState(0);
  const samplesCount = info.properties.samples.length;
  
  const handeClickPrev = () => setIndex(prev => (prev - 1 + samplesCount) % samplesCount)
  const handeClickNext = () => setIndex(prev => (prev + 1) % samplesCount)

  return (
    <Popup
      longitude={ info.coordinates[0] }
      latitude={ info.coordinates[1] }
      anchor="right"
      closeOnClick={false}
      onClose={ onClose }
    >
      <Stack direction="row" gap={ 2 }>
        <IconButton onClick={ handeClickPrev }><PreviousSampleIcon /></IconButton>
        <Stack direction="column">
          <Typography size="body-xs" textAlign="center" sx={{ whiteSpace: 'nowrap' }}>
            { index + 1 } / { samplesCount } samples<br />
          </Typography>
          <Typography size="body-md" variant="soft" textAlign="center" sx={{ whiteSpace: 'nowrap' }}>
            { info.properties.samples[index].sample_id }
          </Typography>
        </Stack>
        <IconButton onClick={ handeClickNext }><NextSampleIcon /></IconButton>
      </Stack>
      
      <Divider sx={{ margin: '1rem 0' }} />

      { sampleDetectionSummary(info.properties.samples[index]) }
    </Popup>
  );
};

SampleClusterPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  info: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    properties: PropTypes.object.isRequired,
  }).isRequired,
};

export const SamplePointPopup = ({ info, onClose }) => {
  return (
    <Popup
      longitude={ info.coordinates[0] }
      latitude={ info.coordinates[1] }
      anchor="right"
      closeOnClick={false}
      onClose={ onClose }
    >
      <Typography size="title-sm" sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
        Sample { info.properties.sample_id }
      </Typography>

      <Divider sx={{ margin: '1rem 0' }} />

      { sampleDetectionSummary(info.properties) }
    </Popup>
  )
};

SamplePointPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  info: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    properties: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['cluster', 'sample']).isRequired,
  }).isRequired,
};
