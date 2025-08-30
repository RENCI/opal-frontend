import PropTypes from 'prop-types';
import { IconButton } from '@mui/joy';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useMap } from 'react-map-gl/mapbox';

const FlyToButton = ({ latitude, longitude, zoom = 10 }) => {
  const { current: map } = useMap();

  const handleClick = () => {
    if (!map) return;
    map.flyTo({
      center: [longitude, latitude],
      zoom,
      essential: true,
    });
  };

  return (
    <IconButton
      size="sm"
      variant="outlined"
      color="neutral"
      onClick={ handleClick }
    >
      <MyLocationIcon fontSize="small" />
    </IconButton>
  );
};

FlyToButton.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number,
};

export default FlyToButton;
