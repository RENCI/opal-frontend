import PropTypes from 'prop-types';
import { Typography } from '@mui/joy';
import { ResponsivePie } from '@nivo/pie';
import { chartTheme } from '../../../theme';
import './popups.css';

export const SamplesDetectionPie = ({ data = [] }) => {
  return (
    <div style={{ height: '350px', aspectRatio: '1 / 1' }}>
      {
        data.length === 0 ? (
          <Typography
            sx={{ placeContent: 'center' }}
            textAlign="center"
            height={ 350 }
          >No PFAS detected</Typography>
        ) : (
          <ResponsivePie
            data={ data }
            margin={{ top: 12, right: 12, bottom: 12, left: 12 }}
            innerRadius={ 0.5 }
            padAngle={ 1 }
            enableArcLinkLabels={ false }
            colors={{ scheme: 'tableau10' }}
            theme={ chartTheme }
          />
        )
      }
    </div>
  );
};

SamplesDetectionPie.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
};

