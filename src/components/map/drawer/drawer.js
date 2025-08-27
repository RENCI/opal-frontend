import PropTypes from 'prop-types';
import { AccordionGroup, Sheet } from '@mui/joy'

export const MapDrawer = ({ children, visible = true }) => {
  return (
    <AccordionGroup
      component={ Sheet }
      variant="outlined"
      className={ visible ? 'visible' : 'hidden' }
      sx={{
        borderRadius: 'var(--joy-spacing)',
        width: '240px',
        position: 'absolute',
        backgroundColor: 'color-mix(in hsl, var(--joy-palette-background-surface), transparent 50%)',
        backdropFilter: 'blur(4px)',
        top: 'calc(102px + var(--joy-spacing))',
        right: 'calc(2 * var(--joy-spacing))',
        bottom: 'calc(204px + var(--joy-spacing))',
        zIndex: 9,
        overflow: 'auto',
        '.MuiTypography-root': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
        '&.visible': {
          transform: 'translateX(0)',
          opacity: 1,
        },
        '&.hidden': {
          transform: 'translateX(110%)',
          opacity: 0.2,
        },
      }}
    >{ children }</AccordionGroup>
  );
};

MapDrawer.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool.isRequired,
};
