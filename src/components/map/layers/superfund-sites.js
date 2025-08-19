import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Layer, Source, useMap } from 'react-map-gl/mapbox';
import * as turf from '@turf/turf';
import pin from '@images/pin.png';
import './superfund-sites.css';

const loadMapImage = (map, id, url) => {
  return new Promise((resolve, reject) => {
    if (map.hasImage(id)) {
      resolve();
      return;
    }

    map.loadImage(url, (error, image) => {
      if (error) {
        reject(error);
      } else if (!map.hasImage(id)) {
        map.addImage(id, image);
      }
      resolve();
    });
  });
};

export const SuperfundSitesLayer = ({
  superfundSites,
  selectionRadius,
  showSuperfundSiteRings,
}) => {
  if (!superfundSites) { return null; }

  const { current: map } = useMap();

  const siteFeatures = useMemo(() => superfundSites?.features ?? [], [superfundSites]);
  
  const ringFeatures = useMemo(() => {
    console.log('Recalculating GeoJSON with radius', selectionRadius);

    if (!siteFeatures.length) return { type: 'FeatureCollection', features: [] };

    const circles = siteFeatures.map(feature => {
      const [longitude, latitude] = feature.geometry.coordinates;
      const center = turf.point([longitude, latitude]);
      const ring = turf.circle(center, selectionRadius, { units: 'miles', steps: 64 });
      ring.properties = { ...feature.properties }; // include site metadata
      return ring;
    });

    return {
      type: 'FeatureCollection',
      features: circles,
    };
  }, [selectionRadius, siteFeatures]);

  useEffect(() => {
    if (!map) return;

    loadMapImage(map, 'site-pin', pin)
      .then(() => console.log('Pin image loaded and added to map'))
      .catch(error => console.error('Failed to load pin image.', error));
  }, [map]);

  return (
    <>
      {
        showSuperfundSiteRings && (
          <Source id="superfund-rings" type="geojson" data={ ringFeatures }>
            <Layer
              id="superfund-site-rings"
              type="fill"
              paint={{ 'fill-color': 'salmon', 'fill-opacity': 0.05 }}
            />
            <Layer
              id="superfund-site-rings-outline"
              type="line"
              paint={{ 'line-color': 'salmon', 'line-width': 1, 'line-opacity': 0.25 }}
            />
          </Source>
        )
      }
      <Source id="site-pins" type="geojson" data={{
        type: "FeatureCollection",
        features: siteFeatures
      }}>
        <Layer
          id="site-pin-layer"
          type="symbol"
          layout={{
            'icon-image': 'site-pin',
            'icon-size': 0.5,
            'icon-anchor': 'bottom',
            'icon-allow-overlap': true,
          }}
        />
      </Source>
    </>
  );
};

const GeoJSONGeometryProp = PropTypes.shape({
  type: PropTypes.oneOf(['Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon']).isRequired,
  coordinates: PropTypes.any.isRequired, // consider deeper check
});

const GeoJSONFeatureProp = PropTypes.shape({
  type: PropTypes.oneOf(['Feature']).isRequired,
  geometry: GeoJSONGeometryProp.isRequired,
  properties: PropTypes.object, // could be more specific?
});

const GeoJSONFeatureCollectionProp = PropTypes.shape({
  type: PropTypes.oneOf(['FeatureCollection']).isRequired,
  features: PropTypes.arrayOf(GeoJSONFeatureProp).isRequired,
});

SuperfundSitesLayer.propTypes = {
  superfundSites: GeoJSONFeatureCollectionProp,
  selectionRadius: PropTypes.number.isRequired,
  showSuperfundSiteRings: PropTypes.bool.isRequired,
};
