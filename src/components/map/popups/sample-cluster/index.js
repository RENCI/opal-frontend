import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/joy';
import {
  ChevronLeft as PreviousSampleIcon,
  ChevronRight as NextSampleIcon,
} from '@mui/icons-material';
import * as turf from '@turf/turf';
import { useToggleState } from '@hooks';
import { MediumIcon } from '@components/medium-icon';
import { Detail } from '@components/detail';
import { PointBrowserTabs } from '../sample-point';

const countByProperty = (array = [], key) =>
  array.reduce((acc, item) => {
    const val = item[key];
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

const Collection = ({ arr, property }) => {
  const buckets = useMemo(() => countByProperty(arr, property), [arr, property])
  return (
    <Stack sx={{ maxHeight: '100px', overflowY: 'auto' }}>
      {Object.keys(buckets).map(key => (
        <Detail
          key={ `collection-${ key }` }
          label={ key }
          value={ buckets[key] }
        />
      ))}
    </Stack>
  );
};

Collection.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.object).isRequired,
  property: PropTypes.string.isRequired,
};

export const getSuperfundSitesNearSampleCluster = (cluster, locations, units = 'miles') => {
  console.log({ cluster, locations, units })
  if (!cluster?.length || !locations?.length) {
    return turf.featureCollection([]);
  }

  // find cluster centroid
  const centroid = turf.center(turf.polygon(cluster.map(({ latitude, longitude }) => turf.point([longitude, latitude]))));
  console.log({ centroid })

  // find max distance from centroid to any sample in cluster
  let maxDist = 0;
  for (const pt of cluster.features) {
    const dist = turf.distance(centroid, pt, { units });
    if (dist > maxDist) maxDist = dist;
  }

  // reach out around centroid with radius of maxDist * 2
  const buffer = turf.buffer(centroid, 2 * maxDist, { units });

  // return all Superfund sites within that buffer
  return turf.pointsWithinPolygon(locations, buffer);
}

export const ClusterBrowser = ({ samples = [] }) => {
  const combinedView = useToggleState(false);

  const [index, setIndex] = useState(0);

  const samplesCount = samples.length;

  const handeClickPrev = () => setIndex(prev => (prev - 1 + samplesCount) % samplesCount)
  const handeClickNext = () => setIndex(prev => (prev + 1) % samplesCount)

  return (
    <>
      <ButtonGroup variant="plain" size="sm">
        <Button
          color={ combinedView.enabled ? 'neutral' : 'primary' }
          onClick={ combinedView.unset }
          sx={{ fontWeight: 'normal' }}
        >Individual</Button>
        <Button
          color={ combinedView.enabled ? 'primary' : 'neutral' }
          onClick={ combinedView.set }
          sx={{ fontWeight: 'normal' }}
        >Combined</Button>
      </ButtonGroup>
      {
        combinedView.enabled ? (
          <Stack p={ 1 } gap={ 1 } minHeight="400px">
            <Typography level="title-md">
              Cluster: { samplesCount } samples
            </Typography>
            <Divider />

            <Typography level="title-sm">Media</Typography>
            <Collection arr={ samples } property="medium" />
            <Divider />

            <Typography level="title-sm">Units</Typography>
            <Collection arr={ samples } property="units" />
            <Divider />

            <Typography level="title-sm">Site IDs</Typography>
            <Collection arr={ samples } property="site_id" />
            <Divider />

            <Typography level="title-sm">PIs</Typography>
            <Collection arr={ samples } property="pi" />
            <Divider />

            <Typography level="title-sm">Studies</Typography>
            <Collection arr={ samples } property="study" />
            <Divider />

          </Stack>
        ) : (
          <>
            <Stack
              direction="row"
              bgcolor="primary.softBg"
              minWidth="100%"
              maxWidth="100%"
              sx={{ margin: '0 0 var(--joy-spacing) 0' }}
            >
              <IconButton onClick={ handeClickPrev } color="primary" size="sm" variant="soft"><PreviousSampleIcon /></IconButton>
              <Stack direction="row" gap="var(--joy-spacing)" sx={{ flex: 1 }}>
                <MediumIcon
                  medium={ samples[index].medium }
                  sx={{ fontSize: '2rem', alignSelf: 'center', flex: '0 1 24px' }}
                />
                <Stack>
                  <Typography level="title-xs" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Sample { index + 1 } of { samplesCount }</Typography>
                  <Typography level="title-xs" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>ID: { samples[index].sample_id }</Typography>
                </Stack>
              </Stack>
              <IconButton onClick={ handeClickNext } color="primary" size="sm" variant="soft"><NextSampleIcon /></IconButton>
            </Stack>
            
            <Divider />
            
            <PointBrowserTabs properties={ samples[index] } />
          </>
        )
      }
    </>
  );
};

ClusterBrowser.propTypes = {
  samples: PropTypes.array.isRequired,
};
