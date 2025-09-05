import PropTypes from 'prop-types';
import {
  Typography,
} from '@mui/joy';
import {
 Tune as FiltersIcon,
} from '@mui/icons-material';

export const DataSummaryStep = ({ data }) => (
  <>
    <Typography level="h2">Data Summary</Typography>
    <Typography startDecorator={ <FiltersIcon /> }>
      Working with { data.length.toLocaleString() } samples.
    </Typography>
  </>
);

DataSummaryStep.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
