import PropTypes from 'prop-types';
import {
  Air as AirIcon,
  CleaningServices as DustIcon,
  Bloodtype as BloodIcon,
  WaterDrop as WaterIcon,
  HelpOutline as UnknownMediumIcon,
} from '@mui/icons-material';

const icons = {
  'air': AirIcon,
  'blood': BloodIcon,
  'dust': DustIcon,
  'water': WaterIcon,
};

export const MediumIcon = ({ medium, ...props }) => {
  const Icon = icons?.[medium] ?? UnknownMediumIcon;
  return <Icon { ...props } />
};

MediumIcon.propTypes = {
  medium: PropTypes.oneOf(Object.keys(icons)).isRequired,
};
