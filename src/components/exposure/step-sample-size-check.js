import { useEffect, useState } from 'react';
import {
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/joy';
import { useExposureForm } from '.';

export const SampleSizeCheckStep = () => {
  const { data, steps } = useExposureForm();
  const [checking, setChecking] = useState(true);
  const [validity, setValidity] = useState(null);

  useEffect(() => {
    setChecking(true);
    const timer = setTimeout(() => {
      setChecking(false);
      setValidity(data.length >= 248)
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!validity) {
      return;
    }
    steps.set(steps.current + 1);
  }, [validity]);

  return (
    <Stack direction="column" spacing={ 2 }>
      <Typography level="h2">Dataset Size Validation</Typography>
      <Divider />

      <Typography>
        A valid sample size has size 248 or larger.
      </Typography>

      <Stack justifyContent="center" alignItems="center" height="200px" sx={{ margin: '5rem auto' }}>
        {
          checking === true
          ? <CircularProgress />
          : (
            <Typography>
              The current dataset has size { data.length } { validity ? '≥' : '<' } 248,
              therefore this dataset is { validity ? 'acceptable. 👍' : 'not acceptable. 👎' }
            </Typography>
          )
        }
        {
/*          !checking && !validity && (
            <Typography>
              Are there sufficient data, physical/chemical property information, fate and
              transport information, and/or generalized information available to characterize
              the likelihood of exposure to relevant sources?
            </Typography>
          )
*/        }
      </Stack>
    </Stack>
  );
};
