import { useExposureForm } from ".";

export const ExposureFormDebugger = () => {
  const {
    steps,
    analytes,
    rfd,
    avgBodyWeight,
    media,
    calculationMethod,
    rsc,
  } = useExposureForm();
  return (
    <pre style={{ fontSize: '75%', overflow: 'auto' }}>{
      JSON.stringify({
        steps: {
          current: steps.current,
        },
        analytes: {
          selected: analytes.selected,
        },
        rfd: rfd.current,
        avgBodyWeight,
        media: {
          current: media.current,
          intakeRates: media.intakeRates.current,
          statistics: media.statistics.current,
          intakeDoses: media.intakeDoses,
          totalIntakeDose: media.totalIntakeDose,
        },
        calculationMethod: calculationMethod.current,
        rsc,
      }, null, 2)
    }</pre>
  );
};
