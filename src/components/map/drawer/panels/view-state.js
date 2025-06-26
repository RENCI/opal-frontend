import PropTypes from 'prop-types';
import {
  Box, Button, Stack, Typography,
} from '@mui/joy'
import { RestartAlt as ResetIcon } from '@mui/icons-material';
import { DrawerPanel } from '../panel';

export const ViewStatePanel = ({ viewState, onReset }) => {
  return (
    <DrawerPanel title="View State" defaultExpanded>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
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
      </Box>
      <Button
        variant="plain"
        color="primary"
        size="sm"
        onClick={ onReset }
        startDecorator={ <ResetIcon /> }
      >Reset</Button>
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
};

