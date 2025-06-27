import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Layer, Marker, Popup, Source } from 'react-map-gl/mapbox';
import * as turf from '@turf/turf';
import { Pin } from './pin';
import { usePreferences } from '@context';
import './superfund-sites.css';

export const SuperfundSitesLayer = ({
  sites = [],
  sampleSites = [],
  selectedSite = {},
  onClick,
}) => {
  if (!sites) { return null; }
  const preferences = usePreferences();

  const createClickHandler = useCallback(site => event => {
    event.originalEvent.stopPropagation();
    onClick(site);
  }, []);

  const centerAndRings = useMemo(() => {
    if (!selectedSite) return null;

    const center = turf.point([selectedSite.longitude, selectedSite.latitude]);
    const rings = [1, 3, 5].map(miles =>
      turf.circle(center, miles, { units: 'miles', steps: 64 })
    );

    return { center, rings };
  }, [selectedSite]);

  const ringStats = useMemo(() => {
    if (!centerAndRings || !sampleSites.length) return null;

    const { rings } = centerAndRings;

    const sitePoints = turf.featureCollection(
      sampleSites.map(site => turf.point([site.longitude, site.latitude], site))
    );

    const countWithin = polygon => turf.pointsWithinPolygon(sitePoints, polygon).features.length;

    return {
      '1mi': countWithin(rings[0]),
      '3mi': countWithin(rings[1]),
      '5mi': countWithin(rings[2]),
    };
  }, [centerAndRings, sampleSites]);

  const Pins = useCallback(() => sites.map((site, i) => (
    <Marker
      key={ `site-marker-${ i }` }
      longitude={ site.longitude }
      latitude={ site.latitude }
      anchor="bottom"
      onClick={ createClickHandler(site) }
    ><Pin /></Marker>
  )), []);

  const selectionRingsGeoJson = useMemo(() => {
    if (!centerAndRings) return null;

    const { center, rings } = centerAndRings;

    const makeLabel = (miles) => {
      const labelPoint = turf.destination(center, miles, 0, { units: 'miles' });
      return {
        type: 'Feature',
        geometry: labelPoint.geometry,
        properties: {
          label: `${miles} mi`
        }
      };
    };

    const labels = [1, 3, 5].map(makeLabel);

    return {
      type: 'FeatureCollection',
      features: [...rings, ...labels],
    };
  }, [centerAndRings]);

  const ringsPaint = useMemo(() => ({
    'text-color': 'salmon',
    'text-halo-color': preferences.colorMode.light ? 'white' : 'black',
    'text-halo-width': 1,
  }), [preferences.colorMode.light]);

  return (
    <>
      {
        selectionRingsGeoJson && (
          <Source id="superfund-radius" type="geojson" data={selectionRingsGeoJson}>
            <Layer
              id="selected-superfund-site-ring"
              type="fill"
              paint={{ 'fill-outline-color': 'salmon', 'fill-color': 'rgba(255, 140, 105, 0.1)' }}
            />
            <Layer
              id="radius-labels"
              type="symbol"
              filter={['has', 'label']}
              layout={{
                'text-field': ['get', 'label'],
                'text-size': 12,
                'text-offset': [0, 0],
                'text-anchor': 'bottom',
              }}
              paint={ ringsPaint }
            />
          </Source>
        )
      }
      <Pins />
      {
        selectedSite && ringStats && (
          <Popup
            anchor="top-left"
            longitude={ selectedSite.longitude }
            latitude={ selectedSite.latitude }
            closeButton={ false }
            closeOnClick={ false }
          >
            <div>
              <strong>{ selectedSite.name }</strong><br />
              <div>Within 1 mi: { ringStats['1mi'] }</div>
              <div>Within 3 mi: { ringStats['3mi'] }</div>
              <div>Within 5 mi: { ringStats['5mi'] }</div>
            </div>
          </Popup>
        )
      }
    </>
  );
};

SuperfundSitesLayer.propTypes = {
  sites: PropTypes.array.isRequired,
  sampleSites: PropTypes.array.isRequired,
  selectedSite: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};