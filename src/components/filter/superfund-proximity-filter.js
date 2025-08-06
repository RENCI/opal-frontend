import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Checkbox,
  ListItemContent,
  Slider,
  Stack,
  Typography,
} from '@mui/joy';
import {
  Circle as IndicatorIcon,
  Close as UnselectedIcon,
} from '@mui/icons-material';
import { usePfas } from '@views/pfas';
import { useLocalStorage, useToggleState } from '@hooks';

export const SuperfundProximityFilter = () => {
  const { table } = usePfas()
  const filterActivity = useToggleState(false);
  const [selectionRadius, setSelectionRadius] = useLocalStorage('selection-radius', 5);

  if (!table) {
    return '...'
  }

  return (
    <AccordionGroup>
      <Accordion>
        <AccordionSummary>
          <IndicatorIcon
            color="primary"
            sx={{
              transform: 'scale(0.75)',
              filter: 'opacity(0.1)',
            }}
          />
          <ListItemContent>Superfund Site Proximity</ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack p={ 1 } spacing={ 1 }>
            <SuperfundProximityToggle
              checked={ filterActivity.enabled }
              onChange={ filterActivity.toggle }
            />
            <SuperfundRadiusSlider
              disabled={ !filterActivity.enabled }
              value={ selectionRadius }
              onChange={ newValue => setSelectionRadius(newValue) }
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  )
}

const SuperfundProximityToggle = ({ checked = false, onChange }) => {
  return (
    <Checkbox
      label="Activate"
      checked={ checked }
      onChange={ () => onChange() }
      uncheckedIcon={ <UnselectedIcon /> }
    />
  );
};

SuperfundProximityToggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const SuperfundRadiusSlider = ({ value, onChange, disabled = false }) => {
  return (
    <Stack direction="row" spacing={ 1 } alignItems="center">
      <Slider
        value={ value }
        onChange={ event => onChange(event.target.value) }
        aria-label="Selection Radius"
        valueLabelDisplay="off"
        disabled={ disabled }
        step={ 1 }
        max={ 20 }
        min={ 1 }
        size="sm"
        marks
      />
      <Typography
        variant="soft"
        level="body-sm"
        sx={{
          minWidth: '4rem',
          fontFamily: 'monospace',
          textAlign: 'right',
        }}
      >{ value } mi</Typography>
    </Stack>
  )
}

SuperfundRadiusSlider.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

