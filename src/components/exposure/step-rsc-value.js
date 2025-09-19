import { Card, CardContent, Divider, Typography } from '@mui/joy';
import { useExposureForm } from '.';

export const RscValueStep = () => {
  const { rsc } = useExposureForm();

  return (
    <Card>
      <CardContent>
        <Typography level="h3" textAlign="center">
          Final RSC Value: <Typography variant="soft">{ rsc }%</Typography>
        </Typography>

        <Divider />

        <Typography>
          If any of these values appear incorrect, feel free to go back and adjust them
          to recalculate the final exposure estimate.
        </Typography>
      </CardContent>
    </Card>
  );
};
