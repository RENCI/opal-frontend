import { useCallback, useMemo, useRef } from 'react';
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

export const flyTo = (mapRef, { latitude, longitude, zoom, duration = 2000 }) => {
  if (!mapRef.current) {
    return;
  }
  if (!latitude || !longitude) {
    console.warn('Missing lat/lon:', latitude, longitude);
    return;
  }
  mapRef.current.flyTo({ center: [longitude, latitude], zoom, duration });
};

export const SamplesMap = ({ samples = [], selectionRadius = 5, mapStyle = 'light' }) => {
  const mapRef = useRef(null)
  const mapboxStyle = useMemo(() => `mapbox://styles/mapbox/${ mapStyle }-v11`, [mapStyle]);

  const [viewState, setViewState] = useLocalStorage('view-state', centerFitUS)
  const interactiveLayerIds = ['superfund-sites', 'clusters', 'unclustered-point'];

  const { superfundSites } = usePfas();

  const handleClickMap = useCallback(() => {
    console.log('click');
  }, []);

  const resetMap = useCallback(() => {
    flyTo(mapRef, centerFitUS);
  }, [mapRef]);

  const isDragging = useToggleState(false);
  const handleDragStart = useCallback(() => isDragging.set(), []);
  const handleDragEnd = useCallback(() => isDragging.unset(), []);
  // console.log(samples)

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
          selectionRadius={ selectionRadius }
        />
        <SampleSitesLayer mapRef={ mapRef } data={ samples } />
      </Map>
      <MapDrawer visible={ !isDragging.enabled }>
        <ViewStatePanel
          viewState={ viewState }
          onReset={ resetMap }
        />
        <LayersPanel />
      </MapDrawer>
    </>
  );
};

SamplesMap.propTypes = {
  mapStyle: PropTypes.oneOf(['light', 'dark']),
  samples: PropTypes.array,
  selectionRadius: PropTypes.number.isRequired,
};
