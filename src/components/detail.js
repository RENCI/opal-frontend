import PropTypes from 'prop-types';
import { Typography } from '@mui/joy';

export const Detail = ({ label, value = '...' }) => {
  return (
    <Typography level="body-sm">
      { label }: <Typography variant="soft" color="primary">{ value }</Typography>
    </Typography>  );
};

Detail.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.node, PropTypes.number, PropTypes.string,
  ]).isRequired,
};