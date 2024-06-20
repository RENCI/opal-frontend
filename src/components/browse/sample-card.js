import { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/joy'
import { Circle as DetectionIcon } from '@mui/icons-material'
import { useData } from '@context'
import { KeyValuePair } from './key-value-pair'

const DetectionIndicator = memo(
  function detectionIndicator({ flag = '' }) {
    let color = '#99999966'
    switch (flag) {
      case '<MRL':
        color = '#EBC49F'
        break;
      case 'J':
        color = '#9FEBC4'
        break;
      case 'U':
        color = '#C49FEB'
        break;
      case 'Detect':
        color = '#D37676'
        break;
      default:
        color = '#99999966'
    }
    return (
      <DetectionIcon
        fontSize="sm"
        sx={{ color }}
      />
    )
  }
)

DetectionIndicator.propTypes = {
  flag: PropTypes.oneOf(['Detect', 'J', '<MRL', 'ND', 'U']),
}

export const SampleCard = ({ sample }) => {
  const { abbreviate, analytes } = useData()

  return (
    <Card
      variant="outlined"
      divider={ <Divider /> }
      sx={{
        width: '450px',
        height: '470px',
        overflow: 'hidden',
      }}
    >
      <Typography
        level="h3"
        endDecorator={ <Chip>{ sample.id }</Chip> }
        justifyContent="space-between"
      >
        { sample.sample_id }
      </Typography>

      <Divider />

      <CardContent sx={{ p: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <KeyValuePair
            property="Location"
            value={ `${ sample.city }, ${ sample.state }  ${ sample.zipcode }` }
          />
          <KeyValuePair property="Group" value={ sample.group_id } />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <KeyValuePair property="Study" value={ sample.study } />
          <KeyValuePair property="Medium" value={ sample.medium } />
        </Stack>
      </CardContent>

      <Divider />

      <CardContent sx={{ p: 0, }}>
        <Typography level="title-lg">
          Analyte concentrations ({ sample.units })
        </Typography>
        <Box sx={{
          mt: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '24px',
        }}>
          {
            analytes.map(({ id }) => (
              <KeyValuePair
                key={ `${ sample.id }-${ id }` }
                property={ abbreviate(id) }
                value={ sample[`${ id.toLowerCase() }_concentration`] }
                startDecorator={
                  <DetectionIndicator flag={ sample[`${ id }_flags`] } />
                }
              />
            ))
          }
        </Box>
      </CardContent>

      <Divider />

      <CardContent>
        <Stack
          direction="row"
          justifyContent="center"
          gap={ 2 }
        >
          <Typography
            startDecorator={ <DetectionIndicator flag="U" /> }
            level="body-xs"
          >U</Typography>
          <Typography
            startDecorator={ <DetectionIndicator flag="J" /> }
            level="body-xs"
          >J</Typography>
          <Typography
            startDecorator={ <DetectionIndicator flag="ND" /> }
            level="body-xs"
          >ND</Typography>
          <Typography
            startDecorator={ <DetectionIndicator flag="<MRL" /> }
            level="body-xs"
          >{`<`}MRL</Typography>
          <Typography
            startDecorator={ <DetectionIndicator flag="Detect" /> }
            level="body-xs"
          >Detect</Typography>
        </Stack>
      </CardContent>

    </Card>
  )
}

SampleCard.propTypes = {
  sample: PropTypes.object.isRequired,
}
