import {
  createColumnHelper,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

export const nonTargetedColumns = [
  columnHelper.group({
    id: 'sample',
    header: 'Sample',
    footer: 'Sample',
    columns: [
      columnHelper.accessor('sample_id', {            cell: info => info.getValue(), header: 'Sample',        footer: 'Sample',    meta: { filterVariant: 'text' } }),
      columnHelper.accessor('study', {                cell: info => info.getValue(), header: 'Study',         footer: 'Study',     meta: { filterVariant: 'select' } }),
      columnHelper.accessor('pi', {                   cell: info => info.getValue(), header: 'PI',            footer: 'PI',        meta: { filterVariant: 'select' } }),
      columnHelper.accessor('units', {                cell: info => info.getValue(), header: 'Units',         footer: 'Units',     meta: { filterVariant: 'select' } }),
      columnHelper.accessor('medium', {               cell: info => info.getValue(), header: 'Medium',        footer: 'Medium',    meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'location',
    header: 'Location',
    footer: 'Location',
    columns: [
      columnHelper.accessor('city', {                 cell: info => info.getValue(), header: 'City',         footer: 'City',       meta: { filterVariant: 'text' } }),
      columnHelper.accessor('state', {                cell: info => info.getValue(), header: 'State',        footer: 'State',      meta: { filterVariant: 'text' } }),
      columnHelper.accessor('zipcode', {              cell: info => info.getValue(), header: 'ZIP',          footer: 'ZIP',        meta: { filterVariant: 'text' } }),
    ],
  }),
  columnHelper.group({
    id: 'detection',
    header: 'Detection',
    footer: 'Detection',
    columns: [
      columnHelper.accessor('pfas_short_name', {      cell: info => info.getValue(), header: 'Name',        footer: 'Name',         meta: { filterVariant: 'text' } }),
      columnHelper.accessor('pfas_long_name', {       cell: info => info.getValue(), header: 'Long name',   footer: 'Long name',    meta: { filterVariant: 'text' } }),
      columnHelper.accessor('flags', {                cell: info => info.getValue(), header: 'Flags',       footer: 'Flags',        meta: { filterVariant: 'text' } }),
      columnHelper.accessor('measurement', {          cell: info => info.getValue(), header: 'Measurement', footer: 'Measurement',  meta: { filterVariant: 'text' } }),
    ],
  }),
]
