import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Layer, Source } from 'react-map-gl/mapbox';
import { SamplesPopup } from '../popups/samples';
import { recenterOn } from '@util';

export const SampleSitesLayer = ({ data = [], mapRef }) => {
  const [popupInfo, setPopupInfo] = useState(null);

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
          metadata: location,
        },
      };
    }),
  }), [data]);

  // create click handlers
  useEffect(() => {
    const map = mapRef?.current;
    if (!map) return;

    const handleClusterClick = event => {
      // prevent click from reaching map
      event.originalEvent.stopPropagation();
      const feature = event.features?.[0];
      if (!feature) return;
    
      if (feature.layer.id === 'clusters') {
        const clusterId = feature.properties.cluster_id;
        const source = map.getSource('points');
    
        if (source?.getClusterLeaves) {
          source.getClusterLeaves(clusterId, Infinity, 0, (err, leaves) => {
            if (err) {
              console.error('Error fetching cluster leaves:', err);
              return;
            }
    
            // extract sample metadata from leaves
            const samples = leaves.map(f => f.properties.metadata);
    
            recenterOn(map, feature.geometry.coordinates);

            setPopupInfo({
              type: 'cluster',
              coordinates: feature.geometry.coordinates,
              properties: {
                count: samples.length,
                samples,
              },
            });
          });
        }
      }
    };

    const handlePointClick = event => {
      // prevent click from reaching map
      event.originalEvent.stopPropagation();
      const feature = event.features?.[0];
      if (!feature) return;

      if (feature.layer.id === 'unclustered-point') {
        recenterOn(map, feature.geometry.coordinates);
        setPopupInfo({
          type: 'point',
          coordinates: feature.geometry.coordinates,
          properties: JSON.parse(feature.properties.metadata),
        });
      }
    };

    const clearPopup = () => setPopupInfo(null);

    map.on('click', 'clusters', handleClusterClick);
    map.on('click', 'unclustered-point', handlePointClick);
    // map.on('dragstart', clearPopup);
    map.on('zoomstart', clearPopup);
    // map.on('movestart', clearPopup);
    // map.on('click', clearPopup);

    return () => {
      map.off('click', 'clusters', handleClusterClick);
      map.off('click', 'unclustered-point', handlePointClick);
      // map.off('dragstart', clearPopup);
      map.off('zoomstart', clearPopup);
      // map.off('movestart', clearPopup);
      map.off('click', clearPopup);
    };
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
          'circle-radius': 6,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#51bbd6',
        }}
      />
      { popupInfo && <SamplesPopup onClose={ () => setPopupInfo(null) } { ...popupInfo } /> }
    </Source>
  );
};

SampleSitesLayer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  mapRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
};
