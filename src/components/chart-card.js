import { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/joy'
import { PngDownloadButton } from '@components/buttons'

export const ChartCard = ({ children, title }) => {
  const containerRef = useRef(null)
  
  return (
    <Card variant="soft">
      <Typography
        component="h1"
        level="h3"
        color="primary"
        justifyContent="space-between"
        endDecorator={ <PngDownloadButton containerRef={ containerRef } /> }
      >{ title }</Typography>

      <Divider />

      <CardContent
        ref={ containerRef }
        sx={{
          position: 'relative',
          minHeight: '500px',
          aspectRatio: '1 / 1',
          maxWidth: '100%',
          '& > div': {
            position: 'absolute',
            height: '100%',
            width: '100%',
          }
        }}
      >{ children }</CardContent>
    </Card>
  )
}

ChartCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}
