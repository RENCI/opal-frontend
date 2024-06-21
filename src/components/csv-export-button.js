import { useMemo } from 'react'
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

export const TableCsvExportButton = ({ table, tooltip = 'Download data as CSV' }) => {
  const data = useMemo(() => {
    const visibleColumnIds = table.getVisibleLeafColumns().map(c => c.id)
    return table.getFilteredRowModel().rows
      .map(r => r.original)
      .reduce((acc, row) => {
        const reducedRow = Object.fromEntries(
          Object.entries(row).filter(([key, ]) => visibleColumnIds.includes(key))
        )
        acc.push(reducedRow)
        return acc
      }, [])
  }, [table])

  return (
    <CsvExportButton
      data={ data }
      title={ tooltip }
    />
  )
}

TableCsvExportButton.propTypes = {
  table: PropTypes.object.isRequired,
  tooltip: PropTypes.string,
}

export const CsvExportButton = ({ data }) => {
  const handleClick = () => {
    const csv = generateCsv(csvConfig)(data)
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

CsvExportButton.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  tooltip: PropTypes.string,
}
