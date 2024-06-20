import PropTypes from 'prop-types'
import { Sheet } from '@mui/joy'
import {
  flexRender,
} from '@tanstack/react-table'
import { ColumnFilter } from './column-filter'

export const DataTable = ({ table, sx = {} }) => {
  return (
    <Sheet
      variant="soft"
      component="table"
      sx={{
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
         ...sx,
      }}
    >
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

      <tbody>
        { table.getRowModel().rows.map(row => (
          <tr key={ row.id }>
            { row.getVisibleCells().map(cell => {
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              )}) }
          </tr>
        )) }
      </tbody>
      
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
    </Sheet>
  )
}

DataTable.propTypes = {
  sx: PropTypes.object,
  table: PropTypes.object.isRequired,
}
