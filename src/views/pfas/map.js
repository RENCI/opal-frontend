import { useMemo } from 'react';
import Map from 'react-map-gl/mapbox';
import { Box } from '@mui/joy';
// import { Layer, Source } from 'react-map-gl/mapbox';
import { usePreferences } from '@context';
import 'mapbox-gl/dist/mapbox-gl.css';

//

const token = process.env.MAPBOX_TOKEN;
const centerFitUS = {
  longitude: -98.583,
  latitude: 39.883,
  zoom: 4.75,
};

export const MapView = () => {
  const preferences = usePreferences()
  const mapStyle = useMemo(() => `mapbox://styles/mapbox/${ preferences.colorMode.current }-v11`, [preferences.colorMode.current]);

  return (
    <Box sx={{
      flex: 1,
      overflow: 'hidden',
      position: 'fixed', left: 0, top: 0,
      width: '100vw', height: '100vh',
    }}>
      <Map
        mapboxAccessToken={ token }
        initialViewState={ centerFitUS }
        style={{
          postiion: 'absolute', left: 0, top: 0,
        }}
        mapStyle={ mapStyle }
        attributionControl={ false }
      >
      </Map>
    </Box>
  )
}

