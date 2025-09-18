import { useMemo } from 'react';
import { useExposureForm } from './';
import {
  Button,
} from '@mui/joy';
import {
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
} from '@mui/icons-material';

export const PaginationButtons = () => {
  const { calculationMethod, media, steps } = useExposureForm();

  const disableNext = useMemo(() => {
    return !steps.all?.[steps.current]?.nextIf({ calculationMethod, media });
  }, [calculationMethod.current, media.current, steps.current]);

  return (
    <>
      <Button
        disabled={ steps.current === 0 }
        onClick={ () => steps.set(prev => Math.max(0, prev - 1)) }
        startDecorator={ <PrevIcon /> } 
      >Prev</Button>
      <Button
        disabled={ disableNext }
        onClick={ () => steps.set(prev => Math.min(prev + 1, steps.all.length)) }
        endDecorator={ <NextIcon /> } 
      >Next</Button>
    </>
  );
};
