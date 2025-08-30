import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Layer, Source, useMap } from 'react-map-gl/mapbox';
import * as turf from '@turf/turf';
import { loadMapImage, recenterOn } from '@util/map';
import pfasMarker from '@images/pin-red.png';
import noPfasMarker from '@images/pin-blue.png';
import unknownPfasMarker from '@images/pin-grey.png';
import { SuperfundPopup } from '../popups/superfund-sites';

export const SuperfundSitesLayer = ({
  superfundSites,
  selectionRadius,
  showSuperfundSiteRings,
}) => {
  const [popupInfo, setPopupInfo] = useState(null);
  if (!superfundSites) { return null; }

  const { current: map } = useMap();

  const siteFeatures = useMemo(() => superfundSites?.features ?? [], [superfundSites]);

  const ringFeatures = useMemo(() => {
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

    loadMapImage(map, 'site-pin-red', pfasMarker)
      .then(() => console.log('Red pin image loaded and added to map'))
      .catch(error => console.error('Failed to load red pin image.', error));

    loadMapImage(map, 'site-pin-blue', noPfasMarker)
      .then(() => console.log('Blue pin image loaded and added to map'))
      .catch(error => console.error('Failed to load blue pin image.', error));

    loadMapImage(map, 'site-pin-grey', unknownPfasMarker)
      .then(() => console.log('Grey pin image loaded and added to map'))
      .catch(error => console.error('Failed to load grey pin image.', error));
  }, [map]);

  useEffect(() => {
    if (!map) return;

    const handlePinClick = event => {
      // prevent click from reaching map
      event.originalEvent.stopPropagation();
      const feature = event.features?.[0];
      if (!feature) return;

      if (feature.layer.id === 'site-pin-layer') {
        recenterOn(map, feature.geometry.coordinates);

        setPopupInfo({
          coordinates: feature.geometry.coordinates,
          properties: feature.properties,
        });
      }
    };

    const clearPopup = () => setPopupInfo(null);

    map.on('click', 'site-pin-layer', handlePinClick);
    map.on('zoomstart', clearPopup);

    return () => {
      map.off('click', 'site-pin-layer', handlePinClick);
      map.off('zoomstart', clearPopup);
    };
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
            'icon-image': ['get', 'pinIcon'],
            'icon-size': 0.75,
            'icon-anchor': 'bottom',
            'icon-allow-overlap': true,
          }}
        />
      </Source>
      {
        popupInfo && (
          <SuperfundPopup
            onClose={ () => setPopupInfo(null) }
            { ...popupInfo }
          />
        )
      }
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
