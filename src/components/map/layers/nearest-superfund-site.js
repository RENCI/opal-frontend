import { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as turf from '@turf/turf';
import { Stack, Typography } from '@mui/joy';
import { usePfas } from '@views/pfas';
import { Detail } from '@components/detail';
import FlyToButton from '../fly-to-button';

export const NearestSuperfundSite = ({ coordinates }) => {
  const { superfundSites } = usePfas();
  
  const nearest = useMemo(() => {
    if (!coordinates || !superfundSites?.geojson?.features?.length) return null;

    const samplePoint = turf.point(coordinates);
    const nearestSite = turf.nearestPoint(samplePoint, superfundSites.geojson);

    return nearestSite;
  }, [coordinates, superfundSites.geojson?.features]);

  const distance = useMemo(() => {
    if (!coordinates || !nearest) return null;
    return turf.distance(turf.point(coordinates), nearest, { units: 'miles' }).toFixed(2);
  }, [coordinates, nearest]);

  return (
    <Stack gap={ 1 } p={ 0 } my={ 2 }>
      <Detail
        label="Name"
        value={ nearest?.properties?.site_name ?? 'Unknown' }
      />
      <Detail label="Distance" value={ distance ? `${ distance } miles` : '...' } />
      <Typography endDecorator={
        <FlyToButton
          longitude={ nearest?.properties?.longitude }
          latitude={ nearest?.properties?.latitude }
        />
      }>Fly there</Typography>
    </Stack>
  );
};

NearestSuperfundSite.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};
