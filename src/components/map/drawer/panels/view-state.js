import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, ButtonGroup, IconButton, Stack, Typography,
} from '@mui/joy'
import {
  RestartAlt as ResetIcon,
  WebAsset as PanelIcon,
  MyLocation as CrosshairsIcon,
} from '@mui/icons-material';
import { DrawerPanel } from '../panel';

// helper: promisify geolocation
function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

const MyLocationButton = ({ mapRef = {} }) => {
  const [busy, setBusy] = useState(false);

  const handleClick = useCallback(async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    setBusy(true);
    try {
      const position = await getCurrentPosition({ enableHighAccuracy: true });
      const { latitude, longitude } = position.coords;
      console.log({ latitude, longitude });

      if (!mapRef.current) {
        console.warn("Map not ready yet");
        return;
      }

      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 12,
        essential: true, // for accessibility/reduced motion
      });
    } catch (err) {
      console.error("Error getting user location:", err);
    } finally {
      setBusy(false);
    }
  }, [mapRef]);

  return (
    <IconButton
      onClick={ handleClick }
      loading={ busy }
      color="primary"
      variant="soft"
    >
      <CrosshairsIcon />
    </IconButton>
  );
};

MyLocationButton.propTypes = {
  mapRef: PropTypes.shape({ current: PropTypes.any }),
};

export const ViewStatePanel = ({ viewState, onReset, mapRef = {} }) => {
  return (
    <DrawerPanel
      title="View State"
      icon={ <PanelIcon /> }
      defaultExpanded
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--joy-spacing)',
        padding: 0,
        '& .key': {
          flex: 1,
        },
        '& .value': {
          fontFamily: 'monospace',
          flex: '0 0 80px',
          whiteSpace: 'nowrap',
          textAlign: 'right',
        }
      }}>
        <Stack direction="row" justify="space-between">
          <Typography level="body-sm" className="key">Latitude:</Typography>
          <Typography level="body-sm" variant="soft" ml={ 2 } className="value">
            { viewState.latitude.toFixed(3) }
          </Typography>
        </Stack>
        <Stack direction="row" justify="space-between">
          <Typography level="body-sm" className="key">Longitude:</Typography>
          <Typography level="body-sm" variant="soft" ml={ 2 } className="value">
            { viewState.longitude.toFixed(3) }
          </Typography>
        </Stack>
        <Stack direction="row" justify="space-between">
          <Typography level="body-sm" className="key">Zoom:</Typography>
          <Typography level="body-sm" variant="soft" ml={ 2 } className="value">
            { viewState.zoom.toFixed(3) }
          </Typography>
        </Stack>
        <ButtonGroup>
          <Button
            variant="outlined"
            color="primary"
            size="sm"
            onClick={ onReset }
            startDecorator={ <ResetIcon /> }
            sx={{ flex: 1 }}
          >Reset</Button>
          <MyLocationButton mapRef={ mapRef } />
        </ButtonGroup>
      </Box>
    </DrawerPanel>
  )
}

ViewStatePanel.propTypes = {
  viewState: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }),
  onReset: PropTypes.func.isRequired,
  mapRef: PropTypes.shape({ current: PropTypes.any }),
};

