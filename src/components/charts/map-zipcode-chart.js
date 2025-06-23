import { useRef } from 'react';
import PropTypes from 'prop-types';
import Map from 'react-map-gl/mapbox';
import { Layer, Source } from 'react-map-gl/mapbox';
import { usePreferences } from '@context';
import zipCodesGeoJson from '@data/zip-codes.geojson'
import 'mapbox-gl/dist/mapbox-gl.css';

//

const token = process.env.MAPBOX_TOKEN;
const centerFitUS = {
  longitude: -98.583,
  latitude: 39.883,
  zoom: 4,
};

export const MapZipCodeChart = ({ data }) => {
  const mapRef = useRef();
  const preferences  = usePreferences()

  const samplesByZip = data.reduce((acc, d) => {
    const zip = d.original.zipcode;
    if (zip) {
      if (!acc[zip]) acc[zip] = [];
      acc[zip].push(d);
    }
    return acc;
  }, {});

  console.log(samplesByZip);

  const enrichedZipCodesGeoJson = {
    ...zipCodesGeoJson,
    features: zipCodesGeoJson.features
      .filter(f => samplesByZip[f.properties.zip_code])
      .map(f => ({
        ...f,
        properties: {
          ...f.properties,
          samples: samplesByZip[f.properties.zip_code],
        },
      })),
  };
  return (
    <Map
      ref={ mapRef }
      mapboxAccessToken={ token }
      initialViewState={ centerFitUS }
      style={{ width: '100%', minHeight: '600px' }}
      mapStyle={ `mapbox://styles/mapbox/${ preferences.colorMode.current }-v11` }
      attributionControl={ false }
    >
      <Source
        id="zip-codes"
        type="geojson"
        data={ enrichedZipCodesGeoJson }
        cluster={ true }
        clusterMaxZoom={ 14 }
        clusterRadius={ 50 }
      >
        {/* clusters */}
        <Layer
          id="zip-clusters"
          type="circle"
          filter={['has', 'point_count']}
          paint={{
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              50,
              '#f1f075',
              100,
              '#f28cb1',
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              15,
              50,
              20,
              100,
              25,
            ],
          }}
        />
        {/* cluster labels */}
        <Layer
          id="zip-cluster-count"
          type="symbol"
          filter={['has', 'point_count']}
          layout={{
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
          }}
        />
        {/* individual zip markers */}
        <Layer
          id="zip-point"
          type="circle"
          filter={['!', ['has', 'point_count']]}
          paint={{
            'circle-color': '#11b4da',
            'circle-radius': 5,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff',
          }}
        />
      </Source>
    </Map>
  );
};

MapZipCodeChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
