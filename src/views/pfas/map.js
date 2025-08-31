import { useMemo } from 'react';
import { Box } from '@mui/joy';
import { SamplesMap } from '@components/map';
import { usePfas } from '@views/pfas';
import { usePreferences } from '@context';

export const MapView = () => {
  const { table, superfundSites } = usePfas();
  const { colorMode } = usePreferences();

  // convert sample rows to plain array of {lat, lon}
  const sampleSitesWithLatLong = useMemo(() => {
    return table.getPrePaginationRowModel().rows
      .map(r => r.original)
      .filter(s => s.latitude && s.longitude);
  }, [table.getPrePaginationRowModel().rows.length]);

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
        superfundSites={ superfundSites.geojson }
        selectionRadius={ Number(table.getColumn('distance_to_npl')?.getFilterValue() ?? 5) }
        showSuperfundSiteRings={ table?.getColumn('distance_to_npl')?.getIsFiltered() ?? false }
      />
    </Box>
  );
};
