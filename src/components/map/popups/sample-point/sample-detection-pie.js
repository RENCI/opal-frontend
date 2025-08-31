import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';
import { Box, Typography } from '@mui/joy';
import { ResponsivePie } from '@nivo/pie';
import { chartTheme } from '../../../../theme';

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const SamplesDetectionPie = ({ data = [] }) => {
  return (
    <div style={{ height: '350px', aspectRatio: '1 / 1', position: 'relative' }}>
      <ResponsivePie
        data={ data }
        margin={{ top: 12, right: 12, bottom: 12, left: 12 }}
        innerRadius={ 0.5 }
        padAngle={ 1 }
        enableArcLinkLabels={ false }
        colors={{ scheme: 'tableau10' }}
        theme={ chartTheme }
      />
      {
        data.length === 0 && (
          <Box
            sx={{
              position: 'absolute',
              left: 0, top: 0, width: '100%', height: '100%',
              backgroundImage: 'radial-gradient(transparent 0%, transparent 33%, var(--joy-palette-primary-softBg) 66%, transparent 66%)',
              animation: `${ fadeInAnimation } 1s ease-in-out forwards`,
              display: 'grid',
            }}
          >
            <Typography sx={{
              textAlign: 'center',
              placeContent: 'center',
            }}>No PFAS detected</Typography>
          </Box>
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

