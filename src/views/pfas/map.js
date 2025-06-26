import { useCallback, useMemo, useRef, useState } from 'react';
import Map from 'react-map-gl/mapbox';
import { Layer, Source } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box } from '@mui/joy'
import { usePreferences } from '@context';
import { useLocalStorage, useToggleState } from '@hooks';
import { MapDrawer, ViewStatePanel } from '@components/map';
import { usePfas } from '@views/pfas';
import { flyTo } from '@util';

//

const token = process.env.MAPBOX_TOKEN;
const centerFitUS = {
  longitude: -98.583,
  latitude: 39.883,
  zoom: 4.75,
};

export const MapView = () => {
  const mapRef = useRef(null)
  const preferences = usePreferences()

  const [viewState, setViewState] = useLocalStorage('view-state', centerFitUS)
  const mapStyle = useMemo(() => `mapbox://styles/mapbox/${ preferences.colorMode.current }-v11`, [preferences.colorMode.current]);
  const [selectedSite, setSelectedSite] = useState(null);

  const { superfundSites } = usePfas();
  const superfundSitesGeoJson = useMemo(() => {
    return {
      type: 'FeatureCollection',
      features: superfundSites.map(site => ({
        type: 'Feature',
        properties: {
          id: site.id,
          name: site.name,
        },
        geometry: {
          type: 'Point',
          coordinates: [site.longitude, site.latitude],
        }
      })),
    };
  }, [superfundSites]);

  const interactiveLayerIds = ['superfund-site-points'];

  const flyToSuperfundSite = useCallback(({ latitude, longitude }) => {
    flyTo(mapRef, { longitude, latitude, zoom: 11.5, duration: 2000 })
  }, [mapRef.current])

  const handleClickMap = useCallback(event => {
    const feature = event.features?.find(f => interactiveLayerIds.includes(f.layer.id));
    if (feature) {
      const [longitude, latitude] = feature.geometry.coordinates;
      const props = feature.properties;

      setSelectedSite({
        /* eslint-disable-next-line react/prop-types */
        id: props.id,
        /* eslint-disable-next-line react/prop-types */
        name: props.name,
        latitude,
        longitude,
      });
      flyToSuperfundSite({ latitude, longitude });
    } else {
      // clicked on map, but not on a site. clear circle.
      setSelectedSite(null);
    }
  }, []);

  const handleMouseMove = useCallback(event => {
    const isOnSite = event.features?.some(f => f.layer.id === 'superfund-site-points');
    event.target.getCanvas().style.cursor = isOnSite ? 'pointer' : 'default';
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
        onMove={ event => setViewState(event.viewState) }
        onMouseMove={ handleMouseMove }
        onMouseLeave={ event => event.target.getCanvas().style.cursor = 'default' }
        interactiveLayerIds={ interactiveLayerIds }
        onDragStart={ handleDragStart }
        onDragEnd={ handleDragEnd }
      >
        {
          superfundSitesGeoJson && (
            <Source id="superfund-sites" type="geojson" data={ superfundSitesGeoJson }>
              <Layer
                id="superfund-site-points"
                type="circle"
                paint={{
                  'circle-radius': 6,
                  'circle-color': 'crimson',
                  'circle-stroke-width': 1,
                  'circle-stroke-color': '#fff',
                }}
              />
            </Source>
          )
        }
      </Map>
      <MapDrawer visible={ !isDragging.enabled }>
        <ViewStatePanel viewState={ viewState } />
      </MapDrawer>
    </Box>
  )
}

