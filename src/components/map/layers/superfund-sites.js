import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Layer, Marker, Popup, Source } from 'react-map-gl/mapbox';
import * as turf from '@turf/turf';
import { Pin } from './pin';

const ring = (center, radius) => turf.circle(center, radius, { units: 'miles', steps: 64 });

export const SuperfundSitesLayer = ({
  sites = [],
  sampleSites = [],
  selectedSite = {},
  onClick,
}) => {
  if (!sites) { return null; }

  const createClickHandler = useCallback(site => event => {
    event.originalEvent.stopPropagation();
    onClick(site);
  }, []);

  const ringStats = useMemo(() => {
    if (!selectedSite || !sampleSites.length) return null;

    const center = turf.point([selectedSite.longitude, selectedSite.latitude]);

    const ring1 = turf.circle(center, 1, { units: 'miles' });
    const ring3 = turf.circle(center, 3, { units: 'miles' });
    const ring5 = turf.circle(center, 5, { units: 'miles' });

    const sitePoints = sampleSites.filter(s => s.latitude && s.longitude).map(site =>
      turf.point([site.longitude, site.latitude], site)
    );

    const countIn = (polygon) =>
      sitePoints.filter(pt => turf.booleanPointInPolygon(pt, polygon)).length;

    return {
      '1mi': countIn(ring1),
      '3mi': countIn(ring3),
      '5mi': countIn(ring5),
    };
  }, [selectedSite, sampleSites]);

  const pins = useMemo(() => sites.map((site, i) => (
    <Marker
      key={ `site-marker-${ i }` }
      longitude={ site.longitude }
      latitude={ site.latitude }
      anchor="bottom"
      onClick={ createClickHandler(site) }
    ><Pin /></Marker>
  )), []);

  const selectionRingsGeoJson = useMemo(() => {
    if (!selectedSite) return null;

    const center = turf.point([selectedSite.longitude, selectedSite.latitude]);
    const circle1 = ring(center, 1);
    const circle3 = ring(center, 3);
    const circle5 = ring(center, 5);

    const makeLabel = (miles) => {
      const bearing = 0; // due north
      const labelPoint = turf.destination(center, miles, bearing, { units: 'miles' });
      return {
        type: 'Feature',
        geometry: labelPoint.geometry,
        properties: {
          label: `${miles} mi`
        }
      };
    };

    const label1 = makeLabel(1);
    const label3 = makeLabel(3);
    const label5 = makeLabel(5);

    return {
      type: 'FeatureCollection',
      features: [
        circle1, circle3, circle5,
        label1, label3, label5,
      ],
    };
  }, [selectedSite]);

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
              paint={{
                'text-color': 'crimson',
                'text-halo-color': 'white',
                'text-halo-width': 1
              }}
            />
          </Source>
        )
      }
      { pins }
      {
        selectedSite && ringStats && (
          <Popup
            anchor="top"
            longitude={ selectedSite.longitude }
            latitude={ selectedSite.latitude }
            closeButton={ false }
            closeOnClick={ false }
          >
            <div>
              <strong>{selectedSite.name}</strong><br />
              <div>Within 1 mi: {ringStats['1mi']}</div>
              <div>Within 3 mi: {ringStats['3mi']}</div>
              <div>Within 5 mi: {ringStats['5mi']}</div>
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