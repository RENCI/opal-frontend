import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Option,
  Select,
  Stack,
  Typography,
} from '@mui/joy';
import { capitalize, mean, median, percentile } from '@util';

import { useExposureForm } from './';

import { TotalIntakeDoseStep } from './step-total-intake-dose';
import { CalculationMethodStep } from './step-calculation-method';

const getValues = (data, analyte, medium) => data
  .filter(d => d.original.medium === medium)
  .map((d) => d.original[`${ analyte }_concentration`])
  .filter(v => v != null && !isNaN(v));

const renderOption = (stat, value) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
      <Typography level="body-md">{ stat }</Typography>
      <Typography
        level="body-sm"
        sx={{
          fontFamily: 'monospace',
          fontSize: '80%',
          textAlign: 'right',
        }}
      >
        { value }
      </Typography>
    </Stack>
  );
};

export const MediumStatisticalOptionSelect = ({ medium, onChange }) => {
  const { analytes, data } = useExposureForm();
  const values = getValues(data, analytes.selected.id, medium);
  const [selected, setSelected] = useState(null);

  const stats = [
    { key: 'average', label: 'Average', value: mean(values) },
    { key: 'median', label: 'Median', value: median(values) },
    { key: '0%', label: '0th percentile', value: percentile(values, 0) },
    { key: '25%', label: '25th percentile', value: percentile(values, 25) },
    { key: '50%', label: '50th percentile', value: percentile(values, 50) },
    { key: '75%', label: '75th percentile', value: percentile(values, 75) },
    { key: '100%', label: '100th percentile', value: percentile(values, 100) },
  ];

  return (
    <Stack direction="column" gap={ 2 } sx={{ flex: 1 }}>
      <Typography level="h3">{ capitalize(medium) }</Typography>

      <Select
        placeholder="Select a statistic"
        value={ selected }
        onChange={ (event, newValue) => {
          setSelected(newValue);
          onChange(newValue);
        }}
        renderValue={ ({ label }) => {
          const [statistic, value] = label.split('\n\n');
          return renderOption(statistic, value);
        } }
      >
        { stats.map(stat => (
          <Option key={ stat.key } value={ stat.key }>
            { renderOption(stat.label, stat.value) }
          </Option>
        )) }
      </Select>
    </Stack>
  );
};

MediumStatisticalOptionSelect.propTypes = {
  medium: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const MediaConcentrationsStep = () => {
  const { analytes, data, media, sufficientSize } = useExposureForm();

  const proceed = useMemo(() => {
    if (media.current.length === 0) { return false; }
    return media.current.every(medium => medium in media.statistics.current)
  }, [media.current, media.statistics.current])

  const handleChange = medium => statistic => {
    const analyte = analytes.selected.id;
    if (!analyte) return;
  
    const values = getValues(data, analyte, medium);

    if (!values.length) return;
  
    let result;
    switch (statistic) {
      case 'average':
        result = mean(values);
        break;
      case 'median':
        result = median(values);
        break;
      case '0%':
        result = percentile(values, 0);
        break;
      case '25%':
        result = percentile(values, 25);
        break;
      case '50%':
        result = percentile(values, 50);
        break;
      case '75%':
        result = percentile(values, 75);
        break;
      case '100%':
        result = percentile(values, 100);
        break;
      default:
        return;
    }
    media.statistics.set(medium, result);
  };

  if (!sufficientSize) {
    return 'nope';
  }


  return (
    <Stack gap={ 2 }>
      <Typography level="h3" textAlign="center">Media Concentrations</Typography>
      <Divider />

      <Typography>
        Choose the statistical measure for each medium.
        This affects how conservative or typical the estimate will be,
        from minimum (e.g., 0th percentile) to maximum (100th percentile),
        or typical measures of central tendency, like the median and mean.
      </Typography>

      <Stack direction="row" gap={ 4 }>
        {
          media.current.map(medium => (
            <MediumStatisticalOptionSelect
              key={ `medium-${ medium }-intake` }
              medium={ medium }
              onChange={ handleChange(medium) }
            />
          ))
        }
      </Stack>

      {
        proceed && (
          <>
            <Divider />
            <TotalIntakeDoseStep />
            <Divider />
            <CalculationMethodStep />
          </>
        )
      }

      <Divider />

    </Stack>
  );
};
