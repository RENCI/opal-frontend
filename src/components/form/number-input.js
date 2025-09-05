import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  Input,
} from '@mui/joy';

export const NumberInput = ({ name, label = '', value, setValue, inputProps = {} }) => {
  return (
    <FormControl>
      <FormLabel htmlFor={ name }>
        { label }
      </FormLabel>
      <Input
        name={ name }
        value={ value }
        onChange={ event => {
          const next = parseFloat(event.target.value);
          setValue && setValue(isNaN(next) ? '' : next);
        } }
        slotProps={{
          input: { type: 'number', min: 0, max: 10, step: 0.01 }
        }}
        { ...inputProps }
      />
    </FormControl>
  );
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setValue: PropTypes.func,
  value: PropTypes.number.isRequired,
  inputProps: PropTypes.object,
};
