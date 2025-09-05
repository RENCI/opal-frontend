import { useMemo } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Stack,
  Typography,
} from '@mui/joy';
import { PfasSelect } from './pfas-select';
import { useExposureForm } from '.';
import { capitalize } from '@util';
import { MediumIcon } from '@components/medium-icon';

export const AnalyteSelectStep = () => {
  const { data, media, analytes } = useExposureForm();

  const disabledAnalytes = useMemo(() => {
    const analyteIds = analytes.all.map(a => a.id);
    const disabledIds = analyteIds.reduce((acc, id) => {
      if (data.some(row => row.getValue(`${ id }_concentration`) > 0)) {
        acc.delete(id);
      }
      return acc;
    }, new Set(analyteIds));
    return [...disabledIds];
  }, [data, analytes.all]);

  return (
    <Stack direction="column" spacing={ 2 }>
      <Typography level="h2">Select an Analyte</Typography>
      <Divider />
      
      <Typography>
        This form calculates potential human exposure to a selected PFAS chemical,
        using the data you&quot;ve already filtered in the table view. You&quot;ll be asked
        to provide reference dose values, intake rates for different environmental media, and
        choose how exposure patterns should be represented in the exposure calculation.

        Your inputs will support a tailored exposure estimate based on the currently selected PFAS samples.
      </Typography>

      <Stack direction="row" justifyContent="center" my={ 4 }>
        <PfasSelect
          value={ analytes.selected.id }
          onChange={ id => analytes.set(id) }
          disabledAnalytes={ disabledAnalytes }
          helpText="Choose the PFAS compound to use in the exposure calculation."
        />
      </Stack>

      <Typography>
        Media with detected <strong>{ analytes.selected.name }</strong> in the current dataset:
      </Typography>
      
      <List>{
        media.current.sort().map(medium => (
          <ListItem key={ `selected-analytes-media-${ medium }` }>
            <ListItemDecorator><MediumIcon medium={ medium } /></ListItemDecorator>
            <ListItemContent>{ capitalize(medium) }</ListItemContent>
          </ListItem>
        ))
      }</List>
    </Stack>
  );
};
