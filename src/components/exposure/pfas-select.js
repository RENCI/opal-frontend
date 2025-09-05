import { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  Option,
  Select,
  Stack,
  Typography,
} from '@mui/joy';
import { analytes } from '@data';

export const PfasSelect = ({
  value,
  onChange,
  disabledAnalytes = [],
  helpText,
}) => {
  const sortedAnalytes = useMemo(() => (
    Array.isArray(analytes)
      ? [...analytes].sort((a, b) => a.abbreviation.localeCompare(b.abbreviation))
      : []
  ), []);
  return (
    <FormControl>
      <FormLabel
        htmlFor="pfas-select-button"
        id="pfas-select-label"
      >Select PFAS Analyte</FormLabel> 
      <Select
        placeholder="Select PFAS Chemical"
        value={ value }
        onChange={ (event, value) => onChange(value) }
        sx={{ width: 240 }}
        slotProps={{
          button: {
            id: 'pfas-select-button',
            'aria-labelledby': 'pfas-select-label pfas-select-button',
          },
        }}
      >
        {
          sortedAnalytes.map(({ id, abbreviation, name }) => (
            <Option
              key={ `analyte-option-${ id }` }
              value={ id }
              label={ abbreviation }
              disabled={ disabledAnalytes.includes(id) }
              sx={{ '&.Mui-disabled': {
                backgroundColor: 'var(--joy-palette-primary-outlinedDisabledBorder)',
                filter: 'opacity(0.5)',
              } }}
            >
              <Stack>
                <Typography component="span" level="title-sm">{ abbreviation }</Typography>
                <Typography level="body-xs">{ name }</Typography>
              </Stack>
            </Option>
          ))
        }
      </Select>
      {
        helpText && <Typography level="body-sm" color="neutral">{ helpText }</Typography>
      }
    </FormControl>
  );
};

PfasSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabledAnalytes: PropTypes.arrayOf(PropTypes.string),
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

