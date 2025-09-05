import PropTypes from 'prop-types';
import { Popup } from 'react-map-gl/mapbox';
import { ClusterBrowser } from './sample-cluster';
import { PointBrowser } from './sample-point';

export const SamplesPopup = ({ onClose, coordinates, properties, type }) => {
  return (
    <Popup
      longitude={ coordinates[0] }
      latitude={ coordinates[1] }
      anchor="right"
      closeOnClick={ false }
      onClose={ onClose }
    >
      { type === 'cluster' && <ClusterBrowser samples={ properties.samples } /> }
      { type === 'point' && <PointBrowser properties={ properties } /> }
    </Popup>
  );
};

SamplesPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  properties: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['point', 'cluster']).isRequired,
};
