import { Fragment, useState } from 'react';
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
import { useToggleState } from '@hooks';
import { MediumIcon } from '@components/medium-icon';
import { PointBrowserTabs } from '../sample-point';

const countByProperty = (array = [], key) =>
  array.reduce((acc, item) => {
    const val = item[key];
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

const summarizeSamples = samples => {
  // group by pi > study > medium
  const summary = {};

  for (const s of samples) {
    if (!summary[s.pi]) summary[s.pi] = {};
    if (!summary[s.pi][s.study]) summary[s.pi][s.study] = {};
    if (!summary[s.pi][s.study][s.medium]) {
      summary[s.pi][s.study][s.medium] = { samples: 0, sites: new Set() };
    }

    summary[s.pi][s.study][s.medium].samples += 1;
    if (s.site_id) summary[s.pi][s.study][s.medium].sites.add(s.site_id);
  }

  // convert, find counts
  return Object.entries(summary).map(([pi, studies]) => ({
    pi,
    studies: Object.entries(studies).flatMap(([study, media]) =>
      Object.entries(media).map(([medium, { samples, sites }]) => ({
        study,
        medium,
        samples,
        siteCount: sites.size,
      }))
    ),
  }));
}

const FlexDots = () => <span style={{
  flex: 1,
  height: '1px',
  marginTop: '10px',
  background: 'repeating-linear-gradient(to right, transparent 0px, transparent 4px, var(--joy-palette-text-tertiary) 4px, var(--joy-palette-text-tertiary) 5px)',
}}>&nbsp;</span>

export const ClusterBrowser = ({ samples = [] }) => {
  const combinedView = useToggleState(false);

  const [index, setIndex] = useState(0);

  const samplesCount = samples.length;
  const summary = summarizeSamples(samples);
  const media = countByProperty(samples, 'medium');

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
          <>
            <Divider />
            <Stack py={ 2 }>
              <Stack direction="row" justifyContent="space-between" px={ 2 }>
                <Typography level="title-md">{ `${ samplesCount } samples` }</Typography>
                <span>
                  {Object.keys(media).map(medium => (
                    <MediumIcon key={ `summary-medium-${ medium }`} medium={ medium } />
                  ))}
                </span>
              </Stack>
              <Divider />
              {
                summary.map(({ pi, studies }) => (
                  <Fragment key={ pi }>
                    <Typography level="title-md" p={ 2 }>{ pi }</Typography>
                    {studies.map(({ study, medium, samples, siteCount }) => (
                      <Stack
                        key={ `${ study }-${ medium }` }
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={ 1 }
                        px={ 2 }
                      >
                        <Typography
                          level="title-sm"
                          startDecorator={
                            <MediumIcon medium={ medium } sx={{ fontSize: '1.5rem', alignSelf: 'center', flex: '0 1 16px' }} />
                          }
                        ><strong>{ study }</strong></Typography>
                        <FlexDots />
                        <Typography level="body-sm">
                          { samples } samples / { siteCount } site{ siteCount !== 1 && 's' }
                        </Typography>
                      </Stack>
                    ))}
                  </Fragment>
                ))
              }
            </Stack>
          </>
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
