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

export const ExportButton = ({ table }) => {
  const handleClick = () => {
    const visibleColumnIds = table.getVisibleLeafColumns().map(c => c.id)

    const rows = table.getFilteredRowModel().rows
      .map(r => r.original)
      .reduce((acc, row) => {
        const reducedRow = Object.fromEntries(
          Object.entries(row).filter(([key, ]) => {
            return visibleColumnIds.includes(key)
          })
        )
        acc.push(reducedRow)
        return acc
      }, [])
    const csv = generateCsv(csvConfig)(rows)
    download(csvConfig)(csv)
  }

  return (
    <Tooltip title="Download data as CSV">
      <Button
        onClick={ handleClick }
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={ <ExportIcon fontSize="sm" /> }
      >CSV</Button>
    </Tooltip>
  )
}

ExportButton.propTypes = {
  table: PropTypes.object.isRequired,
}
