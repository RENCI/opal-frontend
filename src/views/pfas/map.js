import { useMemo } from 'react';
import { Box } from '@mui/joy'
import { SamplesMap } from '@components/map';
import { usePfas } from '@views/pfas';
import { usePreferences } from '@context';
import { useLocalStorage } from '@hooks';

//

export const MapView = () => {
  const { table } = usePfas();
  const { colorMode } = usePreferences()
  const [selectionRadius, ] = useLocalStorage('selection-radius', 5);

  const sampleSitesWithLatLong = useMemo(() => {
    return table.getPrePaginationRowModel().rows
      .map(r => r.original)
      .filter(s => s.latitude && s.longitude)
  },
  [table.getPrePaginationRowModel().rows.length]);

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
        selectionRadius={ selectionRadius }
      />
    </Box>
  )
}

