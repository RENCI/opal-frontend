import PropTypes from 'prop-types';
import { Popup } from 'react-map-gl/mapbox';
import { ClusterBrowser } from './samples-cluster-browser';
import { PointBrowser } from './samples-point-browser';
import './popups.css';

export const SamplesPopup = ({ onClose, coordinates, properties, type }) => {
  return (
    <Popup
      longitude={ coordinates[0] }
      latitude={ coordinates[1] }
      anchor="right"
      closeOnClick={ false }
      onClose={ onClose }
    >
      <br />
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
