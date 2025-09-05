import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Step,
  StepButton,
  StepIndicator,
  Stepper,
  Typography,
} from '@mui/joy';
import {
  Check as CompleteIcon,
} from '@mui/icons-material';
import { analytes } from '@data';
import { clamp } from '@util';
import { PaginationButtons } from './pagination';

import { ExposureFormDebugger } from './debugger';

import { AnalyteSelectStep } from './step-analyte-select';
import { ReferenceDoseStep } from './step-rfd';
import { IntakeRatesStep } from './step-intake-rates';
import { SampleSizeCheckStep } from './step-sample-size-check';
import { MediaConcentrationsStep } from './step-media-concentrations';
import { TotalIntakeDoseStep } from './step-total-intake-dose';
import { CalculationMethodStep } from './step-calculation-method';
import { ResultsStep } from './step-summary-and-result';
import { RscValueStep } from './step-rsc-value';

const DEBUG_MODE = false;

const steps = [
  { id: 'analyte-select',       label: 'Analyte Selection',             content: <AnalyteSelectStep /> },
  { id: 'rfd',                  label: 'Reference Dose',                content: <ReferenceDoseStep /> },
  { id: 'intake-rates',         label: 'Intake Rates',                  content: <IntakeRatesStep /> },
  { id: 'data-size-check',      label: 'Sample Size Check',             content: <SampleSizeCheckStep /> },
  { id: 'media',                label: 'Media Concentrations',          content: <MediaConcentrationsStep /> },
  { id: 'dose',                 label: 'Total Intake Dose',             content: <TotalIntakeDoseStep /> },
  { id: 'calculation-method',   label: 'Relevant Regulatory Actions',   content: <CalculationMethodStep /> },
  { id: 'summary',              label: 'Summary',                       content: <ResultsStep /> },
  { id: 'rsc',                  label: 'RSC Value',                     content: <RscValueStep /> },
];

const ExposureFormContext = createContext({ });

export const useExposureForm = () => useContext(ExposureFormContext);

export const ExposureForm = ({ data = [] }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [selectedAnalyteId, setSelectedAnalyteId] = useState(analytes[0].id);

  const selectedAnalyte = useMemo(() => {
    return analytes.find(a => a.id === selectedAnalyteId);
  }, [selectedAnalyteId]);

  const selectedAnalyteMedia = useMemo(() => {
    if (!selectedAnalyteId) { return []; }
    const media = data.reduce((acc, row) => {
      acc.add(row.original.medium);
      return acc;
    }, new Set());
    return [...media];
  }, [data, selectedAnalyteId]);

  const [rfd, setRfd] = useState(0.05);
  const [avgBodyWeight, setAvgBodyWeight] = useState(70);

  const [mediumIntakeRates, setMediumIntakeRates] = useState({
    blood: 1.2,
    dust: 0.02,
    water: 2,
  });
  const setMediumIntakeRate = (medium, newValue) => setMediumIntakeRates(prev => ({ ...prev, [medium]: newValue }));

  const [mediumStatistics, setMediumStatistics] = useState({ });
  const setMediumStatistic = (medium, newValue) => setMediumStatistics(prev => ({ ...prev, [medium]: newValue }));

  const mediumIntakeDoses = useMemo(() => selectedAnalyteMedia
    .reduce((acc, medium) => {
      acc[medium] = mediumIntakeRates[medium] * mediumStatistics[medium] / avgBodyWeight;
      return acc;
    }, {}), [mediumIntakeRates, mediumStatistics, avgBodyWeight]);

  const totalIntakeDose = useMemo(() => {
    return Object.keys(mediumIntakeDoses).reduce((acc, medium) => acc + mediumIntakeDoses[medium], 0);
  }, [mediumIntakeDoses]);
  const rfdThreshold = useMemo(() => 0.8 * rfd, [rfd]);

  const [calculationMethod, setCalculationMethod] = useState(null);

  const rscValue = useMemo(() => {
    if (!mediumIntakeDoses || !totalIntakeDose || !calculationMethod) {
      return null;
    }
    let value;
    if (calculationMethod === 'percentage') {
      value = 100 * mediumIntakeDoses['water'] / totalIntakeDose
    }
    if (calculationMethod === 'subtraction') {
      value = 100 * (rfd - totalIntakeDose + mediumIntakeDoses['water']) / rfd;
    }
    return clamp(20, value, 80);
  }, [mediumIntakeDoses, totalIntakeDose, calculationMethod]);

  return (
    <ExposureFormContext.Provider value={{
      data,
      steps: {
        all: steps,
        current: currentStep,
        set: setCurrentStep,
      },
      analytes: {
        all: analytes,
        selected: selectedAnalyte,
        set: setSelectedAnalyteId,
      },
      rfd: {
        current: rfd,
        set: setRfd,
      },
      media: {
        current: selectedAnalyteMedia,
        intakeRates: {
          current: mediumIntakeRates,
          set: setMediumIntakeRate,
        },
        intakeDoses: mediumIntakeDoses,
        statistics: {
          current: mediumStatistics,
          set: setMediumStatistic,
        },
        totalIntakeDose,
        rfdThreshold,
      },
      calculationMethod: {
        current: calculationMethod,
        set: setCalculationMethod,
      },
      avgBodyWeight: { current: avgBodyWeight, set: setAvgBodyWeight },
      rsc: rscValue,
    }}>
      <Typography level="h1" textAlign="center">PFAS Exposure Calculator</Typography>
      <Divider />
      <Stepper sx={{ width: '100%', margin: 'calc(3 * var(--joy-spacing)) 0' }}>
        {
          steps.map((step, i) => (
            <Step
              key={ step.id }
              orientation="vertical"
              active={ currentStep == i }
              indicator={
                <StepIndicator
                  variant={ currentStep <= i ? 'solid' : 'outlined' }
                  color={ currentStep < i ? 'neutral' : 'primary' }
                >{ currentStep <= i ? i + 1 : <CompleteIcon /> }</StepIndicator>
              }
            ><StepButton onClick={ () => setCurrentStep(i) }>{ step.label }</StepButton></Step>
          ))
        }
      </Stepper>
      <Stack direction="row" gap={ 2 }>
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ minHeight: '500px' }}>
            { steps[currentStep].content }
          </CardContent>
          <CardActions sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--joy-spacing)',
          }}>
            <PaginationButtons />
          </CardActions>
        </Card>
        {
          DEBUG_MODE && (
            <Card variant="soft" sx={{ flex: 1 }}>
              <ExposureFormDebugger />
            </Card>
          )
        }
      </Stack>
    </ExposureFormContext.Provider>
  );
}

ExposureForm.propTypes = {
  data: PropTypes.array.isRequired,
};
