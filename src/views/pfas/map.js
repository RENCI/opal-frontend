import { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Map from 'react-map-gl/mapbox';
import { Layer, Source } from 'react-map-gl/mapbox';
import {
  Box, Card, Divider, Stack, Typography,
} from '@mui/joy'
import { usePreferences } from '@context';
import { useLocalStorage } from '@hooks';
import 'mapbox-gl/dist/mapbox-gl.css';
import { usePfas } from '@views/pfas';
import { flyTo } from '@util';

//

const token = process.env.MAPBOX_TOKEN;
const centerFitUS = {
  longitude: -98.583,
  latitude: 39.883,
  zoom: 4.75,
};


export const ViewStatePanel = ({ viewState }) => {
  return (
    <Card sx={{
      '& .key': {
        flex: 1,
      },
      '& .value': {
        flex: '0 0 80px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontFamily: 'monospace',
      }
    }}>
      <Typography level="title-sm">View State</Typography>
      <Divider />
      <Stack direction="row" justify="space-between">
        <Typography level="body-sm" className="key">longitude:</Typography>
        <Typography level="body-sm" variant="soft" ml={ 2 } className="value">
          { viewState.longitude }
        </Typography>
      </Stack>
      <Stack direction="row" justify="space-between">
        <Typography level="body-sm" className="key">latitude:</Typography>
        <Typography level="body-sm" variant="soft" ml={ 2 } className="value">
          { viewState.latitude }
        </Typography>
      </Stack>
      <Stack direction="row" justify="space-between">
        <Typography level="body-sm" className="key">zoom:</Typography>
        <Typography level="body-sm" variant="soft" ml={ 2 } className="value">
          { viewState.zoom }
        </Typography>
      </Stack>
    </Card>
  )
}

ViewStatePanel.propTypes = {
  viewState: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }),
};

const SelectedSite = ({ site }) => {
  if (!site) {
    return null;
  }
  return (
    <Card>
      <Typography level="title-sm">Superfund Site</Typography>
      <Divider />
      <Typography level="body-sm">{ site.name }</Typography>
    </Card>
  )
};

SelectedSite.propTypes = {
  site: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    longitude:PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
  }),
};

export const MapDrawer = ({ children }) => {
  return (
    <Box sx={{
      width: '250px',
      position: 'absolute',
      backgroundColor: 'color-mix(in hsl, var(--joy-palette-background-surface), transparent 50%)',
      backdropFilter: 'blur(4px)',
      top: '102px',
      right: 'var(--joy-spacing)',
      bottom: 'calc(204px + var(--joy-spacing))',
      padding: 'var(--joy-spacing)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      gap: 'var(--joy-spacing)',
      zIndex: 9,
      '.MuiTypography-root': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    }}>
      { children }
    </Box>
  );
};

MapDrawer.propTypes = {
  children: PropTypes.node
};

export const MapView = () => {
  const mapRef = useRef(null)
  const preferences = usePreferences()
  const { superfundSites } = usePfas();
  const [viewState, setViewState] = useLocalStorage('view-state', centerFitUS)
  const mapStyle = useMemo(() => `mapbox://styles/mapbox/${ preferences.colorMode.current }-v11`, [preferences.colorMode.current]);
  const [selectedSite, setSelectedSite] = useState(null);

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

  const flyToSuperfundSite = useCallback(({ latitude, longitude }) => {
    flyTo(mapRef, { longitude, latitude, zoom: 11.5, duration: 2000 })
  }, [mapRef.current])

  const handleClickMap = useCallback(event => {
    const feature = event.features?.find(f => f.layer.id === 'superfund-site-points');
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

  console.log('selectedSite:', selectedSite?.id);

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
        style={{
          postiion: 'absolute', left: 0, top: 0,
        }}
        mapStyle={ mapStyle }
        attributionControl={ false }
        onClick={ handleClickMap }
        onMove={ event => setViewState(event.viewState) }
        onMouseMove={ event => {
          const isOnSite = event.features?.some(f => f.layer.id === 'superfund-site-points');
          event.target.getCanvas().style.cursor = isOnSite ? 'pointer' : 'default';
        } }
        onMouseLeave={ event => event.target.getCanvas().style.cursor = 'default' }
        interactiveLayerIds={['superfund-site-points']}
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
      <MapDrawer>
        <ViewStatePanel viewState={ viewState } />
        <SelectedSite site={ selectedSite } />
      </MapDrawer>
    </Box>
  )
}

