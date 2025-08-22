import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Layer, Popup, Source } from 'react-map-gl/mapbox';

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

  // cluster click handler
  useEffect(() => {
    const map = mapRef?.current;
    if (!map) return;

    const handleClusterClick = event => {
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
    
            // Extract sample metadata from leaves
            const samples = leaves.map(f => f.properties.metadata);
    
            // Aggregate however you want:
            const analytes = [...new Set(samples.map(s => s.analyte))];
            const concentrationRange = [
              Math.min(...samples.map(s => s.concentration)),
              Math.max(...samples.map(s => s.concentration)),
            ];
    
            setPopupInfo({
              type: 'cluster',
              coordinates: feature.geometry.coordinates,
              properties: {
                count: samples.length,
                analytes,
                concentrationRange,
                samples,
              },
            });
          });
        }
      }
    };

    const handlePointClick = event => {
      const feature = event.features?.[0];
      if (!feature) return;

      if (feature.layer.id === 'unclustered-point') {
        setPopupInfo({
          type: 'sample',
          coordinates: feature.geometry.coordinates,
          properties: feature.properties.metadata,
        });
      }
    };

    const clearPopup = () => setPopupInfo(null);

    map.on('click', 'clusters', handleClusterClick);
    map.on('click', 'unclustered-point', handlePointClick);
    map.on('dragstart', clearPopup);
    map.on('zoomstart', clearPopup);
    map.on('movestart', clearPopup);

    return () => {
      map.off('click', 'clusters', handleClusterClick);
      map.off('click', 'unclustered-point', handlePointClick);
      map.off('dragstart', clearPopup);
      map.off('zoomstart', clearPopup);
      map.off('movestart', clearPopup);
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
          'circle-radius': 8,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        }}
      />
      {popupInfo && (
        <Popup
          longitude={popupInfo.coordinates[0]}
          latitude={popupInfo.coordinates[1]}
          anchor="top"
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <div className="text-sm">
            {popupInfo.type === 'cluster' && (
              <>
                <strong>{popupInfo.properties.count} samples</strong>
                <br />
                Analytes: {popupInfo.properties.analytes.join(', ')}
                <br />
                Concentration range: {popupInfo.properties.concentrationRange[0]} – {popupInfo.properties.concentrationRange[1]}
              </>
            )}

            {popupInfo.type === 'sample' && (
              <>
                <strong>Sample {popupInfo.properties.sample_id}</strong>
                <br />
                Analyte: {popupInfo.properties.analyte}
                <br />
                Concentration: {popupInfo.properties.concentration}
              </>
            )}
          </div>
        </Popup>
      )}
    </Source>
  );
};

SampleSitesLayer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  mapRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
};
