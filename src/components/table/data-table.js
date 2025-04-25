import PropTypes from 'prop-types'
import { Sheet } from '@mui/joy'
import {
  flexRender,
} from '@tanstack/react-table'
import { ColumnFilter } from './column-filter'

const TableComponentPropTypes = {
  table: PropTypes.object.isRequired,
}

const TableHeader = ({ table }) => {
  return (
    <thead>
      { table.getHeaderGroups().map(headerGroup => (
        <tr key={ headerGroup.id }>
          { headerGroup.headers.map(header => (
            <th
              key={ header.id }
              colSpan={header.colSpan}
              style={{ maxWidth: `${ header.getSize() }px` }}
            >
              { header.isPlaceholder ? null : (
                <span className="sortable" { ...{
                  onClick: header.column.getToggleSortingHandler(),
                } }>
                  { flexRender(header.column.columnDef.header, header.getContext()) }
                  {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted()] ?? null }
                </span>
              ) }
              { header.column.getCanFilter() ? (
                <div className="filter">
                  <ColumnFilter column={ header.column } />
                </div>
              ) : null }
            </th>
          )) }
        </tr>
      )) }
    </thead>
  )
}

const TableRow = ({ row }) => {
  return (
    <tr>
      { row.getVisibleCells().map(cell => {
        return (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        )}) }
    </tr>
  )
}

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
}

const TableBody = ({ table }) => {
  const { rows } = table.getRowModel()

  return (
    <tbody>
      { rows.map(row => <TableRow key={ row.id } row={ row } />) }
    </tbody>
  )
}

const TableFooter = ({ table }) => {
  return (
    <tfoot>
      { table.getFooterGroups().map(footerGroup => (
        <tr key={footerGroup.id}>
          { footerGroup.headers.map(header => (
            <th key={header.id} colSpan={header.colSpan}>
              { header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.footer,
                  header.getContext()
              ) }
            </th>
          )) }
        </tr>
      )) }
    </tfoot>
  )
}

TableHeader.propTypes = TableComponentPropTypes
TableBody.propTypes = TableComponentPropTypes
TableFooter.propTypes = TableComponentPropTypes

const tableStyle = {
  overflow: 'scroll',
  border: '1px solid #333',
  'tr:nth-of-type(2) th span.sortable': {
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(1.1)',
    },
  },
  tbody: {
    borderBottom: '1px solid #333',
  },
  th: {
    borderBottom: '1px solid #333',
    borderRight: '1px solid #333',
    p: 1,
  },
  td: {
    borderBottom: '1px solid #333',
    borderRight: '1px solid #333',
    p: 0.5,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  'tr:first-of-type th': { fontSize: '100%' },
  'tr:nth-of-type(2) th': { fontSize: '75%' },
  tfoot: {
    color: '#666',
  },
  'tfoot th': {
    fontWeight: 'normal',
  },
  'tfoot tr:first-of-type th': { fontSize: '75%' },
  'tfoot tr:nth-of-type(2) th': { fontSize: '100%' },
}

export const DataTable = ({ table, sx = {} }) => {
  return (
    <Sheet
      variant="soft"
      component="table"
      sx={{ ...tableStyle, ...sx }}
    >
      <TableHeader table={ table } />
      <TableBody table={ table } />
      <TableFooter table={ table } />
    </Sheet>
  )
}

DataTable.propTypes = {
  sx: PropTypes.object,
  table: PropTypes.object.isRequired,
}
