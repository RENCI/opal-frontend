import { Fragment } from 'react';
import {
  Box,
  Divider,
  Typography,
} from '@mui/joy';
import { Link } from '@components/link';
import { Latex } from '@components/latex';
import { IndicatorBox } from './correlation-indicator-box';
import { useCompare } from '@views/pfas/compare';

export const Instructions = () => {
  const { correlationCoefficient } = useCompare();

  return (
    <Fragment>
      <Typography component="h2" level="h4">Instructions</Typography>

      <Divider />

      <Typography level="body-sm" my={ 1 }>
        Choose a pair of analytes for comparison. Select analytes using the
        select boxes above or by clicking a cell in the grid.
      </Typography>
      <Typography level="body-sm" my={ 1 }>
        Each cell corresponds to a pair of analytes.
        The non-diagonal cells contains a square describing the samples
        in which the corresponding analytes are detected.
        The number of such samples determines the <em>size</em> of the square.
        The strength of the correlation<sup>*</sup> between those two analytes
        determines the square&apos;s <em>opacity</em>.
      </Typography>

      <Box sx={{
        margin: '0 auto',
        display: 'grid',
        gridTemplateRows: `repeat(2, 25px)`,
        gridTemplateColumns: `150px repeat(10, 25px) 150px`,
        filter: 'saturate(0.5)',
        alignItems: 'center',
        gap: 0.5,
      }}>
        <Typography level="body-xs" textAlign="right" sx={{ pr: 0.5 }}>No samples</Typography>
        {
          [...Array(10).keys()].map(i => (
            <Box key={ `box-size-${ i }` } sx={{
              aspectRatio: '1 / 1',
              border: '1px solid var(--joy-palette-primary-outlinedBorder)',
              height: '25px',
              width: '25px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <IndicatorBox size={ 0.1 * (i + 1) } alpha={ 0.5 } />
            </Box>
          ))
        }
        <Typography level="body-xs" textAlign="left" sx={{ pl: 0.5 }}>All samples</Typography>
        <Typography level="body-xs" textAlign="right" sx={{ pr: 0.5 }}>
          { correlationCoefficient.current === 'pearson' ? <Latex>r = 0</Latex> : <Latex>\rho = 0</Latex> }
        </Typography>
        {
          [...Array(10).keys()].map(i => (
            <Box key={ `box-alpha-${ i }` } sx={{
              aspectRatio: '1 / 1',
              border: '1px solid var(--joy-palette-primary-outlinedBorder)',
              height: '25px',
              width: '25px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <IndicatorBox size={ 0.8 } alpha={ 0.1 * (i + 1) } />
            </Box>
          ))
        }
        <Typography level="body-xs" textAlign="left" sx={{ pl: 0.5 }}>
          { correlationCoefficient.current === 'pearson' ? <Latex>r = 1</Latex> : <Latex>\rho = 1</Latex> }
        </Typography>
      </Box>

      <Typography level="body-sm" my={ 1 }>
        Selecting a non-diagonal cell presents details about the respective analytes, including a scatterplot.
        Selecting a diagonal cell presents a sense of the distribution for that analyte.
      </Typography>

      <Typography level="body-sm" my={ 1 }>
        The visualizations here make use of all the currently filtered data,
        and some of that data may have different units, rendering this visualization essentially useless.
        Therefore the user is urged to use caution when making conclusions based on these graphics alone.
      </Typography>

      <Divider />

      {
        correlationCoefficient.current === 'pearson' && (
          <Typography variant="caption" level="body-xs" my={ 2 }>
            * This is correlation in terms of <Link
            to="https://en.wikipedia.org/wiki/Pearson_correlation_coefficient">Pearson&apos;s
            correlation coefficient <Latex>r</Latex></Link>.
          </Typography>
        )
      }

      {
        correlationCoefficient.current === 'spearman' && (
          <Typography variant="caption" level="body-xs" my={ 2 }>
            * This is correlation in terms
            of <Link to="https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient"
            >Spearman&apos;s rank correlation coefficient <Latex>\rho</Latex></Link>.
          </Typography>
        )
      }

    </Fragment>
  )
}

