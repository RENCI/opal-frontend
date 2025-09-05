import { Divider, Stack, Typography } from '@mui/joy';
import { useExposureForm } from '.';

export const RscValueStep = () => {
  const { rsc } = useExposureForm();

  return (
    <Stack gap={ 2 }>
      <Typography level="h2">Relative Source Contribution</Typography>
      <Divider />

      <Typography>
        Final RSC Value: <Typography variant="soft">{ rsc }%</Typography>.
      </Typography>
    </Stack>
  );
};
