import { useMemo } from 'react';
import { Box } from '@mui/joy';
import { SamplesMap } from '@components/map';
import { usePfas } from '@views/pfas';
import { usePreferences } from '@context';

export const MapView = () => {
  const { table, superfundSites } = usePfas();
  const { colorMode } = usePreferences();

  // ✅ Convert sample rows to plain array of {lat, lon}
  const sampleSitesWithLatLong = useMemo(() => {
    return table.getPrePaginationRowModel().rows
      .map(r => r.original)
      .filter(s => s.latitude && s.longitude);
  }, [table.getPrePaginationRowModel().rows.length]);

  // ✅ Convert Superfund response into GeoJSON FeatureCollection
  const superfundGeoJSON = useMemo(() => {
    if (!superfundSites?.data) return null;

    return {
      type: "FeatureCollection",
      features: superfundSites.data
        .filter(site => site.longitude && site.latitude)
        .map(site => ({
          type: "Feature",
          id: site.sems_id ?? site.ogc_fid,
          geometry: {
            type: "Point",
            coordinates: [site.longitude, site.latitude],
          },
          properties: { ...site },
        }))
    };
  }, [superfundSites?.data]);

  return (
    <Box sx={{
      flex: 1,
      overflow: 'hidden',
      position: 'fixed', left: 0, top: 0,
      width: '100vw', height: '100vh',
    }}>
      <SamplesMap
        mapStyle={ colorMode.current }
        samples={ sampleSitesWithLatLong }
        superfundSites={ superfundGeoJSON }
        selectionRadius={ superfundSites?.selectionRadius?.current ?? 5 }
        showSuperfundSiteRings={ superfundSites?.filtering?.enabled ?? false }
      />
    </Box>
  );
};
