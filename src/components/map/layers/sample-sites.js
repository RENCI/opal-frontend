import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { Layer, Source } from 'react-map-gl/mapbox';

export const SampleSitesLayer = ({ data = [], mapRef }) => {
  const geojsonData = useMemo(() => ({
    type: 'FeatureCollection',
    features: data.map(location => {
      const coords = [location.longitude, location.latitude];
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coords,
        },
        properties: {
          name: location.sample_id,
        },
      };
    }),
  }), [data]);

  // cluster click handler
  useEffect(() => {
    const map = mapRef?.current;
    if (!map) return;

    const handleClick = event => {
      const feature = event.features?.[0];
      if (!feature) return;

      const { layer, properties, geometry } = feature;

      if (layer.id === 'clusters') {
        const clusterId = properties.cluster_id;
        const source = map.getSource('points');

        if (source && source.getClusterExpansionZoom) {
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
              console.error('Expansion zoom error:', err);
              return;
            }
            map.flyTo({
              center: geometry.coordinates,
              zoom,
              duration: 800
            });
          });
        }
      }
    };

    map.on('click', 'clusters', handleClick);
    return () => map.off('click', 'clusters', handleClick);
  }, [mapRef]);

  return (
    <Source
      id="points"
      type="geojson"
      data={ geojsonData }
      cluster={ true }
      clusterMaxZoom={ 14 }
      clusterRadius={ 50 }
    >
      <Layer
        id="clusters"
        type="circle"
        source="points"
        filter={['has', 'point_count']}
        paint={{
          'circle-color': '#51bbd6',
          'circle-opacity': 0.75,
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20, 100, 30, 750, 40
          ]
        }}
      />
      <Layer
        id="cluster-count"
        type="symbol"
        source="points"
        filter={['has', 'point_count']}
        layout={{
          'text-field': '{point_count_abbreviated}',
          'text-size': 12
        }}
        paint={{
          'text-color': '#222222'
        }}
      />
      <Layer
        id="unclustered-point"
        type="circle"
        source="points"
        filter={['!', ['has', 'point_count']]}
        paint={{
          'circle-color': '#11b4da',
          'circle-radius': 8,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        }}
      />
    </Source>
  );
};

SampleSitesLayer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  mapRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
};
