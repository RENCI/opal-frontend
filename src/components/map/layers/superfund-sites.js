import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Layer, Marker, Popup, Source } from 'react-map-gl/mapbox';
import * as turf from '@turf/turf';
import { Pin } from './pin';
import { usePreferences } from '@context';
import './superfund-sites.css';

export const SuperfundSitesLayer = ({
  superfundSites = [],
  sampleSites = [],
  selectedSuperfundSite = {},
  onClick,
  selectionRadius,
}) => {
  if (!superfundSites) { return null; }
  const preferences = usePreferences();

  const createClickHandler = useCallback(site => event => {
    event.originalEvent.stopPropagation();
    onClick(site);
  }, []);

  const centerAndRings = useMemo(() => {
    if (!selectedSuperfundSite) return null;

    const center = turf.point([selectedSuperfundSite.longitude, selectedSuperfundSite.latitude]);
    const ring = turf.circle(center, selectionRadius, { units: 'miles', steps: 64 });

    return { center, ring };
  }, [selectedSuperfundSite, selectionRadius]);

  const ringStats = useMemo(() => {
    if (!centerAndRings || !sampleSites.length) return null;

    const { ring } = centerAndRings;

    const sitePoints = turf.featureCollection(
      sampleSites.map(site => turf.point([site.longitude, site.latitude], site))
    );

    const countWithin = polygon => turf.pointsWithinPolygon(sitePoints, polygon).features.length;

    return countWithin(ring);
  }, [centerAndRings, sampleSites]);

  const Pins = useCallback(() => superfundSites.map((site, i) => (
    <Marker
      key={ `site-marker-${ i }` }
      longitude={ site.longitude }
      latitude={ site.latitude }
      anchor="bottom"
      onClick={ createClickHandler(site) }
    ><Pin /></Marker>
  )), []);

  const selectionRingGeojson = useMemo(() => {
    if (!centerAndRings) return null;

    const { center, ring } = centerAndRings;

    const makeLabel = miles => {
      const labelPoint = turf.destination(center, miles, 0, { units: 'miles' });
      return {
        type: 'Feature',
        geometry: labelPoint.geometry,
        properties: {
          label: `${miles} mi`,
        },
      };
    };

    const label = makeLabel(selectionRadius);

    return {
      type: 'FeatureCollection',
      features: [ring, label],
    };
  }, [centerAndRings]);

  const ringPaint = useMemo(() => ({
    'text-color': 'salmon',
    'text-halo-color': preferences.colorMode.light ? 'white' : 'black',
    'text-halo-width': 1,
  }), [preferences.colorMode.light]);

  return (
    <>
      {
        selectionRingGeojson && (
          <Source id="superfund-radius" type="geojson" data={ selectionRingGeojson }>
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
              paint={ ringPaint }
            />
          </Source>
        )
      }
      <Pins />
      {
        selectedSuperfundSite && ringStats && (
          <Popup
            anchor="top-left"
            longitude={ selectedSuperfundSite.longitude }
            latitude={ selectedSuperfundSite.latitude }
            closeButton={ false }
            closeOnClick={ false }
          >
            <div>
              <strong>{ selectedSuperfundSite.name }</strong><br />
              <div>Within { selectionRadius } miles: { ringStats }</div>
            </div>
          </Popup>
        )
      }
    </>
  );
};

SuperfundSitesLayer.propTypes = {
  onClick: PropTypes.func.isRequired,
  superfundSites: PropTypes.array.isRequired,
  sampleSites: PropTypes.array.isRequired,
  selectedSuperfundSite: PropTypes.object,
  selectionRadius: PropTypes.number.isRequired,
};