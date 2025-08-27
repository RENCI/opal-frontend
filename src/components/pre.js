import PropTypes from 'prop-types';
import { Typography } from '@mui/joy';

export const Pre = ({ children, sx = {} }) => {
  return (
    <Typography
      component="pre"
      variant="soft"
      color="primary"
      fontFamily="monospace"
      level="body-xs"
      p={ 1 }
      sx={{
        scrollbarColor: 'var(--joy-palette-background-surface) var(--joy-palette-primary-softBg)',
        scrollbarWidth: 'thin',
        overflow: 'auto',
        ...sx,
      }}
    >{ children }</Typography>
  );
};

Pre.propTypes = {
  children: PropTypes.string,
  sx: PropTypes.object,
};
