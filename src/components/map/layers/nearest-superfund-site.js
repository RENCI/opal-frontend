import { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as turf from '@turf/turf';
import { Divider, Stack, Typography } from '@mui/joy';
import { usePfas } from '@views/pfas';
import superfundSiteMarker from '@images/pin-grey.png';

const Detail = ({ label, value = '...' }) => {
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
      <Typography
        level="title-sm"
        startDecorator={ <img src={ superfundSiteMarker } width={ 16 } /> }
      >Nearest Superfund Site</Typography>

      <Divider />

      <Detail
        label="Name"
        value={ nearest?.properties?.site_name ?? 'Unknown' }
      />
      <Detail
        label="Distance"
        value={ distance ? `${ distance } miles` : '...' }
      />
    </Stack>
  );
};

NearestSuperfundSite.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};
