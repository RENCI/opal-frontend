import PropTypes from 'prop-types';
import { Divider, Stack, Typography } from '@mui/joy';
import { Popup } from 'react-map-gl/mapbox';

export const SuperfundPopup = ({ onClose, coordinates, properties = {} }) => {
  const {
    pfas,
    site_name,
  } = properties;

  return (
    <Popup
      longitude={ coordinates[0] }
      latitude={ coordinates[1] }
      anchor="bottom"
      closeOnClick={ false }
      onClose={ onClose }
      offset={ [0, -22] }
    >
      <br />
      <Stack gap={ 2 }>
        <Typography level="title-md" p={ 1 }>{ site_name }</Typography>
        <Divider />
        <Typography level="body-md" p={ 1 }>
          PFAS detected: <Typography variant="soft" color="primary">{ pfas ? 'yes' : 'no' }</Typography>
        </Typography>
      </Stack>
    </Popup>
  );
};

SuperfundPopup.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClose: PropTypes.func.isRequired,
  properties: PropTypes.shape({
    pfas: PropTypes.bool.isRequired,
    site_name: PropTypes.string.isRequired,
  }).isRequired,
};
