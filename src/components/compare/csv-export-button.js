import PropTypes from 'prop-types'
import { Button, Tooltip } from '@mui/joy'
import {
  FileDownload as ExportIcon,
} from '@mui/icons-material'
import { mkConfig, generateCsv, download } from 'export-to-csv'

const csvConfig = mkConfig({
  filename: new Date().toLocaleString(),
  useKeysAsHeaders: true,
})

export const CsvExportButton = ({ data, tooltip = 'Download' }) => {
  const handleClickDownload = () => {
    const csv = generateCsv(csvConfig)(data)
    download(csvConfig)(csv)
  }

  return (
    <Tooltip title={ tooltip }>
      <Button
        onClick={ handleClickDownload }
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={ <ExportIcon fontSize="sm" /> }
      >CSV</Button>
    </Tooltip>
  )
}

CsvExportButton.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  tooltip: PropTypes.string,
}
