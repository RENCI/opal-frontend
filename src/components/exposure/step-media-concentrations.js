import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Divider,
  FormControl,
  Stack,
  Typography,
} from '@mui/joy';
import { useExposureForm } from './';
import { capitalize, mean, median, percentile } from '@util';

const StatisticOption = ({ label, value, selected, onClick }) => {
  return (
    <FormControl orientation="horizontal" size="sm">
      <Button variant={ selected ? 'solid' : 'soft' } onClick={ onClick }>{ label }</Button>
      <Typography
        variant="soft"
        sx={{
          flex: 1,
          fontFamily: 'monospace',
          fontSize: '80%',
          textAlign: 'right',
          verticalAlign: 'middle',
          padding: 'var(--joy-spacing)',
        }}
      >{ value }</Typography>
    </FormControl>
  );
};

StatisticOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const getValues = (data, analyte, medium) => {
  return data
    .filter(d => d.original.medium === medium)
    .map((d) => d.original[`${analyte}_concentration`])
    .filter(v => v != null && !isNaN(v) /* && v > 0 */);
}

const MediumStatisticalOptionButtons = ({ medium, onChange }) => {
  const { analytes, data } = useExposureForm();
  const values = getValues(data, analytes.selected.id, medium);
  const [selected, setSelected] = useState(null);

  const handleClick = newValue => {
    setSelected(newValue);
    onChange(newValue);
  };

  return (
    <Stack direction="column" gap={ 2 } sx={{ flex: 1 }}>
      <Typography level="h3">{ capitalize(medium) }</Typography>

      <StatisticOption label="Average" value={ mean(values) } selected={ selected === 'average' } onClick={ () => handleClick('average') } />
      <StatisticOption label="Median" value={ median(values) } selected={ selected === 'median' } onClick={ () => handleClick('median') } />
      <StatisticOption label="0th percentile" value={ percentile(values, 0) } selected={ selected === '0%' } onClick={ () => handleClick('0%') } />
      <StatisticOption label="25th percentile" value={ percentile(values, 25) } selected={ selected === '25%' } onClick={ () => handleClick('25%') } />
      <StatisticOption label="50th percentile" value={ percentile(values, 50) } selected={ selected === '50%' } onClick={ () => handleClick('50%') } />
      <StatisticOption label="75th percentile" value={ percentile(values, 75) } selected={ selected === '75%' } onClick={ () => handleClick('75%') } />
      <StatisticOption label="100th percentile" value={ percentile(values, 100) } selected={ selected === '100%' } onClick={ () => handleClick('100%') } />
    </Stack>
  );
};

MediumStatisticalOptionButtons.propTypes = {
  medium: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const MediaConcentrationsStep = () => {
  const { analytes, data, media } = useExposureForm();

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


  return (
    <Stack gap={ 2 }>
      <Typography level="h2">Media Concentrations</Typography>
      <Divider />

      <Typography>
        Choose the statistical measure for each medium 
        This affects how conservative or typical the estimate will be, from minimum (e.g., 0th percentile) 
        to maximum (100th percentile), or typical values like the median or mean.
      </Typography>

      <Stack direction="row" gap={ 4 }>
        {
          media.current.map(medium => (
            <MediumStatisticalOptionButtons
              key={ `medium-${ medium }-intake` }
              medium={ medium }
              onChange={ handleChange(medium) }
            />
          ))
        }
      </Stack>
    </Stack>
  );
};
