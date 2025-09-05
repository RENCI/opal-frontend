import PropTypes from 'prop-types';
import { Divider, Stack, Typography } from '@mui/joy';
import { useExposureForm } from './';
import { capitalize } from '@util';

const SummaryValue = ({ children = <span>&nbsp;</span> }) => {
  return (
    <Typography
      variant="soft"
      textAlign="right"
      fontFamily="monospace"
    >{ children }</Typography>
  );
};

SummaryValue.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
};

export const ResultsStep = () => {
  const { avgBodyWeight, data, media, rfd } = useExposureForm();
  return (
    <Stack gap={ 2 }>
      <Typography level="h2">Summary</Typography>
      <Divider />

      <Typography>
        Review the key values and assumptions entered in the previous steps. 
        This summary brings together the dataset size, reference dose (RfD), body weight, 
        intake rates, and calculated doses across environmental media. 
        Confirm that these values reflect the conditions you want to evaluate 
        before moving to the final exposure calculation.
      </Typography>

      <Typography>
        Dataset size: <Typography variant="soft">{ data.length.toLocaleString() }</Typography>.
      </Typography>
      <Typography>
        PFAS RfD Value: <SummaryValue>{ rfd.current }</SummaryValue>.
      </Typography>
      <Typography>
        Average Body Weight &mdash; Target Group: <SummaryValue>{ avgBodyWeight.current }</SummaryValue>.
      </Typography>
      <Typography>
        Below 80% RfD Threshold:{' '}
        <Typography variant="soft">
          { media.totalIntakeDose < media.rfdThreshold.current ? 'Yes' : 'No' }
        </Typography>.
      </Typography>
      <Typography>
        Total Intake Dose: <Typography variant="soft">{ media.totalIntakeDose }</Typography>.
      </Typography>

      <table style={{ borderSpacing: 'var(--joy-spacing)' }}>
        <thead>
          <tr>
            <td>&nbsp;</td>
            <td><Typography textAlign="center">Intake Rate</Typography></td>
            <td><Typography textAlign="center">Concentrations</Typography></td>
            <td><Typography textAlign="center">Intake Dose</Typography></td>
          </tr>
        </thead>

        <tbody>
          {
            media.current.map(medium => (
              <tr key={ `medium-row-${ medium }`}>
                <td>{ capitalize(medium) }</td>
                <td><SummaryValue>{ media.intakeRates.current[medium] }</SummaryValue></td>
                <td><SummaryValue>{ media.statistics.current[medium] }</SummaryValue></td>
                <td><SummaryValue>{ media.intakeDoses[medium] }</SummaryValue></td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <Typography>
        If any of these values appear incorrect, feel free to go back and adjust them. 
        When satisfied, continue to generate the final exposure estimate.
      </Typography>
    </Stack>
  );
};
