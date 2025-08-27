import PropTypes from 'prop-types';
import { Divider, Stack, Typography } from '@mui/joy';
import { Popup } from 'react-map-gl/mapbox';

export const SuperfundPopup = ({ onClose, coordinates, properties = {} }) => {
  const {
    city,
    county,
    pfas,
    site_name,
    state,
  } = properties;

  return (
    <Popup
      longitude={ coordinates[0] }
      latitude={ coordinates[1] }
      anchor="bottom"
      closeOnClick={ false }
      onClose={ onClose }
      offset={ [0, -22] }
      className={ pfas ? 'pfas-detected' : 'no-pfas-detected' }
    >
      <br />
      <Typography level="title-md" p={ 1 }>{ site_name }</Typography>
      <Divider />
      <Stack gap={ 1 } p={ 1 }>
        <Typography level="body-md">
          City: <Typography variant="soft" color="primary">{ city }</Typography>
        </Typography>
        <Typography level="body-md">
          County: <Typography variant="soft" color="primary">{ county }</Typography>
        </Typography>
        <Typography level="body-md">
          State: <Typography variant="soft" color="primary">{ state }</Typography>
        </Typography>
        <Typography level="body-md">
          PFAS: <Typography variant="soft" color={ pfas ? 'warning' : 'success' }>{ pfas ? 'yes' : 'no' }</Typography>
        </Typography>
      </Stack>
    </Popup>
  );
};

SuperfundPopup.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClose: PropTypes.func.isRequired,
  properties: PropTypes.shape({
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired,
    pfas: PropTypes.bool.isRequired,
    site_name: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
};
