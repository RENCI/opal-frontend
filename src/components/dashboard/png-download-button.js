import PropTypes from 'prop-types'
import { Button, Tooltip } from '@mui/joy'
import { FileDownload as DownloadIcon } from '@mui/icons-material'
import { saveSvgAsPng } from 'save-svg-as-png'

export const PngDownloadButton = ({ containerRef, tooltip = 'Download' }) => {
  const handleClickDownload = () => {
    if (!containerRef.current) {
      return
    }
    const svg = containerRef.current.querySelector('svg')
    saveSvgAsPng(svg, new Date().toLocaleString(), {
      scale: 2,
      format: 'png',
      quality: '0.5',
      download: true,
      backgroundColor: '#ffffff',
    })
  }
  
  return (
    <Tooltip title={ tooltip }>
      <Button
        variant="outlined"
        color="neutral"
        size="sm"
        onClick={ handleClickDownload }
        startDecorator={ <DownloadIcon fontSize="sm" /> }
      >PNG</Button>
    </Tooltip>
  )
}

PngDownloadButton.propTypes = {
  containerRef: PropTypes.oneOfType([
    // Either a function...
    PropTypes.func, 
    // ...or the instance of a native DOM element.
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  tooltip: PropTypes.string,
}