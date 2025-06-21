import PropTypes from 'prop-types';
import { Sheet } from '@mui/joy';

export const SecondaryToolbar = ({ children }) => {
  return (
    <Sheet
      variant="soft"
      direction="row"
      align="center"
      spacing={ 2 }
      sx={{
        borderBottomLeftRadius: 'var(--joy-spacing)',
        borderBottomRightRadius: 'var(--joy-spacing)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
        borderTop: 0,
        marginRight: 'calc(2 * var(--joy-spacing))',
        overflow: 'hidden',
      }}
    >{ children }</Sheet>
  );
};

SecondaryToolbar.propTypes = {
  children: PropTypes.node,
};

