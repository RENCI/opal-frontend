import PropTypes from 'prop-types';
import { Card, CardContent, Divider, Stack, Table, Typography } from '@mui/joy';
import { useExposureForm } from './';
import { capitalize } from '@util';

import { RscValueStep } from './step-rsc-value';

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
      <Typography level="h2">Summary & Result</Typography>
      <Divider />

      <Typography>
        We are ready for the final Relative Source Contribution estimate calculation.
        This summary brings together the dataset size, reference dose (RfD), body weight, 
        intake rates, and calculated doses across environmental media. 
        Review these key values and the assumptions entered in the previous steps here. 
        Confirm that these values reflect the conditions you want to evaluate 
        before moving to the final exposure calculation, and view the RSC estimate at the bottom.
      </Typography>

      <Card>
        <CardContent>
          <Typography>
            <Typography fontWeight="bold">Dataset size:</Typography>
            <SummaryValue>{ data.length.toLocaleString() }</SummaryValue>
          </Typography>
          <Typography>
            <Typography fontWeight="bold">PFAS RfD Value:</Typography>
            <SummaryValue>{ rfd.current } mg/kg/day</SummaryValue>
          </Typography>
          <Typography>
            <Typography fontWeight="bold">Average Body Weight &mdash; Target Group:</Typography>
            <SummaryValue>{ avgBodyWeight.current } kg</SummaryValue>
          </Typography>
          <Typography>
            <Typography fontWeight="bold">Below 80% RfD Threshold:</Typography>
            <Typography variant="soft">
              { media.totalIntakeDose < media.rfdThreshold ? 'Yes' : 'No' }
            </Typography>
          </Typography>
          <Typography>
            <Typography fontWeight="bold">Total Intake Dose:</Typography>
            <SummaryValue>{ media.totalIntakeDose }</SummaryValue>
          </Typography>
          
        </CardContent>  
      </Card>

      <Table
        variant="outlined"
        borderAxis="both"
        aria-label="summary table"
      >
        <thead>
          <tr>
            <td>&nbsp;</td>
            <td><Typography textAlign="center">Intake Rate</Typography></td>
            <td><Typography textAlign="center">Concentration</Typography></td>
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
      </Table>

      <Divider />

      <RscValueStep />

    </Stack>
  );
};
