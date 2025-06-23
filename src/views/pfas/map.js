import { useMemo } from 'react';
import PropTypes from 'prop-types';
import Map from 'react-map-gl/mapbox';
import { Layer, Source } from 'react-map-gl/mapbox';
import { Box } from '@mui/joy';
import { usePreferences } from '@context';
import { useLocalStorage } from '@hooks';
import 'mapbox-gl/dist/mapbox-gl.css';
import { usePfas } from '@views/pfas';

//

const token = process.env.MAPBOX_TOKEN;
const centerFitUS = {
  longitude: -98.583,
  latitude: 39.883,
  zoom: 4.75,
};

import {
  Card, Divider, Typography,
} from '@mui/joy'

export const ViewStatePanel = ({ viewState }) => {
  return (
    <Card sx={{
      position: 'absolute',
      bottom: 'calc(204px + var(--joy-spacing))',
      right: 'var(--joy-spacing)',
      zIndex: 9,
      maxWidth: '200px',
      '.MuiTypography-root': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    }}>
      <Typography level="title-sm">View State</Typography>
      <Divider />
      <Typography level="body-sm">
        longitude: { viewState.longitude }
      </Typography>
      <Typography level="body-sm">
        latitude: { viewState.latitude }
      </Typography>
      <Typography level="body-sm">
        zoom: { viewState.zoom }
      </Typography>
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

export const MapView = () => {
  const preferences = usePreferences()
  const { superfundSites } = usePfas();
  const [viewState, setViewState] = useLocalStorage('view-state', centerFitUS)
  const mapStyle = useMemo(() => `mapbox://styles/mapbox/${ preferences.colorMode.current }-v11`, [preferences.colorMode.current]);

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

  return (
    <Box sx={{
      flex: 1,
      overflow: 'hidden',
      position: 'fixed', left: 0, top: 0,
      width: '100vw', height: '100vh',
    }}>
      <Map
        mapboxAccessToken={ token }
        initialViewState={ viewState }
        style={{
          postiion: 'absolute', left: 0, top: 0,
        }}
        mapStyle={ mapStyle }
        attributionControl={ false }
        onMove={ event => setViewState(event.viewState) }
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
      <ViewStatePanel viewState={ viewState } />
    </Box>
  )
}

