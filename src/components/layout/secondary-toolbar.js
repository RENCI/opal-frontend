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
        zIndex: 1,
        backgroundColor: 'var(--variant-softBg, var(--joy-palette-neutral-softBg, var(--joy-palette-neutral-100, #F0F4F8)))',
        borderBottomLeftRadius: 'var(--joy-spacing)',
        borderBottomRightRadius: 'var(--joy-spacing)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
        borderTop: 0,
        overflow: 'hidden',
      }}
    >{ children }</Sheet>
  );
};

SecondaryToolbar.propTypes = {
  children: PropTypes.node,
};

