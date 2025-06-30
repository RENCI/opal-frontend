import { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLocalStorage, useToggleState } from '@hooks';
import {
  MapDrawer,
  LayersPanel,
  ViewStatePanel,
} from '@components/map';
import { SampleSitesLayer, SuperfundSitesLayer } from '@components/map/layers';
import { usePfas } from '@views/pfas';

//

const token = process.env.MAPBOX_TOKEN;
const centerFitUS = {
  longitude: -97.555,
  latitude: 38.490,
  zoom: 4.000,
};

export const flyTo = (mapRef, { latitude, longitude, zoom, duration }) => {
  if (!mapRef.current) {
    return;
  }
  mapRef.current.flyTo({ center: [longitude, latitude], zoom, duration });
};

export const SamplesMap = ({ samples = [], mapStyle = 'light' }) => {
  const mapRef = useRef(null)
  const mapboxStyle = useMemo(() => `mapbox://styles/mapbox/${ mapStyle }-v11`, [mapStyle]);

  const [viewState, setViewState] = useLocalStorage('view-state', centerFitUS)
  const [selectedSuperfundSite, setSelectedSuperfundSite] = useState(null);

  const { superfundSites } = usePfas();
  const interactiveLayerIds = ['superfund-sites', 'clusters', 'unclustered-point'];

  const flyToSuperfundSite = useCallback(({ latitude, longitude }) => {
    if (!latitude || !longitude) {
      console.warn('Missing lat/lon:', latitude, longitude);
      return;
    }
    flyTo(mapRef, { longitude, latitude, zoom: 11, duration: 2000 })
  }, [])

  const handleClickMap = useCallback(() => {
    setSelectedSuperfundSite(null);
  }, []);

  const handleClickSuperfundSite = useCallback(site => {
    if (!site) {
      setSelectedSuperfundSite(null);
    }
    flyToSuperfundSite(site);
    setSelectedSuperfundSite(site);
  }, []);

  const isDragging = useToggleState(false);
  const handleDragStart = useCallback(() => isDragging.set(), []);
  const handleDragEnd = useCallback(() => isDragging.unset(), []);

  return (
    <>
      <Map
        ref={ mapRef }
        mapboxAccessToken={ token }
        initialViewState={ viewState }
        mapStyle={ mapboxStyle }
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
          superfundSites={ superfundSites }
          sampleSites={ samples }
          selectedSuperfundSite={ selectedSuperfundSite }
          onClick={ handleClickSuperfundSite }
        />
        <SampleSitesLayer
          data={ samples }
          mapRef={ mapRef }
        />
      </Map>
      <MapDrawer visible={ !isDragging.enabled }>
        <ViewStatePanel
          viewState={ viewState }
          onReset={ () => {
            flyTo(mapRef, { ...centerFitUS, duration: 2000 });
            setSelectedSuperfundSite(null);
          } }
        />
        <LayersPanel />
      </MapDrawer>
    </>
  );
};

SamplesMap.propTypes = {
  mapStyle: PropTypes.oneOf(['light', 'dark']),
  samples: PropTypes.array,
};
