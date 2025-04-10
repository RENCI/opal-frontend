import {
  createColumnHelper,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

//

export const podmColumns = [
  columnHelper.group({
    id: 'sample',
    header: 'Sample',
    footer: 'Sample',
    columns: [
      columnHelper.accessor('id', {                            header: 'ID',             footer: 'ID',              enableColumnFilter: false }),
      columnHelper.accessor('sample_id', {                     header: 'Sample',         footer: 'Sample',          meta: { filterVariant: 'text' } }),
      columnHelper.accessor('group_id', {                      header: 'Group',          footer: 'Group',           meta: { filterVariant: 'range' } }),
      columnHelper.accessor('study', {                         header: 'Study',          footer: 'Study',           meta: { filterVariant: 'select' } }),
      columnHelper.accessor('pi', {                            header: 'PI',             footer: 'PI',              meta: { filterVariant: 'select' } }),
      columnHelper.accessor('units', {                         header: 'Units',          footer: 'Units',           meta: { filterVariant: 'select' } }),
      columnHelper.accessor('medium', {                        header: 'Medium',         footer: 'Medium',          meta: { filterVariant: 'select' } }),
      columnHelper.accessor('date', {                          header: 'Date',           footer: 'Date',            meta: { filterVariant: 'text' } }),
      columnHelper.accessor(row => row.sample_detects ?? -1, { header: 'Sample Detects', footer: 'Sample Detects',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor(row => row.sample_sum ?? -1, {     header: 'Sample Sum',     footer: 'Sample Sum',      meta: { filterVariant: 'range' } }),
    ],
  }),
  columnHelper.group({
    id: 'location',
    header: 'Location',
    footer: 'Location',
    columns: [
      columnHelper.accessor('city', {                    header: 'City',          footer: 'City',             meta: { filterVariant: 'text' } }),
      columnHelper.accessor('state', {                   header: 'State',         footer: 'State',            meta: { filterVariant: 'text' } }),
      columnHelper.accessor('zipcode', {                 header: 'ZIP',           footer: 'ZIP',              meta: { filterVariant: 'text' } }),
      columnHelper.accessor('site_id', {                 header: 'Site ID',       footer: 'Site ID',          meta: { filterVariant: 'text' } }),
      columnHelper.accessor('site_type', {               header: 'Site Type',     footer: 'Site Type',        meta: { filterVariant: 'select' } }),
      columnHelper.accessor(row => row.latitude ?? 0, {  header: 'Latitude',      footer: 'Latitude',         meta: { filterVariant: 'text' } }),
      columnHelper.accessor(row => row.longitude ?? 0, { header: 'Longitude',     footer: 'Longitude',        meta: { filterVariant: 'text' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfba',
    header: 'PFBA',
    footer: 'PFBA',
    columns: [
      columnHelper.accessor('pfba_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfba_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfba_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfba_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfbs',
    header: 'PFBS',
    footer: 'PFBS',
    columns: [
      columnHelper.accessor('pfbs_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfbs_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfbs_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfbs_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfda',
    header: 'PFDA',
    footer: 'PFDA',
    columns: [
      columnHelper.accessor('pfda_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfda_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfda_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfda_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfdoa',
    header: 'PFDOA',
    footer: 'PFDOA',
    columns: [
      columnHelper.accessor('pfdoa_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfdoa_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfdoa_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfdoa_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfds',
    header: 'PFDS',
    footer: 'PFDS',
    columns: [
      columnHelper.accessor('pfds_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfds_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfds_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfds_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfhpa',
    header: 'PFHPA',
    footer: 'PFHPA',
    columns: [
      columnHelper.accessor('pfhpa_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhpa_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhpa_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhpa_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfhps',
    header: 'PFHPS',
    footer: 'PFHPS',
    columns: [
      columnHelper.accessor('pfhps_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhps_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhps_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhps_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfhxa',
    header: 'PFHxA',
    footer: 'PFHxA',
    columns: [
      columnHelper.accessor('pfhxa_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxa_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxa_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxa_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfhxs',
    header: 'PFHxS',
    footer: 'PFHxS',
    columns: [
      columnHelper.accessor('pfhxs_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxs_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxs_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxs_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfna',
    header: 'PFNA',
    footer: 'PFNA',
    columns: [
      columnHelper.accessor('pfna_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfna_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfna_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfna_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfns',
    header: 'PFNS',
    footer: 'PFNS',
    columns: [
      columnHelper.accessor('pfns_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfns_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfns_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfns_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfoa',
    header: 'PFOA',
    footer: 'PFOA',
    columns: [
      columnHelper.accessor('pfoa_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfoa_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfoa_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfoa_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfos',
    header: 'PFOS',
    footer: 'PFOS',
    columns: [
      columnHelper.accessor('pfos_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfos_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfos_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfos_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfpea',
    header: 'PFPeA',
    footer: 'PFPeA',
    columns: [
      columnHelper.accessor('pfpea_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpea_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpea_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpea_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfpes',
    header: 'PFPeS',
    footer: 'PFPeS',
    columns: [
      columnHelper.accessor('pfpes_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpes_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpes_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpes_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
  columnHelper.group({
    id: 'pfunda',
    header: 'PFUnDA',
    footer: 'PFUnDA',
    columns: [
      columnHelper.accessor('pfunda_concentration', { header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfunda_mrl', {           header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfunda_dl', {            header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfunda_flags', {         header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' },  size: 90 }),
    ],
  }),
]

