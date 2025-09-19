import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  Input,
} from '@mui/joy';

export const NumberInput = ({ name, label = '', value, setValue, inputProps = {} }) => {
  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel htmlFor={ name } sx={{ width: '100%' }}>
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
  label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]),
  setValue: PropTypes.func,
  value: PropTypes.number.isRequired,
  inputProps: PropTypes.object,
};
