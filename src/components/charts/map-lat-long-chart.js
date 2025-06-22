import PropTypes from 'prop-types';
import Map from 'react-map-gl/mapbox';
import { Layer, Source } from 'react-map-gl/mapbox';
import { usePreferences } from '@context';
import 'mapbox-gl/dist/mapbox-gl.css';

//

const token = process.env.MAPBOX_TOKEN;
const centerFitUS = {
  longitude: -98.583,
  latitude: 39.883,
  zoom: 4,
};

export const MapLatLongChart = ({ data }) => {
  const preferences = usePreferences()

  const locations = data.reduce((acc, d) => {
    const { latitude, longitude, sample_id } = d.original;
    if (latitude && longitude) {
      acc.push({ sample_id, latitude, longitude });
    }
    return acc;
  }, []);

  const geojsonData = {
    type: 'FeatureCollection',
    features: locations.map(location => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude] // Mapbox expects [longitude, latitude]
      },
      properties: {
        name: location.sample_id,
      }
    }))
  };

  return (
    <Map
      mapboxAccessToken={ token }
      initialViewState={ centerFitUS }
      style={{ width: '100%', minHeight: '600px' }}
      mapStyle={ `mapbox://styles/mapbox/${ preferences.colorMode.current }-v11` }
      attributionControl={ false }
    >
      <Source
        id="points"
        type="geojson"
        data={ geojsonData }
        cluster={ true }
        clusterMaxZoom={ 14 }
        clusterRadius={ 50 }
      >
        {/* Layer for clusters */}
        <Layer
          type="circle"
          id="clusters"
          source="points"
          filter={["has", "point_count"]} // Filter to show only clusters
          paint={{
            "circle-color": "#51bbd6",
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20, 100, 30, 750, 40
            ]
          }}
        />
        {/* Layer for cluster counts */}
        <Layer
          type="symbol"
          id="cluster-count"
          source="points"
          filter={["has", "point_count"]}
          layout={{
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
          }}
          paint={{
            "text-color": "#ffffff"
          }}
        />
        {/* Layer for unclustered points */}
        <Layer
          type="circle"
          id="unclustered-point"
          source="points"
          filter={["!", ["has", "point_count"]]} // Filter to show only individual points
          paint={{
            "circle-color": "#11b4da",
            "circle-radius": 8,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
          }}
        />
      </Source>
    </Map>
  )
}

MapLatLongChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
