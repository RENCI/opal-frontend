import { useCallback, useMemo, useRef, useState } from 'react';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box } from '@mui/joy'
import { usePreferences } from '@context';
import { useLocalStorage, useToggleState } from '@hooks';
import { MapDrawer, ViewStatePanel } from '@components/map';
import { SampleSitesLayer, SuperfundSitesLayer } from '@components/map/layers';
import { usePfas } from '@views/pfas';
import { flyTo } from '@util';

//

const token = process.env.MAPBOX_TOKEN;
const centerFitUS = {
  longitude: -97.555,
  latitude: 38.490,
  zoom: 4.000,
};

export const MapView = () => {
  const mapRef = useRef(null)
  const preferences = usePreferences()

  const [viewState, setViewState] = useLocalStorage('view-state', centerFitUS)
  const mapStyle = useMemo(() => `mapbox://styles/mapbox/${ preferences.colorMode.current }-v11`, [preferences.colorMode.current]);
  const [selectedSite, setSelectedSite] = useState(null);

  const { superfundSites, table } = usePfas();
  const interactiveLayerIds = ['superfund-sites', 'clusters', 'unclustered-point'];

  const flyToSuperfundSite = useCallback(({ latitude, longitude }) => {
    if (!latitude || !longitude) {
      console.warn('Missing lat/lon:', latitude, longitude);
      return;
    }
    flyTo(mapRef, { longitude, latitude, zoom: 11, duration: 2000 })
  }, [])

  const handleClickMap = useCallback(() => {
    setSelectedSite(null);
  }, []);

  const handleClickSuperfundSite = useCallback(site => {
    if (!site) {
      setSelectedSite(null);
    }
    flyToSuperfundSite(site);
    setSelectedSite(site);
  }, []);

  const isDragging = useToggleState(false);
  const handleDragStart = useCallback(() => isDragging.set(), []);
  const handleDragEnd = useCallback(() => isDragging.unset(), []);

  return (
    <Box sx={{
      flex: 1,
      overflow: 'hidden',
      position: 'fixed', left: 0, top: 0,
      width: '100vw', height: '100vh',
    }}>
      <Map
        ref={ mapRef }
        mapboxAccessToken={ token }
        initialViewState={ viewState }
        mapStyle={ mapStyle }
        attributionControl={ false }
        onClick={ handleClickMap }
        maxZoom={ 13 }
        onMove={ event => setViewState(event.viewState) }
        onMouseLeave={ event => event.target.getCanvas().style.cursor = 'default' }
        interactiveLayerIds={ interactiveLayerIds }
        onDragStart={ handleDragStart }
        onDragEnd={ handleDragEnd }
      >
        <SuperfundSitesLayer
          sites={ superfundSites }
          selectedSite={ selectedSite }
          onClick={ handleClickSuperfundSite }
        />
        <SampleSitesLayer
          data={ table.getPrePaginationRowModel().rows }
          mapRef={ mapRef }
        />
      </Map>
      <MapDrawer visible={ !isDragging.enabled }>
        <ViewStatePanel
          viewState={ viewState }
          onReset={ () => {
            flyTo(mapRef, { ...centerFitUS, duration: 2000 });
            setSelectedSite(null);
          } }
        />
      </MapDrawer>
    </Box>
  )
}

