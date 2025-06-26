import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/joy';
import { useToggleState } from '@hooks';

export const DrawerPanel = ({
  children,
  defaultExpanded = false,
  title,
}) => {
  const expanded = useToggleState(defaultExpanded);

  return (
    <Accordion
      defaultExpanded={ defaultExpanded }
      expanded={ expanded.current }
      onChange={ expanded.toggle }
    >
      <AccordionSummary>
        <Typography level="title-sm">{ title }</Typography>
      </AccordionSummary>
      <AccordionDetails>
        { children }
      </AccordionDetails>
    </Accordion>
  )
}

DrawerPanel.propTypes = {
  children: PropTypes.node.isRequired,
  defaultExpanded: PropTypes.bool,
  title: PropTypes.string.isRequired,
};
