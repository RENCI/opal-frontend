import PropTypes from 'prop-types';
import {
  Slider, Stack, Typography,
} from '@mui/joy';
import {
  WebAsset as PanelIcon,
} from '@mui/icons-material';
import { DrawerPanel } from '../panel';

export const SelectionRadiusPanel = ({ value, onChange }) => {
  return (
    <DrawerPanel
      title="Selection Radius"
      icon={ <PanelIcon /> }
      defaultExpanded
    >
      <Stack direction="row" spacing={ 1 } alignItems="center">
        <Slider
          value={ value }
          onChange={ event => onChange(event.target.value) }
          aria-label="Selection Radius"
          valueLabelDisplay="off"
          step={ 1 }
          min={ 1 }
          max={ 20 }
          marks
          size="sm"
        />
        <Typography variant="soft" sx={{
          minWidth: '5rem',
          fontFamily: 'monospace',
          textAlign: 'right',
        }}>{ value } mi</Typography>
      </Stack>
    </DrawerPanel>
  )
}

SelectionRadiusPanel.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
