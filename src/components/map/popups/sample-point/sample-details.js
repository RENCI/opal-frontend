import PropTypes from 'prop-types';
import { Stack } from '@mui/joy';
import { Detail } from '@components/detail';

export const SampleDetails = ({ properties }) => {
  return (
    <Stack gap={ 1 }>
      <Detail label="ID" value={ properties?.sample_id ?? '---' } />
      <Detail label="Study" value={ properties?.study ?? '---' } />
      <Detail label="Date" value={ properties?.date ?? '---' } />
      <Detail label="PI" value={ properties?.pi ?? '---' } />
      <Detail label="Units" value={ properties?.units ?? '---' } />
      <Detail label="Medium" value={ properties?.medium ?? '---' } />
      <Detail label="Site" value={ `${ properties?.site_id ?? '' } (${ properties?.site_type ?? '---' })` } />
    </Stack>    
  );
};

SampleDetails.propTypes = {
  properties: PropTypes.shape({
    sample_id: PropTypes.string.isRequired,
    study: PropTypes.string.isRequired,
    date: PropTypes.string,
    pi: PropTypes.string.isRequired,
    units: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    site_id: PropTypes.string.isRequired,
    site_type: PropTypes.string.isRequired,
  }).isRequired,};
